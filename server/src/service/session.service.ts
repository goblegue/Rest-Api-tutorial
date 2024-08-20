import sessionModel, { SessionDocument } from "../models/session.model";
import { FilterQuery, UpdateQuery } from "mongoose";
import { verifyJWT,signJWT } from "../utils/jwt.utils";
import { findUser } from "./user.service";
import { get } from "lodash";
import config from "config";



export async function createSession(userId: string, userAgent: string) {
  try {
    const session = await sessionModel.create({ user: userId, userAgent });
    return session.toJSON();
  } catch (e: any) {
    throw new Error(e);
  }
}
export async function findSessions(query: FilterQuery<SessionDocument>) {
  return sessionModel.find(query).lean();
}
export async function updateSession(query: FilterQuery<SessionDocument>, update: UpdateQuery<SessionDocument>) {
  return sessionModel.updateOne(query, update);
}

export async function reIssueAccessToken({
  refreshToken,
}: {
  refreshToken: string;
}){
  // Decode the refresh token
  const {decoded} = verifyJWT(refreshToken);
  if(!decoded||!get(decoded,"session")){
    return false;
  }
  // Get the session
  const session = await sessionModel.findById(get(decoded,"session"));
  if(!session||!session.valid){
    return false;
  }
  // Get the user
  const user = await findUser({_id:session.user});

  if(!user){
    return false;
  }
  const accessToken = signJWT(
    { ...user, session: session._id },
    { expiresIn: config.get("accessTokenTtl") } // 15 minutes,
  );

  return accessToken;
}
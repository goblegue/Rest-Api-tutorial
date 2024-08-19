import sessionModel, { SessionDocument } from "../models/session.model";
import { FilterQuery } from "mongoose";

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

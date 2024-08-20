import { Request, Response, NextFunction } from "express";
import { get } from "lodash";
import { verifyJWT } from "../utils/jwt.utils";
import { reIssueAccessToken } from "../service/session.service";
import { string } from "zod";

const deserializeUser = async(req: Request, res: Response, next: NextFunction) => {
  const refreshToken = get(req, "headers.x-refresh");
  const accessToken = get(req, "headers.authorization", "").replace(
    /^Bearer\s/,
    ""
  );


  if (!accessToken) {
    return next();
  }
  const { decoded, expired } = verifyJWT(accessToken);

  
  if (decoded) {
    res.locals.user = decoded;
    return next();
  }
  if (expired && refreshToken) {
    const newAccessToken = await reIssueAccessToken({ refreshToken: refreshToken as string });

    if (newAccessToken) {
      res.setHeader("x-access-token", newAccessToken);
    }

    const { decoded, expired } = verifyJWT(newAccessToken as string);    

    res.locals.user = decoded;
    return next();
    
  }

  return next();
};

export default deserializeUser;

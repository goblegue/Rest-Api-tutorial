import { Request, Response, NextFunction } from "express";
import { get } from "lodash";
import { verifyJWT } from "../utils/jwt.utils";

const deserializeUser = (req: Request, res: Response, next: NextFunction) => {
    const accessToken = get(req, "headers.authorization", "").replace(
        /^Bearer\s/,
        ""
      );
  if (!accessToken) {
    return next();
  }
  const { decoded, expired } = verifyJWT(accessToken);;
  if (decoded) {
    res.locals.user = decoded;
    return next();
  }
  return next();

};

export default deserializeUser;
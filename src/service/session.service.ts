import sessionModel from "../models/session.model";

export async function createSession(userId: string, userAgent: string) {
  try {
    const session = await sessionModel.create({ user: userId, userAgent });
    return session.toJSON();
  } catch (e:any) {
    throw new Error(e);
  }
}
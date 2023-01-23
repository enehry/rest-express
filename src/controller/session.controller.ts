import config from 'config';
import { Request, Response } from "express";
import { createSession, findSessions } from "../service/session.service";
import { validatePassword } from "../service/user.service";
import { signJWT } from '../utils/jwt.utils';

const expiresIn = config.get<number>('accessTokenTtl');

export async function createUserSessionHandler(
  req: Request, 
  res: Response) {
  
  // validate the user's password
  const user = await validatePassword(req.body);

  if(!user) return res.status(401).send("Invalid username or password");

  // create a session
    const session = await createSession(user._id, req.get('user-agent') || "");

  // create a access token
  const accessToken = signJWT({
    ...user, session: session._id }, {
      expiresIn: expiresIn
    });
  // create a refresh token
  const refreshToken = signJWT({
    ...user, session: session._id }, {
      expiresIn: expiresIn
    });


  // return access & refresh token
  return res.send({ accessToken, refreshToken });
  
}

export async function getUserSessionsHandler(
  req: Request, 
  res: Response) {
    const userId = res.locals.user._id;

    const sessions = await findSessions({user: userId, valid: false});

    return res.send(sessions);
  }
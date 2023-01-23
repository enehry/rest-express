import { omit } from 'lodash';
import UserModel, { UserInput } from '../models/user.model';
import log from '../utils/logger';

export async function createUser(input: UserInput) {
  try {
    return omit((await UserModel.create(input)).toJSON(), 'password');
  } catch (error: any) {
    log.error(error);
    throw new Error(error);
  }
}

export async function validatePassword(
  {email, password } : {email: string, password: string}) {
  const user = await UserModel.findOne({ email });

  if(!user) {
    return false;
  }

  const isValid = await user.comparePassword(password);

  if(!isValid) {
    return false;
  }

  return omit(user.toJSON(), 'password');
  
}
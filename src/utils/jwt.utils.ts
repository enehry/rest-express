import config from "config";
import jwt from "jsonwebtoken";
const privateKey = config.get<string>("privateKey");
const publicKey = config.get<string>("publicKey");
export function signJWT(object: Object, options?: jwt.SignOptions | undefined){

  return jwt.sign(object, 'secret', 
  );
}

export function verifyJWT(token: string){
  try {
    const decoded = jwt.verify(token, 'secret');

    return {
      valid: true,
      expired: false,
      decoded
    };
  } catch(err: any) {
    return {
      valid: false,
      expired: err.message === "jwt expired",
      decoded: null
    };
  }
}
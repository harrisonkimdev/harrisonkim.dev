import jwt from "jsonwebtoken";

const DEFAULT_SIGN_OPTION = {
  expiresIn: "30m",
};

export function signJwtAccessToken(payload: any, options = DEFAULT_SIGN_OPTION) {
  const secret_key = process.env.ACCESS_TOKEN_SECRET;
  if (secret_key) {
    const token = jwt.sign(payload, secret_key, options);
    return token;
  }
}

export function verifyJwt(token: any) {
  try {
    const secret_key = process.env.ACCESS_TOKEN_SECRET;
    if (secret_key) {
      const decoded = jwt.verify(token, secret_key);
      return decoded;
    }
  } catch (error) {
    console.log("err: ", error);
    return null;
  }
}

import * as jwt from 'jsonwebtoken';
import 'dotenv/config';

const secret = process.env.JWT_SECRET || 'jwt_secret';

export default class TokenManager {
  static makeToken = (payload: unknown) => {
    const jwtConfig: jwt.SignOptions = {
      expiresIn: '365d',
      algorithm: 'HS256',
    };

    const token = jwt.sign({ data: payload }, secret, jwtConfig);
    return token;
  };

  static validateToken = (authorization: string): jwt.JwtPayload => {
    console.log('secret', secret);
    console.log('token', authorization);
    const verify = jwt.verify(authorization, secret);
    console.log('retorno verificacao', verify);

    return verify as jwt.JwtPayload;
  };
}

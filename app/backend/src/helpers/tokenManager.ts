import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import ValidationError from '../errors/ValidationError';

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
    try {
      const verify = jwt.verify(authorization, secret);
      console.log('retorno verificacao', verify);

      return verify as jwt.JwtPayload;
    } catch (err) {
      throw new ValidationError(401, 'Token must be a valid token');
    }
  };
}

import { compareSync } from 'bcryptjs';
import TokenManager from '../helpers/tokenManager';
import UserModel from '../database/models/UsersModel';
import ValidationError from '../errors/ValidationError';
import IUser from '../interfaces/IUser';

export default class UserService {
  makeLogin = async ({ email, password }: IUser) => {
    if (!email || !password) throw new ValidationError(400, 'All fields must be filled');

    const user = await UserModel.findOne({ where: { email } });

    if (!user) throw new ValidationError(401, 'Incorrect email or password');

    const comparePassword = compareSync(password, user.password);

    if (!comparePassword) throw new ValidationError(401, 'Incorrect email or password');

    const token = TokenManager.makeToken(user);
    return token;
  };

  validateLogin = async (authorization: string | undefined): Promise<IUser | null> => {
    if (!authorization) throw new ValidationError(400, 'Token must be valid');
    const verify = TokenManager.validateToken(authorization);
    console.log('verify.data.email', verify.data.email);
    const user = await UserModel.findOne({ where: { email: verify.data.email } });
    return user;
  };
}

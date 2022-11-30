import { compareSync } from 'bcryptjs';
import TokenManager from '../helpers/tokenManager';
import UserModel from '../database/models/UsersModel';
import ValidationError from '../errors/ValidationError';

interface IRequest {
  email: string;
  password: string;
}

export default class UserService {
  makeLogin = async ({ email, password }: IRequest) => {
    if (!email || !password) throw new ValidationError(400, 'All fields must be filled');

    const user = await UserModel.findOne({ where: { email } });

    if (!user) throw new Error('Incorrect email or password');

    const comparePassword = compareSync(password, user.password);

    if (!comparePassword) throw new ValidationError(401, 'Incorrect email or password');

    const token = TokenManager.makeToken(user);
    return token;
  };
}

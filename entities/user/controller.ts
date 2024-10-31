import User, { UserType } from './model.js'
import CONF from '../../core/conf.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { InvalidFormatPassword } from './errors.js';
import { NotFoundError } from '../../core/errors.js';


export const createUser = async (data: Pick<UserType, 'password' | 'email' | 'role'>) => {
    if (!data.password || data.password.length < 6) throw new InvalidFormatPassword();
    data.password = await bcrypt.hash(data.password, CONF.SALT_ROUND)
    return User.create(data);
}


export const login = async (data: UserType) => {
    const user = await User.findOne({ email: data.email }).select('+password');
    if (!user || !(await bcrypt.compare(data.password, user.password))) throw new NotFoundError('User not found');
    const token = jwt.sign({ id: user._id, role: user.role }, CONF.JWT_SECRET, { expiresIn: '24h' });
    return { token }
}
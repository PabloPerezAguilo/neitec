import mongoose from 'mongoose'
import { ulid } from 'ulid';

export enum UserRole {
    User = 'USER',
    Admin = 'ADMIN',
}

const schema = new mongoose.Schema({
    _id: { type: String, default: ulid },
    password: {
        type: String,
        required: true,
        select: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        default: UserRole.User,
        enum: Object.values(UserRole),
    },
}, { versionKey: false, timestamps: true });

export type UserType = mongoose.InferSchemaType<typeof schema>;
const Model = mongoose.model('User', schema);
export default Model;


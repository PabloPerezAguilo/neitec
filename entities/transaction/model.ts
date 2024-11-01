import mongoose from 'mongoose'
import { ulid } from 'ulid';

export enum TransactionStatus {
    Pending = 'pending',
    Approved = 'approved',
    Rejected = 'rejected',
    Done = 'done',
}

const schema = new mongoose.Schema({
    _id: { type: String, default: ulid },
    name: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: TransactionStatus.Pending,
        enum: Object.values(TransactionStatus),
    },
    createdBy: {
        required: true,
        type: String,
        ref: 'User',
    },
    reviewedBy: {
        type: String,
        ref: 'User',
    }
}, { versionKey: false, timestamps: true });

export type TransactionType = mongoose.InferSchemaType<typeof schema>;
const Model = mongoose.model('Transaction', schema);
export default Model;

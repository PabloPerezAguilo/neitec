import Transaction, { TransactionStatus, TransactionType } from './model.js'
import { Token } from '../../types';
import { NotFoundError } from '../../core/errors.js';
import { InvalidTransactionStatus } from './errors.js';


export const createTransaction = async (data: TransactionType, token: Token) => {
    // Pisamos el creador con el id del token
    data.createdBy = token.id;
    // Inicializamos a pendiente
    data.status = TransactionStatus.Pending;
    return Transaction.create(data);
}

export const validateTransaction = async (id: string, data: { status: TransactionStatus }, token: Token) => {
    if (data.status !== TransactionStatus.Rejected && data.status !== TransactionStatus.Approved) throw new InvalidTransactionStatus();
    const transaction = await Transaction.findOneAndUpdate({ _id: id }, { status: data.status, reviewedBy: token.id }, { new: true });
    if (!transaction) throw new NotFoundError();
    return transaction;
}


export const updateTransaction = async (id: string, token: Token) => {
    const transaction = await Transaction.findOneAndUpdate({ _id: id, status: TransactionStatus.Approved }, { status: TransactionStatus.Done, reviewedBy: token.id }, { new: true });
    if (!transaction) throw new NotFoundError();
    return transaction;
}


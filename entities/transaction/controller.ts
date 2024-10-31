import Transaction, { TransactionStatus, TransactionType } from './model.js'
import { Token } from '../../types';
import { NotFoundError } from '../../core/errors.js';


export const createTransaction = async (data: TransactionType, token: Token) => {
    // Pisamos el creador con el id del token
    data.createdBy = token.id;
    // Inicializamos a pendiente
    data.status = TransactionStatus.Pending;
    return Transaction.create(data);
}

export const validateTransaction = async (id: string, status: TransactionStatus, token: Token) => {
    const transaction = await Transaction.findOneAndUpdate({ _id: id }, { status: status, reviewedBy: token.id });
    if (!transaction) throw new NotFoundError();
    return transaction;
}


export const updateTransaction = async (id: string, status: TransactionStatus, token: Token) => {
    const transaction = await Transaction.findOneAndUpdate({ _id: id, status: TransactionStatus.Approved }, { status: TransactionStatus.Done, reviewedBy: token.id });
    if (!transaction) throw new NotFoundError();
    return transaction;
}


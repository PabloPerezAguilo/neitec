import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose';
import { get } from 'lodash-es';
import RestifyErrors from 'restify-errors'

const { RestError } = RestifyErrors;
import CONF from './conf.js'
import { UserRole } from '../entities/user/model.js';


export const auth = (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) return next(new Error('AUTH_REQUIRED'));
    const token = req.headers.authorization.split(' ')[1];
    if (!token) return next(new Error('AUTH_REQUIRED'));
    try {
        req.token = jwt.verify(token, CONF.JWT_SECRET)
    } catch (e) {
        return next(new Error('TOKEN_INVALID'));
    }
    next();
}

export const admin = (req: Request, res: Response, next: NextFunction) => {
    if (!req.token) return next(new Error('Auth middleware must be called before'));
    if (req.token.role !== UserRole.Admin) return next(new Error('ADMIN_REQUIRED'));
    next();
}


export const handlerError = (err: typeof RestError | mongoose.mongo.MongoServerError, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof mongoose.mongo.MongoServerError && err.code === 11000) return res.status(422).json({ error: 'DUPLICATE_ENTITY', entities: Object.keys(err.keyPattern) })
    // Unknow error: print and send 500 http status
    if (err instanceof RestError && err.statusCode >= 500) console.error(err);
    return res.status(err.statusCode).json(err)
}

// Recibe un callback y la lista de argumentos que debe sacar de la request. Invoca ese CB con los argumentos
export const generator = (cb, params) => async (req, res, next) => {
    try {
        const cbParams = params.map(e => get(req, e));
        res.send(await cb(...cbParams));
    } catch (e) {
        next(e);
    }
};

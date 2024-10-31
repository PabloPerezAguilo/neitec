import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import mongoose, { Error } from 'mongoose';
import { get } from 'lodash-es';
import RestifyErrors from 'restify-errors'

const { RestError } = RestifyErrors;
import CONF from './conf.js'
import { UserRole } from '../entities/user/model.js';
import { ForbiddenError, InternalServerError, UnauthorizedError } from './errors.js';


export const auth = (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) return next(new UnauthorizedError('Auth Required'));
    const token = req.headers.authorization.split(' ')[1];
    if (!token) return next(new UnauthorizedError('Auth Required'));
    try {
        req.token = jwt.verify(token, CONF.JWT_SECRET)
    } catch (e) {
        return next(new UnauthorizedError('Token Invalid'));
    }
    next();
}

export const admin = (req: Request, res: Response, next: NextFunction) => {
    if (!req.token) return next(new InternalServerError('Auth middleware must be called before'));
    if (req.token.role !== UserRole.Admin) return next(new ForbiddenError('Admin Required'));
    next();
}


export const handlerError = (err: typeof RestError | mongoose.mongo.MongoServerError, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof mongoose.mongo.MongoServerError && err.code === 11000) return res.status(422).json({ error: 'DUPLICATE_ENTITY', entities: Object.keys(err.keyPattern) })
    // Unknow error: print and send 500 http status
    if (err.statusCode) {
        if (err.statusCode >= 500) console.error(err);
        return res.status(err.statusCode).json(err)
    }
    console.error('UNKNOWN ERROR', err);
    return res.status(500).json({ err: err.toString() })
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

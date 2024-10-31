import { UserRole } from '../entities/user/model';

export { }

declare global {
    namespace Express {
        export interface Request {
            // decoded token
            token: Token
        }
    }
}

export interface Token {
    id: string,
    role: UserRole,
}

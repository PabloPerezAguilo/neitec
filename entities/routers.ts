import express from 'express'
import transactionRouter from './transaction/router.js';
import userRouter from './user/router.js';
import { auth, handlerError } from '../core/middlewares.js';
import CONF from '../core/conf.js';

// Instanciamos express, añadimos sus middlewares y levantamos
export const startExpress = () => {
    const app = express();

    app.use(express.json());
    app.get('/', (req, res) => res.send('Healthcheck: ok'))
    app.use('/user', userRouter)
    // Requiere autenticacion para todos los endpoints
    app.use('/transaction', auth, transactionRouter)

    app.use(handlerError);


    app.listen(CONF.PORT,()=>console.log('Server up at port ' + CONF.PORT));
}

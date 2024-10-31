import { connectDB } from './core/db.js';
import { startExpress } from './entities/routers.js';
import { startUsers } from './entities/user/controller.js';

// Dejamos esto limpio para añadir lo que venga en el futuro
await connectDB();
await startUsers()
const app = startExpress();

export { app }

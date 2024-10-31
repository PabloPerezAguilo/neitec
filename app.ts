import { connectDB } from './core/db.js';
import { startExpress } from './entities/routers.js';

// Dejamos esto limpio para añadir lo que venga en el futuro
await connectDB();
const app = startExpress();

export { app }

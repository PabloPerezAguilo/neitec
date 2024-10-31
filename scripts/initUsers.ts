import { createUser } from '../entities/user/controller.js';
import { UserRole } from '../entities/user/model.js';
import { connectDB } from '../core/db.js';

console.log('Script start')
await connectDB()
await createUser({ email: 'user@yo.es', password: '123456', role: UserRole.User })
await createUser({ email: 'admin@yo.es', password: '123456', role: UserRole.Admin })
console.log('Script end')

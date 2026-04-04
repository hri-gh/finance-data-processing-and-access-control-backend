import express, { Request, Response } from 'express';
import { errorMiddleware } from './middleware/error.middleware.js';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import conf from './config/index.js';

const app = express();


app.use(cors({
    origin: true,
    credentials: true
}))

// To allow multiple origins --------
// const allowedOrigins = conf.CORS_ORIGIN?.split(",") || [];

// app.use(
//     cors({
//         origin: (origin, callback) => {
//             // allow Postman / server-to-server
//             if (!origin) return callback(null, true);

//             if (allowedOrigins.includes(origin)) {
//                 return callback(null, true);
//             }

//             return callback(new Error("Not allowed by CORS"));
//         },
//         credentials: true,
//     })
// );
// -------------------------

app.use(express.json())
app.use(cookieParser())


app.get('/', (req: Request, res: Response) => {
    res.send('Server is running! ✅');
});

// Routes

import userRouter from './routes/user.routes.js'
import authRouter from './routes/auth.routes.js'
import recordRouter from './routes/record.routes.js'

// Api Routes

app.use('/api/users', userRouter)
app.use('/api/auth', authRouter)
app.use('/api/records', recordRouter)

app.use(errorMiddleware)

export default app

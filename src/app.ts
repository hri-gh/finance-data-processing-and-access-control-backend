import express, { Request, Response } from 'express';
import { errorMiddleware } from './middleware/error.middleware.js';
import cors from 'cors'
import cookieParser from 'cookie-parser';


const app = express();


// app.use(cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true
// }))

const allowedOrigins = process.env.CORS_ORIGINS?.split(",") || [];

app.use(
    cors({
        origin: (origin, callback) => {
            // allow Postman / server-to-server
            if (!origin) return callback(null, true);

            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            return callback(new Error("Not allowed by CORS"));
        },
        credentials: true,
    })
);


app.use(express.json())
app.use(cookieParser())


app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server is running! ✅');
});

// Routes
import testRouter from './routes/test.route.js'
import userRouter from './routes/user.routes.js'

// Api Routes
app.use('/api/test', testRouter)
app.use('/api/users', userRouter)

app.use(errorMiddleware)

export default app

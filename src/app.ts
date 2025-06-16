import './types/global-types';

import express  from 'express';
import path  from 'path';
import 'dotenv/config';
import cookieParser  from 'cookie-parser';
import logger  from 'morgan';
import cors from 'cors'

import indexRouter from './routes/index';
import usersRouter from './routes/users';
import { BASE_URL, CLIENT_URI } from './config';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cors({ 
    origin: CLIENT_URI, 
    credentials: true 
    })
);
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(path.join(process.cwd()), 'public')));
app.use('/uploads', express.static(path.join(process.cwd(), 'public/images/uploads')));

app.use(`${BASE_URL}/`, indexRouter);
app.use(`${BASE_URL}/users`, usersRouter);

export default app;
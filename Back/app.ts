import cors from "cors";
import dotenv from 'dotenv';
import express from "express";
import expressRateLimit from "express-rate-limit";
import fs from 'fs';
import morgan from 'morgan';
import path from 'path';
import catchAll from "./middlewares/catch-all";
import logger from "./middlewares/logger";
import routeNotFound from './middlewares/routeNotFound';
// import appConfig from './appConfig';
import authRouter from './routes/authRouter';
import usersRouter from './routes/usersRouter';

// Load environment variables from .env file
dotenv.config();

// const sequelize = appConfig.sequelize;

const app = express();

// security DoS Attack: limits number of request from the same IP:
app.use(expressRateLimit({
    windowMs: 1000, //time limit
    max: 20 //max requests allowed in that time window
}));

app.use(express.json());
app.use(cors());
app.use(logger);

//Routes
app.use('/auth', authRouter);
app.use('/users', usersRouter);

// enable logs save
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.use(morgan('combined', { stream: accessLogStream }));

app.use(routeNotFound)

app.use(catchAll);

// Test database connection
// async function testConnection() {
//     try {
//         await sequelize.authenticate();
//         console.log('✅ Database connection established successfully.');
//     } catch (error) {
//         console.error('❌ Unable to connect to database:', error);
//     }
// }

app.listen(process.env.PORT, async () => {
    console.log(`🚀 Server running on port ${process.env.PORT}`);
    // await testConnection();
});



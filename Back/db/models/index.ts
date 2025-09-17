import { Sequelize } from 'sequelize-typescript';
import { User } from './user';
import { GameSession } from './gameSession';
import { Notification } from './notification';

require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    models: [User, GameSession, Notification],
    logging: console.log, // log queries and DB actions
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false // For Render's SSL
        }
    }
})

export { sequelize, User, GameSession, Notification };
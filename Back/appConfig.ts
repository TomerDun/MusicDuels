import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
dotenv.config()

class AppConfig {
    public port = (process.env.PROT || 3000);
    public dbUser = process.env.DB_USER;
    public dbPass = process.env.DB_PASS;
    public dbHost = process.env.DB_HOST;
    public dbPort = process.env.DB_PORT;
    public dbName = process.env.DB_NAME;

    public sequelize = new Sequelize(`mysql://${this.dbUser}:${this.dbPass}@${this.dbHost}:${this.dbPort}/${this.dbName}`);
}

const appConfig = new AppConfig();

export default appConfig;



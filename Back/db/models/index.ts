// 'use strict';

// import fs from 'fs';
// import path from 'path';
// import process from 'process';
// import { DataTypes, Sequelize } from 'sequelize';
// // import Recipe from './recipe';
// // import User from './user';

// interface DbInterface {
//     [key: string]: any;
//     sequelize: Sequelize;
//     Sequelize: typeof Sequelize;
// }

// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/../config/config.js')[env];
// const db: DbInterface = {} as DbInterface;

// let sequelize: Sequelize;
// if (config.use_env_variable) {
//     sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//     sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

// fs
//     .readdirSync(__dirname)
//     .filter(file => {
//         return (
//             file.indexOf('.') !== 0 &&
//             file !== basename &&
//             file.slice(-3) === '.ts' &&
//             file.indexOf('.test.js') === -1
//         );
//     })
//     .forEach(file => {
//         const modelModule = require(path.join(__dirname, file));
//         const modelFactory = modelModule.default || modelModule;
//         const model = modelFactory(sequelize);
//         db[model.name] = model;
//         // const model = require(path.join(__dirname, file))(sequelize, DataTypes);
//         // db[model.name] = model;
//     });

// Object.keys(db).forEach(modelName => {
//     if (db[modelName].associate) {
//         db[modelName].associate(db);
//     }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// export default db;

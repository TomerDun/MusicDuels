// import { Model, DataTypes, Sequelize } from 'sequelize';
// // import db from '.';
// // const sequelize = db.sequelize;

// interface UserAttributes {
//     id: string;
//     userName: string;
//     email: string;
//     password: string;
//     firstName: string;
//     lastName: string;
// }

// export default (sequelize: Sequelize) => {

//     class User extends Model<UserAttributes>
//         implements UserAttributes {
//         public id!: string;
//         public userName!: string;
//         public email!: string;
//         public password!: string;
//         public firstName!: string;
//         public lastName!: string;

//         static associate(models: any) {
//             // User.hasMany(models.Recipe, { through:'dsdas' });
//             User.hasMany(models.Recipe, { foreignKey: 'userId', as: 'recipes' });
//         };
//     }

//     User.init({
//         id: {
//             type: DataTypes.UUID,
//             defaultValue: DataTypes.UUIDV4,
//             primaryKey: true,
//             allowNull: false,
//             unique: true,
//         },
//         userName: {
//             type: DataTypes.STRING(30),
//             allowNull: false,
//             unique: true,
//             validate: {
//                 notEmpty: true,
//                 len: [3, 30]
//             }
//         },
//         email: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             unique: true,
//             validate: {
//                 isEmail: true,
//                 notEmpty: true
//             }
//         },
//         password: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             validate: {
//                 notEmpty: true
//             }
//         },
//         firstName: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             validate: {
//                 notEmpty: true
//             }
//         },
//         lastName: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             validate: {
//                 notEmpty: true
//             }
//         },
//     }, {
//         sequelize,
//         modelName: 'User',
//         tableName: 'users',
//         timestamps: true,
//     });

//     return User;
// }

// // export default User;

// import { Model, DataTypes, Sequelize } from 'sequelize';
// // import db from '.';
// // const sequelize = db.sequelize;

// interface RecipeAttributes {
//     id: string;
//     title: string;
//     description?: string;
//     ingredients: string[];
//     instructions: string[];
//     cookingTime: number;
//     servings: number;
//     difficulty: 'easy' | 'medium' | 'hard';
//     imageURL?: string;
//     isPublic?: boolean;
//     userId: string;
// }

// export default (sequelize: Sequelize) => {

//     class Recipe extends Model<RecipeAttributes> implements RecipeAttributes {
//         public id!: string;
//         public title!: string;
//         public description?: string;
//         public ingredients!: string[];
//         public instructions!: string[];
//         public cookingTime!: number;
//         public servings!: number;
//         public difficulty!: 'easy' | 'medium' | 'hard';
//         public imageURL?: string;
//         public isPublic?: boolean;
//         public userId!: string;
//         public readonly createdAt!: Date;
//         public readonly updatedAt!: Date;

//         static associate(models: any) {
//             // User.hasMany(models.Recipe, { through:'dsdas' });
//             Recipe.belongsTo()
//         };
//     }

//     Recipe.init({
//         id: {
//             type: DataTypes.UUID,
//             defaultValue: DataTypes.UUIDV4,
//             primaryKey: true,
//             allowNull: false,
//             unique: true,
//         },
//         title: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             validate: {
//                 notEmpty: true
//             }
//         },
//         description: {
//             type: DataTypes.TEXT,
//             allowNull: true,
//         },
//         ingredients: {
//             type: DataTypes.JSON,
//             allowNull: false,
//             defaultValue: [],
//             validate: {
//                 notEmpty: true
//             }
//         },
//         instructions: {
//             type: DataTypes.JSON,
//             allowNull: false,
//             defaultValue: [],
//             validate: {
//                 notEmpty: true
//             }
//         },
//         cookingTime: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//         },
//         servings: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//         },
//         difficulty: {
//             type: DataTypes.ENUM('easy', 'medium', 'hard'),
//             allowNull: false,
//             defaultValue: 'easy',
//         },
//         imageURL: {
//             type: DataTypes.STRING,
//             allowNull: true,
//         },
//         isPublic: {
//             type: DataTypes.BOOLEAN,
//             defaultValue: true,
//         },
//         userId: {
//             type: DataTypes.UUID,
//             allowNull: false,
//         },
//     }, {
//         sequelize,
//         modelName: 'Recipe',
//         tableName: 'recipes',
//         timestamps: true,
//     });

//     return Recipe;
// }

// // export default Recipe;
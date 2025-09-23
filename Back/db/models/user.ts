import { Table, Column, Model, DataType, PrimaryKey, Default, Unique, AllowNull, Validate, HasMany, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import { GameSession } from './gameSession';
import { Notification } from './notification';

@Table({
    tableName: 'users',
    timestamps: true,
})
export class User extends Model {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id!: string;

    @Unique
    @AllowNull(false)
    @Validate({
        isEmail: true,
        notEmpty: true
    })
    @Column(DataType.STRING)
    email!: string;

    @AllowNull(false)
    @Validate({
        len: [4, 255]
    })
    @Column(DataType.STRING)
    password!: string;

    @Unique
    @AllowNull(false)
    @Validate({
        len: [3, 30]
    })
    @Column(DataType.STRING)
    username!: string;

    @AllowNull(true)
    @Column(DataType.STRING)
    profileImageUrl?: string;

    @AllowNull(false)
    @Default(0)
    @Validate({
        min: 0
    })
    @Column(DataType.BIGINT)
    totalScore!: number;

    @CreatedAt
    createdAt!: Date;

    @UpdatedAt
    updatedAt!: Date;

    // Associations
    @HasMany(() => GameSession, {
        foreignKey: 'player1Id',
        as: 'gamesAsPlayer1'
    })
    gamesAsPlayer1!: GameSession[];

    @HasMany(() => GameSession, {
        foreignKey: 'player2Id',
        as: 'gamesAsPlayer2'
    })
    gamesAsPlayer2!: GameSession[];

    @HasMany(() => Notification, {
        foreignKey: 'senderId',
        as: 'sentNotifications'
    })
    sentNotifications!: Notification[];

    @HasMany(() => Notification, {
        foreignKey: 'receiverId',
        as: 'receivedNotifications'
    })
    receivedNotifications!: Notification[];
}
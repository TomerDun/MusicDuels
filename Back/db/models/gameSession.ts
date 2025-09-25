import { Table, Column, Model, DataType, PrimaryKey, Default, AllowNull, Validate, ForeignKey, BelongsTo, HasMany, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import { User } from './user';
import { Notification } from './notification';
import { ValidationError } from '../../utils/client-errors';
import { GameTypes } from '../../types/gameContentTypes';

@Table({
    tableName: 'game_sessions',
    timestamps: true,
    validate: {
        playersAreDifferent() {
            if (this.player1Id === this.player2Id) {
                throw new ValidationError('Player 1 and Player 2 must be different users');
            }
        },
        // scoreValidation() {
        //     if (this.finishedAt && (!this.player1Score || !this.player2Score)) {
        //         throw new ValidationError('Finished games must have scores for both players');
        //     }
        // }
    }
})
export class GameSession extends Model {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id!: string;

    @ForeignKey(() => User)
    @AllowNull(false)
    @Column(DataType.UUID)
    player1Id!: string;

    @ForeignKey(() => User)
    @AllowNull(false)
    @Column(DataType.UUID)
    player2Id!: string;

    @AllowNull(true)
    @Validate({
        min: 0,
        max: 1000000
    })
    @Column(DataType.BIGINT)
    player1Score?: number;

    @AllowNull(true)
    @Validate({
        min: 0,
        max: 1000000
    })
    @Column(DataType.BIGINT)
    player2Score?: number;

    @AllowNull(false)
    @Validate({
        isIn: [Object.values(GameTypes)]
    })
    @Column(DataType.ENUM(...Object.values(GameTypes)))
    gameType!: GameTypes;

    @AllowNull(true)
    @Column(DataType.UUID)
    winnerId?: string;

    @AllowNull(false)
    @Default({})
    @Column(DataType.JSON)
    content!: object;

    @AllowNull(true)
    @Column(DataType.DATE)
    finishedAt?: Date;

    @AllowNull(true)
    @Column(DataType.TEXT)
    imageUrl?: string;

    @CreatedAt
    createdAt!: Date;

    @UpdatedAt
    updatedAt!: Date;

    // Associations
    @BelongsTo(() => User, {
        foreignKey: 'player1Id',
        as: 'player1'
    })
    player1!: User;

    @BelongsTo(() => User, {
        foreignKey: 'player2Id',
        as: 'player2'
    })
    player2!: User;

    @HasMany(() => Notification, {
        foreignKey: 'gameSessionId',
        as: 'notifications'
    })
    notifications!: Notification[];

    // Instance methods
    public isFinished(): boolean {
        return !!this.finishedAt;
    }

    public async getWinner(): Promise<User | null> {
        if (!this.winnerId) return null;
        return await User.findByPk(this.winnerId);
    }

    public async getLoser(): Promise<User | null> {
        if (!this.winnerId) return null;

        // Load the loser from the database
        const loserId = this.winnerId === this.player1Id ? this.player2Id : this.player1Id;
        return await User.findByPk(loserId);
    }

    // public async finishGame(player1Score: number, player2Score: number): Promise<void> {
    //     this.player1Score = player1Score;
    //     this.player2Score = player2Score;
    //     this.winnerId = player1Score > player2Score
    //         ? this.player1Id :
    //         player2Score > player1Score ? this.player2Id :
    //             null; // tie
    //     this.finishedAt = new Date();
    //     await this.save();
    // }
}
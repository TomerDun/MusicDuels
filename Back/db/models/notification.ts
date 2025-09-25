import { Table, Column, Model, DataType, PrimaryKey, Default, AllowNull, Validate, ForeignKey, BelongsTo, CreatedAt } from 'sequelize-typescript';
import { User } from './user';
import { GameSession } from './gameSession';
import { ValidationError } from '../../utils/client-errors';

export enum NotificationStatus {
    PENDING = 'pending',
    ACCEPTED = 'accepted',
    DECLINED = 'declined',
    COMPLETED = 'completed'
}

@Table({
    tableName: 'notifications',
    timestamps: false, // Only createdAt, no updatedAt
    createdAt: true,
})
export class Notification extends Model {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id!: string;

    @ForeignKey(() => User)
    @AllowNull(false)
    @Column(DataType.UUID)
    senderId!: string;

    @ForeignKey(() => User)
    @AllowNull(false)
    @Column(DataType.UUID)
    receiverId!: string;

    @ForeignKey(() => GameSession)
    @AllowNull(false)
    @Column(DataType.UUID)
    gameSessionId!: string;

    @AllowNull(true)
    @Validate({
        len: [1, 500]
    })
    @Column(DataType.TEXT)
    content?: string;

    @AllowNull(false)
    @Validate({
        isIn: [Object.values(NotificationStatus)]
    })
    @Column(DataType.ENUM(...Object.values(NotificationStatus)))
    status!: NotificationStatus;

    @CreatedAt
    createdAt!: Date;

    // Associations
    @BelongsTo(() => User, {
        foreignKey: 'senderId',
        as: 'sender'
    })
    sender!: User;

    @BelongsTo(() => User, {
        foreignKey: 'receiverId',
        as: 'receiver'
    })
    receiver!: User;

    @BelongsTo(() => GameSession, {
        foreignKey: 'gameSessionId',
        as: 'gameSession'
    })
    gameSession!: GameSession;

    // Instance methods
    public isPending(): boolean {
        return this.status === NotificationStatus.PENDING;
    }

    public isAccepted(): boolean {
        return this.status === NotificationStatus.ACCEPTED;
    }

    public isDeclined(): boolean {
        return this.status === NotificationStatus.DECLINED;
    }

    public isCompleted(): boolean {
        return this.status === NotificationStatus.COMPLETED;
    }

    public async accept(): Promise<void> {
        if (!this.isPending()) {
            throw new ValidationError('Can only accept pending notifications');
        }
        this.status = NotificationStatus.ACCEPTED;
        await this.save();
    }

    public async decline(): Promise<void> {
        if (!this.isPending()) {
            throw new ValidationError('Can only decline pending notifications');
        }
        this.status = NotificationStatus.DECLINED;
        await this.save();
    }

    public async markCompleted(): Promise<void> {
        this.status = NotificationStatus.COMPLETED;
        await this.save();
    }

    public async getFormattedMessage(customMsg?: string): Promise<string> {
        // send message from sender if exists:
        if (customMsg) return customMsg;

        // Load associations if not already loaded
        if (!this.sender) {
            await this.reload({
                include: [
                    { association: 'sender' },
                    { association: 'gameSession' }
                ]
            });
        }
        console.log('getFormattedMessage sender:', this.sender)

        const senderName = this.sender.username;
        const gameType = this.gameSession.gameType;

        switch (this.status) {
            case NotificationStatus.PENDING:
                return `${senderName} challenged you to a ${gameType} battle!`;
            case NotificationStatus.ACCEPTED:
                return `You accepted ${senderName}'s ${gameType} challenge`;
            case NotificationStatus.DECLINED:
                return `You declined ${senderName}'s ${gameType} challenge`;
            case NotificationStatus.COMPLETED:
                return `${gameType} battle with ${senderName} is complete`;
            default:
                return this.content || 'New notification';
        }
    }
}
// add user to express request object
declare global {
    namespace Express {
        interface Request {
            user?: TokenUser
        }
    }
}

export type TokenUser = {
    id:string;
    email:string;
    username:string;
}

export enum NotificationStatus {
    PENDING = 'pending',
    ACCEPTED = 'accepted',
    DECLINED = 'declined',
    COMPLETED = 'completed'
}
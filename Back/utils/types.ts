// add user to express request object
declare global {
    namespace Express {
        interface Request {
            user?: RequestUser
        }
    }
}

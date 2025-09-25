import { User } from "../db/models";
import { ResourceNotFoundError } from "./client-errors";


export async function updateUserTotalScore(userId:string, delta:number) {
    const user = await User.findByPk(userId);
    if (!user) throw new ResourceNotFoundError(userId);
    user.totalScore += delta;
    if (user.totalScore < 0) {user.totalScore = 0};
    await user.save();

    return user.totalScore;

}
import { User } from "../db/models";
import { ResourceNotFoundError } from "./client-errors";


export async function updateUserTotalScore(userId:string, delta:number) {
    const user = await User.findByPk(userId);
    if (!user) throw new ResourceNotFoundError(userId);
    const newScore = Number(user.totalScore) + Number(delta);
    user.totalScore = Number(newScore);
    if (user.totalScore < 0) {user.totalScore = 0};
    await user.save();

    return user.totalScore;

}
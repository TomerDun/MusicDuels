import { Op } from "sequelize";
import { GameSession, User } from "../db/models";
import { ResourceNotFoundError } from "./client-errors";

export async function getUserDuels(userId){
    const duels = await GameSession.findAll({
        where:{
            [Op.or]:[
                {player1Id:userId},
                {player2Id:userId}
            ]
        }
    })
    return duels
}

export async function getUserRank(userId){
    // Efficient leaderboard position calculation
    const user = await User.findByPk(userId);
    if (!user) {
        throw new ResourceNotFoundError(`User with id: ${userId} not found`);
    }
    const higherScoreCount = await User.count({
        where: {
            totalScore: { [Op.gt]: user.totalScore }
        }
    });
    return higherScoreCount + 1;
}
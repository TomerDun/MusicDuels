// TODO: Add content injection keys to types

import { GameTypes } from "./gameContentTypes"

export type newGameSession = {
    player1Id: string,
    player2Id: string,
    gameType: GameTypes,
    player1Score: number,
    inspiration?:string
}
export type GameSessionType = {
    id: string,
    player1Id: string,
    player2Id: string,
    player1Score?: string | null,
    player2Score?: string | null,
    content: GameContentType[],
    difficulty?: GameDifficulty,
    gameType: GameTypes
    winnerId?: string,

    // TODO: Maybe remove this from the type later
    imageUrl?: string | null,
    createdAt?: string| Date | null,
    updatedAt?: string| Date | null,
}

export type GameContentType = string[] | boolean [][]

export enum GameDifficulty {
    EASY = 'easy',
    MEDIUM = 'medium',
    HARD = 'hard'
}

export enum GameTypes {
    SIGHT_READ = 'sight-read',
    PERFECT_EAR = 'perfect-ear',
    RYTHM_MASTER = 'rythm-master'
}

export type GameHistoryItemType = {
    gameType:string,
    date:string,
    userScore:number,
    opponentScore:number,
    opponentName:string,
    winnerId:string
}
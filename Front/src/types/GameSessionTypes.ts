export type GameSessionType = {
    id: string,
    player1Id: string,
    player2Id: string,
    player1Score?: string,
    player2Score?: string,
    content: GameContent
    difficulty?: GameDifficulty
}

type GameContent = string[][]

enum GameDifficulty {
    EASY = 'easy',
    MEDIUM = 'medium',
    HARD = 'hard'
}
import type { GameHistoryItemType } from "../types/GameSessionTypes"


interface GameHistoryItemProps {
    item: GameHistoryItemType
    activeUserId?:string
}

export default function GameHistoryItem({item,activeUserId}:GameHistoryItemProps){

    const displayWinner = () => {
        if(activeUserId === item.winnerId){
            return(
                <div>
                    You Won
                </div>
            )
        } else {
            return(
                <div>
                    You Lost
                </div>
            )
        }
    }
    
    return(
        <div className="glass-container">
            <div id="top-section" className="flex justify-between">
                <div>
                    {item.gameType}
                </div>
                <div>
                    {item.date}
                </div>
            </div>
            <div id="score-section" className="w-[50%] flex m-auto justify-between">
                <div className="w-[45%]">
                    Your Score: {item.userScore}
                </div>
                <div className="w-[45%]">
                    {item.opponentName}'s Score: {item.opponentScore}
                </div>
            </div>
            <div id="winner-section">
                {displayWinner()}
            </div>
        </div>
    )
}


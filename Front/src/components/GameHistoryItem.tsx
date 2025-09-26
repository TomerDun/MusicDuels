import type { GameHistoryItemType } from "../types/GameSessionTypes"


interface GameHistoryItemProps {
    item: GameHistoryItemType
    activeUserId?:string
}

export default function GameHistoryItem({item,activeUserId}:GameHistoryItemProps){

    const isWinner = activeUserId === item.winnerId;

    const displayWinner = () => {
        if(isWinner){
            return(
                <div className="text-green-600 text-xl flex justify-end">
                    Game Won
                </div>
            )
        } else {
            return(
                <div className="text-red-800 text-xl flex justify-end">
                    Game Lost
                </div>
            )
        }
    }
    
    return(
        <div className={isWinner ? "glass-container !bg-gradient-to-l from-green-800/10 to-black/20 mb-3" :"glass-container !bg-gradient-to-l from-red-800/10 to-black/20 mb-3"}>
            <div id="top-section" className="flex justify-between">
                <div className="p-2 border border-teal-400 rounded-md text-teal-400">
                    {item.gameType}
                </div>
                <div className="text-white/70">
                    {new Date(item.date).toLocaleDateString()}
                </div>
            </div>
            <div id="score-section" className="w-[60%] flex m-auto justify-between -my-6">
                <div className="w-[45%] flex flex-col items-center">
                    <div className=" mt-2 bg-gradient-to-r from-blue-400/30 to-blue-400/50 rounded-md p-2 flex flex-col items-center min-w-52">
                        <div className="text-white/70">
                            Your Score
                        </div>
                        <span className="text-2xl font-bold">
                            {item.userScore}
                        </span>
                    </div>
                </div>
                <div className="w-[35%] flex flex-col items-center ">
                    <div className=" mt-2 bg-gradient-to-r from-blue-400/30 to-blue-400/50 rounded-md p-2 flex flex-col items-center min-w-52">
                        <div className="text-white/70">
                            {item.opponentName}'s Score
                        </div>
                        <span className="text-2xl font-bold">
                            {item.opponentScore}
                        </span>
                    </div>
                </div>
            </div>
            <div id="winner-section">
                {displayWinner()}
            </div>
        </div>
    )
}


import { IconCrown, IconTrophyFilled } from "@tabler/icons-react";

interface TopPlayerCardProps {
    placement:number;
}

const cardStyles: Record<number, string> = {
  1: "bg-gradient-to-br from-accent/30 to-yellow-600/30 rounded-2xl p-8 border border-yellow-300/50 text-center relative",
  2: "h-[80%] bg-gradient-to-br from-gray-400/20 to-gray-600/20 rounded-2xl p-6 border border-gray-400/30 text-center transform translate-y-8",
  3: "h-[80%] bg-gradient-to-br from-orange-400/20 to-orange-600/20 rounded-2xl p-6 border border-orange-400/30 text-center transform translate-y-8",
};

const circleStyles: Record<number, string> = {
  1: "w-24 h-24 bg-yellow-400",
  2: "w-20 h-20 bg-gray-400",
  3: "w-20 h-20 bg-orange-400",
};

const borderColors: Record<number, string> = {
    1: "border-yellow-400",
    2: "border-gray-400",
    3: "border-orange-400"
}
const textColors: Record<number, string> = {
    1: "text-yellow-400",
    2: "text-gray-400",
    3: "text-orange-400"
}

const subTextColors: Record<number, string> = {
    1: "text-yellow-300",
    2: "text-gray-300",
    3: "text-orange-300"
}

const iconColors: Record<number, string> = {
    1: "yellow",
    2: "gray",
    3: "orange"
}

function TopPlayerCard({placement}:TopPlayerCardProps){

    const crown = () => {
        if(placement === 1){
            return <IconCrown fill="yellow" color="yellow" className="absolute -top-4 left-1/2 transform -translate-x-1/2"/>
        }
        return null
    }

    return (
        <div className={cardStyles[placement]}>
            {crown()}
            <div id="placement-circle" className={`${circleStyles[placement]} rounded-full flex items-center justify-center text-black font-bold text-2xl mx-auto mb-4`}>
                {placement}
            </div>
            <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg" className={`w-16 h-16 rounded-full mx-auto mb-3 border-4 ${borderColors[placement]}`}/>
            <h3 className="text-white font-bold text-lg">RhythmKing</h3>
            <p className={`${subTextColors[placement]} text-sm mb-2`}>Level 45</p>
            <p className={`${textColors[placement]} font-bold text-xl`}>14,890 pts</p>
            <div className="flex items-center justify-center space-x-2 mt-2">
                <IconTrophyFilled color={iconColors[placement]}/>
                <span className={`${subTextColors[placement]} text-sm`}>95% win rate</span>
            </div>
        </div>
    )
}

export default TopPlayerCard;
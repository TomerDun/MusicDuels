import { useState } from "react"
import { IconSearch } from "@tabler/icons-react";

function LeaderboardFilter(){

    const [searchInput,setSearchInput] = useState("");

    return(
    <div id="leaderboard-filters" className="glass-container mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
            {/* <div className="flex items-center space-x-4">
                <h3 className="text-white font-semibold">Filter by:</h3>
                <select className="bg-black/30 text-white rounded-lg px-4 py-2 border border-white/20 focus:outline-none focus:border-primary">
                    <option>All Time</option>
                    <option>This Week</option>
                    <option>This Month</option>
                </select>
                <select className="bg-black/30 text-white rounded-lg px-4 py-2 border border-white/20 focus:outline-none focus:border-primary">
                    <option>All Games</option>
                    <option>Sight Reading</option>
                    <option>Perfect Pitch</option>
                    <option>Rhythm Master</option>
                    <option>Chord Detective</option>
                    <option>Theory Quiz</option>
                    <option>Speed Challenge</option>
                </select>
            </div> */}
            <div className="flex items-center space-x-3 w-full">
                <div className="relative w-full">
                    <input 
                        type="text" 
                        placeholder="Search players..." 
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)} 
                        className="bg-black/30 text-white rounded-lg px-4 py-2 pl-10 border border-white/20 focus:outline-none focus:border-primary w-[100%]"/>
                    <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50"/>
                </div>
            </div>
        </div>
    </div>
    )
}

export default LeaderboardFilter
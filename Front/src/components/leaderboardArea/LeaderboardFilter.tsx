import { useState } from "react"
import { IconSearch } from "@tabler/icons-react";

function LeaderboardFilter(){

    const [searchInput,setSearchInput] = useState("");

    return(
    <div id="leaderboard-filters" className="glass-container outline-1 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
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
            </div>
            <div className="flex items-center space-x-3">
                <div className="relative">
                    <input 
                        type="text" 
                        placeholder="Search players..." 
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)} 
                        className="bg-black/30 text-white rounded-lg px-4 py-2 pl-10 border border-white/20 focus:outline-none focus:border-primary w-64"/>
                    <i className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" data-fa-i2svg=""><svg className="svg-inline--fa fa-magnifying-glass" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="magnifying-glass" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path></svg></i>
                </div>
            </div>
        </div>
    </div>
    )
}

export default LeaderboardFilter
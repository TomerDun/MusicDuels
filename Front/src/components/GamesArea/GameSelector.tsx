import { IconEar, IconMetronome, IconPiano } from "@tabler/icons-react";

export default function GameSelector() {
    return (
        <div id="game-selector-container" className="p-4 bg-black/70 border-1 border-gray-400 rounded-md">
            <div id="header-row" className="mb-4">
                <h2 className="text-2xl text-white font-bold">Choose Your challenge </h2>
            </div>

            <div id="game-buttons-container" className="flex flex-wrap justify-between">
                <div className="game-select-button">
                    <div id="icon-box" className="text-white flex items-center justify-center"><IconPiano /></div>
                    <h3 className="text-white font-bold" id="game-title">Sight Reader</h3>
                    <p className="text-white/70">Show off your sheet music reading mastery</p>
                </div>

                <div className="game-select-button">
                    <div id="icon-box" className="text-white flex items-center justify-center"><IconMetronome /></div>
                    <h3 className="text-white font-bold" id="game-title">Beat Repeat</h3>
                    <p className="text-white/70">Replicate a beat on the drum machine</p>
                </div>

                <div className="game-select-button">
                    <div id="icon-box" className="text-white flex items-center justify-center"><IconEar /></div>
                    <h3 className="text-white font-bold" id="game-title">Perfect Ear</h3>
                    <p className="text-white/70">Challenge a player to a note replication challenge</p>
                </div>
            </div>
        </div>
    )
}
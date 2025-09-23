import { IconEar, IconMetronome, IconPiano } from "@tabler/icons-react";

export default function GameSelector({onPickGame}: {onPickGame: Function})  {
    return (
        <div id="game-selector-container" className="p-8 pb-16 bg-gradient-to-br from-gray-900 to-black bg-black/70 border-1 border-white/2- rounded-md">
            <div id="header-row" className="mb-4">
                <span className="text-2xl text-white font-bold">Choose Your  </span>
                <span className="text-2xl font-bold text-teal-400">Challenge</span>
            </div>

            <div id="game-buttons-container" className="flex flex-wrap justify-evenly">

                <div onClick={() => onPickGame('sight-read')} className="game-select-button interactive w-[30%] from-indigo-500/20 to-indigo-500/5">
                    <div id="icon-box" className="icon-box bg-indigo-400/50"><IconPiano size={30}/></div>
                    <h3 className="text-white font-bold" id="game-title">Sight Reader</h3>
                    <p className="text-white/70">Show off your sheet music reading mastery</p>
                </div>

                <div onClick={() => onPickGame('rythm-master')} className="game-select-button interactive w-[30%] from-yellow-400/20 to-yellow-400/10">
                    <div id="icon-box" className="icon-box bg-amber-300/60"><IconMetronome /></div>
                    <h3 className="text-white font-bold" id="game-title">Rythm Master</h3>
                    <p className="text-white/70 text-center">Replicate a beat on the drum machine</p>
                </div>

                {/* <div class="game-card bg-gradient-to-br from-secondary/20 to-secondary/5 border border-secondary/30 rounded-2xl p-6 cursor-pointer hover:scale-105 transition-transform">
                    <div class="text-center">
                        <div class="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <i class="text-white text-2xl" data-fa-i2svg=""><svg class="svg-inline--fa fa-ear-listen" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="ear-listen" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M398.3 3.4c-15.8-7.9-35-1.5-42.9 14.3c-7.9 15.8-1.5 34.9 14.2 42.9l.4 .2c.4 .2 1.1 .6 2.1 1.2c2 1.2 5 3 8.7 5.6c7.5 5.2 17.6 13.2 27.7 24.2C428.5 113.4 448 146 448 192c0 17.7 14.3 32 32 32s32-14.3 32-32c0-66-28.5-113.4-56.5-143.7C441.6 33.2 427.7 22.2 417.3 15c-5.3-3.7-9.7-6.4-13-8.3c-1.6-1-3-1.7-4-2.2c-.5-.3-.9-.5-1.2-.7l-.4-.2-.2-.1-.1 0 0 0c0 0 0 0-14.3 28.6L398.3 3.4zM128.7 227.5c6.2-56 53.7-99.5 111.3-99.5c61.9 0 112 50.1 112 112c0 29.3-11.2 55.9-29.6 75.9c-17 18.4-34.4 45.1-34.4 78V400c0 26.5-21.5 48-48 48c-17.7 0-32 14.3-32 32s14.3 32 32 32c61.9 0 112-50.1 112-112v-6.1c0-9.8 5.4-21.7 17.4-34.7C398.3 327.9 416 286 416 240c0-97.2-78.8-176-176-176C149.4 64 74.8 132.5 65.1 220.5c-1.9 17.6 10.7 33.4 28.3 35.3s33.4-10.7 35.3-28.3zM32 512a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM192 352a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3l64 64c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-64-64c-12.5-12.5-32.8-12.5-45.3 0zM208 240c0-17.7 14.3-32 32-32s32 14.3 32 32c0 13.3 10.7 24 24 24s24-10.7 24-24c0-44.2-35.8-80-80-80s-80 35.8-80 80c0 13.3 10.7 24 24 24s24-10.7 24-24z"></path></svg></i>
                        </div>
                        <h3 class="text-xl font-bold text-white mb-2">Perfect Pitch</h3>
                        <p class="text-white/60 text-sm">Identify notes by ear</p>
                    </div>
                </div> */}

                <div onClick={() => onPickGame('perfect-ear')} className="game-select-button interactive w-[30%] from-teal-300/30 to-teal-200/10">
                    <div id="icon-box" className="icon-box bg-teal-400/50"><IconEar /></div>
                    <h3 className="text-white font-bold" id="game-title">Perfect Ear</h3>
                    <p className="text-white/70 text-center">Challenge a player to a note replication challenge</p>
                </div>
            </div>
        </div>
    )
}
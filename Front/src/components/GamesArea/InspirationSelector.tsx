
export default function InspirationSelector({onPick}: {onPick: Function})  {
    return (
        <div id="game-selector-container" className="p-8 pb-16 bg-gradient-to-br from-gray-900 to-black bg-black/70 border-1 border-white/2- rounded-md">
            <div id="header-row" className="mb-4">
                <span className="text-2xl text-white font-bold">Choose Your  </span>
                <span className="text-2xl font-bold text-teal-400">Inspitation</span>
            </div>

            <div id="inspiration-buttons-container" className="flex gap-6 flex-wrap justify-evenly">

                <div onClick={() => onPick('mozart')} className="game-select-button !gap-2 interactive w-[30%]  from-orange-400/20 to-yellow-100/10">
                    {/* <div id="icon-box" className="icon-box bg-indigo-400/50"><IconPiano size={30}/></div> */}
                    <img src="\src\assets\inpirations\mozart.png" alt=""className="max-h-70" />
                    <h3 className="text-white font-bold text-lg" id="inspiration-title">Wolfgang Amadeus Mozart</h3>
                    <p className="text-white/70 text-center">Elegant, balanced, and melodically expressive</p>
                </div>
                <div onClick={() => onPick('bach')} className="game-select-button !gap-2 interactive w-[30%]  from-orange-400/20 to-yellow-100/10">
                    {/* <div id="icon-box" className="icon-box bg-amber-300/60"><IconMetronome /></div> */}
                    <img src="\src\assets\inpirations\bach.png" alt="" className="max-h-70"/>
                    <h3 className="text-white font-bold text-lg" id="inspiration-title">Johann Sebastian Bach</h3>
                    <p className="text-white/70 text-center">Intricate, structured, and harmonically rich</p>
                </div>
                <div onClick={() => onPick('deBussy')} className="game-select-button !gap-2 interactive w-[30%]  from-orange-400/20 to-yellow-100/10">
                    {/* <div id="icon-box" className="icon-box bg-teal-400/50"><IconEar /></div> */}
                    <img src="\src\assets\inpirations\debussy.png" alt="" className="max-h-70"/>
                    <h3 className="text-white font-bold text-lg" id="inspiration-title">Claude DeBussy</h3>
                    <p className="text-white/70 text-center">Atmospheric, fluid, and impressionistic</p>
                </div>
                <div onClick={() => onPick('charlie-parker')} className="game-select-button !gap-2 interactive w-[30%] from-orange-400/20 to-yellow-100/10">
                    {/* <div id="icon-box" className="icon-box bg-teal-400/50"><IconEar /></div> */}
                    <img src="\src\assets\inpirations\charlie.png" alt="" className="max-h-70"/>
                    <h3 className="text-white font-bold text-lg" id="inspiration-title">Charlie Parker</h3>
                    <p className="text-white/70 text-center">Bold, virtuosic, and harmonically adventurous</p>
                </div>
                <div onClick={() => onPick('beatles')} className="game-select-button !gap-2 interactive w-[30%]  from-orange-400/20 to-yellow-100/10">
                    {/* <div id="icon-box" className="icon-box bg-teal-400/50"><IconEar /></div> */}
                    <img src="\src\assets\inpirations\beatles.png" alt="" className="max-h-70"/>
                    <h3 className="text-white font-bold text-lg" id="inspiration-title">The Beatles</h3>
                    <p className="text-white/70 text-center">Melodic, innovative, and genre-blending</p>
                </div>
                <div onClick={() => onPick('random')} className="game-select-button !gap-2 interactive w-[30%]  from-orange-400/20 to-yellow-100/10">
                    {/* <div id="icon-box" className="icon-box bg-teal-400/50"><IconEar /></div> */}
                    <img src="\src\assets\inpirations\random.png" alt="" className="max-h-70"/>
                    <h3 className="text-white font-bold text-lg" id="inspiration-title">Random</h3>
                    <p className="text-white/70 text-center">A random set of notes</p>
                </div>
            </div>
        </div>
    )
}
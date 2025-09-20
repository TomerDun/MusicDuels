import { useEffect, useState } from "react";
import { BpmToMs } from "../../utils/musicUtils";
import { DrumMachine as Drums } from "smplr";

const SOUNDS = [
    'kick',
    'snare'
]
console.log('...one time loading...');

const soundPlayer = new Drums(new AudioContext(), { instrument: 'TR-808' })    

export default function DrumMachine() {
    const [drumRows, setDrumRows] = useState<boolean[][]>([[false,false,false,false,false,false,false,false], [false,false,false,false,false,false,false,false]]);
    const [currBeat, setCurrBeat] = useState(0);
    const [bpm, setBpm] = useState(60);
    


    useEffect(() => {
        console.log('Starting interval...');

        let drumInterval:number;
        soundPlayer.load.then(() => {
            console.log('🥁 Sound player ready...');

            // Build the sequencer rows
            const newRows = [
                [true, false, true, false], //kick
                [false, true, false, true], //snare
            ]
            setDrumRows(newRows);

            drumInterval = setInterval(() => setCurrBeat(prev => prev >= 7 ? 0 : prev + 1), BpmToMs(bpm) / 2);

            console.log(soundPlayer.getSampleNames());
        })

        return () => {
            clearInterval(drumInterval);
            console.log('Clearing drum interval...');
        }
    }, [bpm])

    useEffect(playBeat, [currBeat]);




    function playBeat() {
        let output = 'Playing '

        drumRows.forEach((row, index) => {
            if (row[currBeat]) {
                output += SOUNDS[index];
                soundPlayer.start({ note: SOUNDS[index] })
            }
        })

        console.log(`Beat ${currBeat}: `, output);

    }




    return (
        <div id="drum-machine" className="bg-green-400 h-full pt-[100px] pl-[70px]">
            <div className="flex gap-4 mb-7">
                <div onClick={() => soundPlayer.start({note: 'kick/bd0050'})} className="drum-tile active">K</div>
                <div className="drum-tile">K</div>
                <div className="drum-tile">K</div>
                <div className="drum-tile">K</div>
            </div>

            <div className="flex gap-4">
                <div className="drum-tile">S</div>
                <div className="drum-tile">S</div>
                <div className="drum-tile">S</div>
                <div className="drum-tile">S</div>
            </div>
        </div>
    )
}
import { useEffect, useState } from "react";
import { BpmToMs } from "../../utils/musicUtils";
import { DrumMachine as Drums } from "smplr";

const SOUNDS = [
    'kick',
    'snare',
    'hihat-close',
    'hihat-open'
]

const INIT_ROWS = [
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
]

console.log('...one time loading...');

const soundPlayer = new Drums(new AudioContext(), { instrument: 'TR-808' })

export default function DrumMachine() {
    const [drumRows, setDrumRows] = useState<boolean[][]>(INIT_ROWS);
    const [currBeat, setCurrBeat] = useState(0);
    const [bpm, setBpm] = useState(100);



    useEffect(() => {
        console.log('Starting interval...');

        let drumInterval: number;
        soundPlayer.load.then(() => {
            console.log('🥁 Sound player ready...');
            drumInterval = setInterval(() => setCurrBeat(prev => prev >= 7 ? 0 : prev + 1), BpmToMs(bpm) / 2);

            console.log(soundPlayer.getGroupNames());
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

    function updateSequence(row: number, tile: number) {
        const newRows = drumRows.map((drumRow, rowIndex) => {
            const newRow = [...drumRow];
            if (rowIndex === row) {
                newRow[tile] = !newRow[tile];
            }
            return newRow;
        })

        setDrumRows(newRows);
    }




    return (
        <div id="drum-machine" className="bg-green-400 h-full pt-[100px] pl-[70px]">
            {drumRows.map((row, rowIndex) => {
                return (
                    <div key={rowIndex} className="flex gap-4 mb-7">
                        {row.map((tileValue, tileIndex) => <div key={tileIndex} onClick={() => updateSequence(rowIndex, tileIndex)} className={`drum-tile interactive ${drumRows[rowIndex][tileIndex] ? 'active' : ''}`}>{SOUNDS[rowIndex][0]}</div>)}
                    </div>
                )
            })}
            
            <div className="drum-tile">{currBeat+1}</div>
        </div>
    )
}
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
]

const ANSWER_ROWS = [ // MOCK
    [true, false, false, true, true, false, false, false],
    [false, false, true, false, false, false, true, false],
    [true, false, true, false, true, false, true, true],
]

console.log('...one time loading...');

const soundPlayer = new Drums(new AudioContext(), { instrument: 'TR-808' })

export default function DrumMachine({ }) {
    const [userInputRows, setUserInputRows] = useState<boolean[][]>(INIT_ROWS); // rows of drum input by the user
    const [answerRows, setAnswerRows] = useState(ANSWER_ROWS);
    const [currBeat, setCurrBeat] = useState(0);
    const [bpm, setBpm] = useState(100);
    const [beatType, setBeatType] = useState<'' | 'player' | 'answer'>('') // whether to play the answer sequence or the player input sequence - ''
    const [drumInterval, setDrumInterval] = useState(0) // the interval for playing a beat



    // Load soundplayer on mount
    useEffect(() => {
        soundPlayer.load.then(() => {
            console.log('🎧 Sound player ready...');
            // console.log(soundPlayer.getGroupNames());            
        })

        return () => {
            clearInterval(drumInterval);
            console.log('❌ (unmount) Clearing drum interval...');
        }
    }, [])


    // Start or stop the beat playing interval
    useEffect(() => {
        clearInterval(drumInterval);
        console.log('❌ Clearing drum interval...');

        if (beatType) {
            let interval: number = setInterval(() => setCurrBeat(prev => prev >= 7 ? 0 : prev + 1), BpmToMs(bpm) / 2);
            setDrumInterval(interval);
            console.log('🥁 Starting beat interval');
        }

    }, [beatType])

    useEffect(playBeat, [currBeat]); // play beat everytime currBeat changes (based on time interval)

    function playBeat() {
        let output = 'Playing '
        const drumRows = (beatType === 'answer') ? answerRows : userInputRows;

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

            <div className="drum-tile">{currBeat + 1}</div>
        </div>
    )
}
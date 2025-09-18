import { useState, useEffect, useRef } from 'react';
// @ts-ignore
import { KeyboardShortcuts, Piano, MidiNumbers } from 'react-piano';
import 'react-piano/dist/styles.css'
import { Soundfont, SplendidGrandPiano } from 'smplr';
import SheetMusic from '../components/musicToolsArea/SheetMusic'
import { useMIDI, type NoteEvent } from '../utils/midiUtils'

type props = {
    instructions: string,
    answerNotes: string[],
    duration?: number
}

// TODO: Make piano dimensions ratio more responsive
//TODO: Make sheet music width fill the outside container

export default function SightReaderPage({ instructions, answerNotes, duration }: props) {


    // --MOCK--
    instructions = 'Play the notes on the screen fool'
    answerNotes = ['C4', 'E4', 'D4', 'F4', 'E4', 'G4', 'F4', 'A4', 'C5'];

    const [playedNotes, setPlayedNotes] = useState<string[]>([]);
    const pianoContainer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        return () => {
            soundPlayer.disconnect();
        }
    }, [])

    useEffect(() => {
        if (playedNotes.length >= answerNotes.length) {
            onSubmit();
        }
    }, [playedNotes]);

    function onPianoPlay(note: any) {
        const noteStr: string = MidiNumbers.getAttributes(note).note;
        console.log(`MIDI: ${note}, Note: ${noteStr}`);
        soundPlayer.start(note);
        setPlayedNotes([...playedNotes, noteStr])

        // Check if finished
        if (playedNotes.length >= answerNotes.length) {
            onSubmit();

        }

    }

    function onPianoRelease(note: any) {
        // soundPlayer.stop(note);
    }

    function onSubmit() {
        const score = calculateScore();
        console.log('YOUR SCORE IS: ', score);
        setTimeout(() => { setPlayedNotes([]) }, 2500);


    }

    function calculateScore() {
        let score = 0;
        for (let i in playedNotes) {
            if (playedNotes[i] === answerNotes[i]) {
                score++
                console.log('corrent on ', playedNotes[i]);

            }
        }
        return score;
    }



    // Sound Init    
    const soundPlayer = new Soundfont(new AudioContext(), { instrument: 'marimba' });
    // const soundPlayer = new SplendidGrandPiano(new AudioContext());

    // Piano Init
    const noteRange = {
        first: MidiNumbers.fromNote('c4'),
        last: MidiNumbers.fromNote('f6'),
    };

    const keyboardShortcuts = KeyboardShortcuts.create({
        firstNote: noteRange.first,
        lastNote: noteRange.last,
        keyboardConfig: KeyboardShortcuts.HOME_ROW,
    });

    return (
        <div id="sight-reader" className='h-full bg-gradient-to-r from-emerald-500 to-emerald-600'>
            <div className="page-content-container pt-12">

                <div id="header-area" className='flex justify-center'>
                    <div className="p-4 border-2 w-[40%] text-center font-bold text-indigo-600 border-white/70 rounded-md bg-white/50 ">
                        <h1 className='text-xl'>Sight Reader</h1>
                    </div>
                </div>

                <div className='pt-6 mb-32' id="sheet-music-area">
                    <div id="sheet-container" className='bg-gray-100 mb-12 rounded-md border-2 border-white/80'>
                        <SheetMusic containerId='answer-sheet' notesArr={answerNotes} />
                    </div>

                    <div id="sheet-container" className='bg-gray-100 border-2 border-white/80 rounded-md'>
                        <SheetMusic containerId='user-sheet' notesArr={playedNotes} showAnswers={true} answersArr={answerNotes} />
                    </div>

                </div>

                <div id="piano-container" ref={pianoContainer} className='w-full h-48'>
                    <Piano
                        noteRange={{ first: noteRange.first, last: noteRange.last }}
                        keyboardShortcuts={keyboardShortcuts}
                        playNote={(note: any) => (onPianoPlay(note))}
                        stopNote={(note: any) => (onPianoRelease({ midiNote: note }))}
                        // width={pianoContainer.current ? pianoContainer.current.clientWidth : 1000}

                    />
                </div>
            </div>
        </div>
    )
}
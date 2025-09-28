import { useState, useEffect, useRef } from 'react';
// @ts-ignore
import { KeyboardShortcuts, Piano, MidiNumbers } from 'react-piano';
import 'react-piano/dist/styles.css'
import { Soundfont, getSoundfontNames } from 'smplr';
import SheetMusic from '../components/musicToolsArea/SheetMusic'
import type { GameContentType } from '../types/GameSessionTypes';
import { useMIDI, type NoteEvent } from '../utils/midiUtils'

type props = {
    answerNotes: GameContentType
    gameTimer: number,
    setUserInput: Function,
    paused: boolean,
    setPaused: Function,
    userInput: GameContentType // Actually string[]
    betweenRounds: boolean,
}

// TODO: Make piano dimensions ratio more responsive
//TODO: Make sheet music width fill the outside container

const soundPlayer = new Soundfont(new AudioContext(), { instrument: 'marimba' })
console.log('instruments: ', getSoundfontNames());


export default function SightReaderPage({ answerNotes, gameTimer, setUserInput, userInput, paused, setPaused, betweenRounds }: props) {    


    const [soundPlayerLoaded, setSoundPlayerLoaded] = useState(false);
    const [activePianoNotes, setActivePianoNotes] = useState<number[]>([]);
    // const [soundPlayer, setSoundPlayer] = useState();

    useMIDI(onMidiEnter, onMidiRelease);
    
    // const [playedNotes, setPlayedNotes] = useState<string[]>([]);
    const pianoContainer = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        loadSoundPlayer()
        // return () => {
        //     soundPlayer.disconnect();
        // }
    }, [])

    useEffect(() => {
        setActivePianoNotes([]);
    }, [betweenRounds])

    function onMidiEnter(note:NoteEvent) {
        console.log('midi enter note ', note.midiNote);
        setActivePianoNotes(prev => [...prev, note.midiNote])
        
    }

    function onMidiRelease(note:NoteEvent) {
        console.log('midi release note ', note.midiNote);
        setActivePianoNotes(prev => prev.filter(n => n != note.midiNote))
        
    }

    function onPianoPlay(note: any) {
        const noteStr: string = MidiNumbers.getAttributes(note).note;
        console.log(`MIDI: ${note}, Note: ${noteStr}`);
        soundPlayer.start(note);
        setUserInput([...userInput, noteStr])
      }

    function onPianoRelease(note: any) {
        console.log('stopping note ', note);        
    }

    async function loadSoundPlayer() {
        await soundPlayer.load
        console.log('🎧 Sound player loaded...');
        setSoundPlayerLoaded(true);
        
    }



    // Sound Init    
    
    // const soundPlayer = new SplendidGrandPiano(new AudioContext());

    // Piano Init
    const noteRange = {
        first: MidiNumbers.fromNote('C3'),
        last: MidiNumbers.fromNote('B5'),
    };

    const keyboardShortcuts = KeyboardShortcuts.create({
        firstNote: noteRange.first,
        lastNote: noteRange.last,
        keyboardConfig: KeyboardShortcuts.HOME_ROW,
    });

    return (
        <div id="sight-reader" className='h-full min-h-svh bg-gradient-to-r from-emerald-500 to-emerald-600 pt-30'>
            <div className="page-content-container">

                <div id="header-area" className='flex justify-center'>
                    <div className="p-4 border-2 w-[40%] text-center font-bold text-indigo-600 border-white/70 rounded-md bg-white/50 ">
                        <h1 className='text-xl'>Sight Reader</h1>
                    </div>


                    {paused
                        ? <div onClick={() => setPaused(false)} className="w-16 ml-5 font-bold text-indigo-600 border-white/70 rounded-md bg-white/50 text-xl flex items-center justify-center cursor-pointer interactive">Start</div>
                        :
                        <div className="w-16 ml-5 font-bold text-indigo-600 border-white/70 rounded-md bg-white/50 text-xl flex items-center justify-center">{gameTimer}</div>
                    }
                </div>

                <div className='pt-6 mb-32' id="sheet-music-area">
                    <div id="sheet-container" className='bg-gray-100 mb-12 rounded-md border-2 border-white/80 relative w-[750px] mx-auto'>
                        {paused && <div id='curtain' className="absolute inset-0  backdrop-blur-lg text-2xl text-indigo-600 font-bold flex items-center justify-center">Start the game to see the notes..</div> }
                        <SheetMusic containerId='answer-sheet' notesArr={answerNotes} />
                    
                    </div>

                    <div id="sheet-container" className='bg-gray-100 border-2 border-white/80 rounded-md w-[750px] mx-auto'>
                        <SheetMusic containerId='user-sheet' notesArr={userInput} showAnswers={true} answersArr={answerNotes} />
                    </div>

                </div>

                <div id="piano-container" ref={pianoContainer} className='w-full h-48'>
                    <Piano
                        noteRange={{ first: noteRange.first, last: noteRange.last }}
                        keyboardShortcuts={keyboardShortcuts}
                        playNote={(note: any) => (onPianoPlay(note))}
                        stopNote={(note: any) => (onPianoRelease({ midiNote: note }))}
                        disabled={betweenRounds || !soundPlayerLoaded || paused}
                        activeNotes={activePianoNotes}
                        
                        
                    // width={pianoContainer.current ? pianoContainer.current.clientWidth : 1000}

                    />
                </div>
            </div>
        </div>
    )
}
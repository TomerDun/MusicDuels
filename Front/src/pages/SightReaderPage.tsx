import { useState, useEffect } from 'react';
// @ts-ignore
import { KeyboardShortcuts, Piano, MidiNumbers } from 'react-piano';
import 'react-piano/dist/styles.css'
import { Soundfont, SplendidGrandPiano } from 'smplr';
import SheetMusic from '../components/musicToolsArea/SheetMusic'
import {useMIDI, type NoteEvent} from '../utils/midiUtils'

export default function SightReaderPage() {
    
    const [playedNotes, setPlayedNotes]  = useState<string[]>(['F4']);   
    
    useEffect(() => {
        return () => {
            soundPlayer.disconnect();
        }
    }, []) 

    function onPianoPlay(note:any) {
        const noteStr:string = MidiNumbers.getAttributes(note).note;
        console.log(`MIDI: ${note}, Note: ${noteStr}`);
        soundPlayer.start(note);
        setPlayedNotes([...playedNotes, noteStr])
        
    }

    function onPianoRelease(note:any) {
        // soundPlayer.stop(note);
    }



    // Sound Init    
    const soundPlayer = new Soundfont(new AudioContext(), { instrument: 'marimba' });
    // const soundPlayer = new SplendidGrandPiano(new AudioContext());

    // Piano Init
    const noteRange = {
        first: MidiNumbers.fromNote('c3'),
        last: MidiNumbers.fromNote('f4'),
    };

    const keyboardShortcuts = KeyboardShortcuts.create({
        firstNote: noteRange.first,
        lastNote: noteRange.last,
        keyboardConfig: KeyboardShortcuts.HOME_ROW,
    });    

    return (
        <div id="sight-reader" className='h-full bg-gradient-to-r from-emerald-500 to-emerald-600'>
            <div className="page-content-container">
                <h1>Sight Reader</h1>

                <div id="sheet" className='bg-gray-100'>
                    <SheetMusic notesArr={playedNotes}/>
                </div>

                <div>
                    <Piano
                        noteRange={{ first: MidiNumbers.fromNote('c3'), last: MidiNumbers.fromNote('f5') }}
                        keyboardShortcuts={keyboardShortcuts}
                        playNote={(note:any) => (onPianoPlay(note))}
                        stopNote={(note:any) => (onPianoRelease({midiNote: note}))}                        
                        width={1000}
                    />
                </div>
            </div>
        </div>
    )
}
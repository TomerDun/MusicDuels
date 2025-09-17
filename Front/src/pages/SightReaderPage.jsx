import { useState } from 'react';
import { useEffect } from 'react';
import { KeyboardShortcuts, Piano, MidiNumbers } from 'react-piano';
import 'react-piano/dist/styles.css'
import { Soundfont } from 'smplr';
import SheetMusic from '../components/musicToolsArea/SheetMusic'

export default function SightReaderPage() {

    const [an, setAn] = useState([]);    

    function playNote(note) {
        console.log('Playnote: ', note);
    }

    useEffect(() => {
        listenAndPlayNotes();
    }, [])

    const ac = new AudioContext();
    const marimba = new Soundfont(ac, { instrument: 'marimba' });

    const keys = KeyboardShortcuts.create({
        firstNote: MidiNumbers.fromNote('c3'),
        lastNote: MidiNumbers.fromNote('f5'),
        keyboardConfig: KeyboardShortcuts.HOME_ROW,
    })

    const noteRange = {
        first: MidiNumbers.fromNote('c3'),
        last: MidiNumbers.fromNote('f4'),
    };
    const keyboardShortcuts = KeyboardShortcuts.create({
        firstNote: noteRange.first,
        lastNote: noteRange.last,
        keyboardConfig: KeyboardShortcuts.HOME_ROW,
    });


    // MIDI TEST

    async function listenAndPlayNotes(playNote) {

        function playNote(note) {
            console.log('Playnote: ', note);
            setAn([...an, note]);
        }

        try {
            const midi = await navigator.requestMIDIAccess();

            midi.inputs.forEach(input => {
                input.onmidimessage = (event) => {
                    const [status, note, velocity] = event.data;

                    // Fire only on Note On with velocity > 0
                    if ((status & 0xf0) === 0x90 && velocity > 0) {
                        playNote(note);
                    }
                };
            });

            console.log('Listening for MIDI notes...');
        } catch (err) {
            console.error('MIDI access failed:', err);
        }
    }




    return (
        <div id="sight-reader">
            <h1>Sight Reader</h1>

            <div id="sheet">
                <SheetMusic notes={['c4', 'd4', 'e4']}/>
            </div>

            <div>
                <Piano
                    noteRange={{ first: MidiNumbers.fromNote('c3'), last: MidiNumbers.fromNote('f5') }}
                    keyboardShortcuts={keyboardShortcuts}
                    playNote={note => marimba.start({ note: note })}
                    stopNote={note => console.log('note on stop: ', note)}
                    width={1000}
                    activeNotes={an}
                />
            </div>
        </div>
    )
}
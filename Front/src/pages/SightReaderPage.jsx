import { KeyboardShortcuts, Piano, MidiNumbers } from 'react-piano';
import 'react-piano/dist/styles.css'

export default function SightReaderPage() {

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

    return (
        <div id="sight-reader">
            <h1>Sight Reader</h1>

            <div>
                <Piano
                    noteRange={{ first: MidiNumbers.fromNote('c3'), last: MidiNumbers.fromNote('f5') }}
                    keyboardShortcuts={keyboardShortcuts}
                    playNote={note => console.log('note: ', note)}
                    stopNote={note => console.log('note on stop: ', note)}
                    width={1000}
                />
            </div>
        </div>
    )
}
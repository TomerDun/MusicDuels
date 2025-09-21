import { useEffect } from "react";

// Types
export type NoteEvent = {  
  midiNote: number;
  velocity?: number;
  command?: number;
  noteString?: string;
};

export function useMIDI(
  onNoteEnter: (event: NoteEvent) => void,
  onNoteRelease: (event: NoteEvent) => void
) {
  useEffect(() => {
    let isMounted = true;

    async function setupMIDI() {
      try {
        const midi = await navigator.requestMIDIAccess();

        midi.inputs.forEach((input) => {
          input.onmidimessage = (event: MIDIMessageEvent) => {
            if (!event.data) return;

            const status = event.data[0];
            const command = status & 0xf0;

            const noteEvent: NoteEvent = {              
              midiNote: event.data[1],
              velocity: event.data[2],
              command,
            };

            if (command === 0x90 && noteEvent.velocity && noteEvent.velocity > 0) {
              onNoteEnter(noteEvent);
            } else if (
              command === 0x80 ||
              (command === 0x90 && noteEvent.velocity === 0)
            ) {
              onNoteRelease(noteEvent);
            }
          };
        });

        console.log("🎹 Listening for MIDI notes...");
      } catch (err) {
        if (isMounted) {
          console.error("❌ MIDI access failed:", err);
        }
      }
    }

    setupMIDI();

    return () => {
      isMounted = false;
      // Clean up: remove handlers
      navigator.requestMIDIAccess().then((midi) => {
        midi.inputs.forEach((input) => {
          input.onmidimessage = null;
        });
      });
    };
  }, []);
}

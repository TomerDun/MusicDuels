import { useEffect, useRef } from 'react';
import { Factory as FactoryType } from 'vexflow/core';
// @ts-ignore
import { Factory } from 'vexflow'
import type { GameContentType } from '../../types/GameSessionTypes';


type props = {
  notesArr: GameContentType,
  answersArr?: GameContentType | null,
  showAnswers?: boolean
  containerId: string
}


export default function SheetMusic({ notesArr, answersArr = null, showAnswers = false, containerId='sheet-container' }: props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setup();
  }, [notesArr]);  

  function setup() {
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
    }

    // console.log('--Starting Render for sheet music--');

    const vf: FactoryType = new Factory({
      renderer: { elementId: containerRef.current!, width: 'min', height:'min' },
    });

    const score = vf.EasyScore();
    const system = vf.System({
      width: 700,
    });

    
    let notes = '';
    if (notesArr.length) {
      notes = notesArr.map(note => note + '/q').join(',')
    }

    if (notes.length === 0) {      
      system.addStave({
        voices: [],
      })
        .addClef('treble');

      
      // system.setWidth(100);
    } else {
      const voice = score.voice(score.notes(notes), {
        time: '64/4'  // Set an extremely large time signature for virtually unlimited notes
      });

      // Configure voice for maximum flexibility
      voice.setStrict(false);
      voice.setMode(2);

      // Show correct or incorrect notes

      if (showAnswers && answersArr && answersArr.length === notesArr.length) {
      // if (answersArr && showAnswers) {        
        
        voice.getTickables().forEach((note, index) => {
          if (notesArr[index] === answersArr[index]) {            
            note.setStyle({ fillStyle: 'green', strokeStyle: 'green' });
          }
          else {
            note.setStyle({ fillStyle: 'red', strokeStyle: 'red' });
          }
        });
      }

      system.addStave({
        voices: [voice],
      })
        .addClef('treble');
    }

    vf.draw();
  }

  return (
    <div ref={containerRef} id={containerId}>
    </div>
  );
}
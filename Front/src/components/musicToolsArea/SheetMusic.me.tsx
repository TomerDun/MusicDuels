import { useEffect, useRef } from 'react';
import {Factory as FactoryType} from 'vexflow/core';
import { Factory } from 'vexflow';


export default function SheetMusic() {

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setup();
  }, [])

  function setup() {
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
    }

    console.log('--Starting Render for sheet music--');
    
    const vf: FactoryType = new Factory({
      renderer: { elementId: 'output', width: 500, height: 200 },
    });

    const score = vf.EasyScore();
    const system = vf.System();

    const voice = score.voice(score.notes('g3/q, g4/8, e3/8, f3/8, f4/8'))
    voice.setMode(2);    

    if (voice.getMode() === 2) {
      console.log('VOICE MODE IS 2');
      
      system.addStave({
        voices: [
          voice
        ],
      })
        .addClef('treble')
        .addTimeSignature('4/4');
    }



    if (system.getVoices()[0].getMode() === 2) {
      vf.draw();
    }
  }

  return (
    <div ref={containerRef} id="output">
    </div>
  )
}



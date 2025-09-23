import React, { useEffect, useRef } from "react";
import { Factory as FactoryType, VoiceMode } from "vexflow/core";
// @ts-ignore
import VexFlow from "vexflow";
// @ts-ignore
import {Factory, Voice}  from 'vexflow';





interface SheetMusicProps {
  notes: string[];       // e.g. ["C4", "E4", "G4"]
  width?: number;
  height?: number;
}

const SheetMusic: React.FC<SheetMusicProps> = ({
  notes,
  width = 500,
  height = 150,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    containerRef.current.innerHTML = "";

    // Use element (not elementId) when giving a real DOM node
    const vf: FactoryType = new Factory({
      renderer: { elementId: 'sheet-music', width, height, background: "white" },
    });

    const score = vf.EasyScore();
    const system = vf.System();

    // Build the EasyScore string, e.g. "C4/q, E4/q"
    const easyString = notes.map(n => `${n}/q`).join(", ");

    // Create a voice and force SOFT mode so it won't require a full 4/4 bar
    let voice = score.voice(score.notes(easyString, { stem: 'down'})).setMode(2);
    voice = voice.setMode(VoiceMode.SOFT);   // <- key line for VexFlow v5    
    // voice.setStrict(false);        

    system.addStave({
      voices: [voice],            
    })
      .addClef("treble")
      .addTimeSignature("4/4");
    
    vf.draw();
  }, [notes, width, height]);

  return < div id="sheet-music" ref={containerRef}></div>;
};

export default SheetMusic;

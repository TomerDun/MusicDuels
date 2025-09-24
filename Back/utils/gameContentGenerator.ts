import { GameTypes } from "../types/gameContentTypes";

export const GAME_ROUDNS = 3;

type gameContentOptions = {
    rounds?: number,
    lowestNote?: string,
    highestNote?: string,
    notesPerRound?: number,
}

// Sight reading
const ALL_NOTES = [
    'C3', 'C#3', 'D3', 'D#3', 'E3', 'F3', 'F#3', 'G3', 'G#3', 'A3', 'A#3', 'B3',
    'C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4',
    'C5', 'C#5', 'D5', 'D#5', 'E5', 'F5', 'F#5', 'G5', 'G#5', 'A5', 'A#5', 'B5',
    'C6', 'C#6', 'D6', 'D#6', 'E6', 'F6', 'F#6', 'G6', 'G#6', 'A6', 'A#6', 'B6',
    'C7', 'C#7', 'D7', 'D#7', 'E7', 'F7', 'F#7', 'G7', 'G#7', 'A7', 'A#7', 'B7',
];

export function generateNoteSeries(lowestNote: string, highestNote: string, length: number): string[] {
    // Find the indices of the lowest and highest notes
    const startIndex = ALL_NOTES.indexOf(lowestNote);
    const endIndex = ALL_NOTES.indexOf(highestNote);
    
    if (startIndex === -1 || endIndex === -1) {
        throw new Error('Invalid note range specified');
    }
    
    // Get the valid notes range
    const validNotes = ALL_NOTES.slice(startIndex, endIndex + 1);
    
    // Generate the series
    const series: string[] = [];
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * validNotes.length);
        series.push(validNotes[randomIndex]);
    }
    
    return series;
}

export function generateGameContent(gameType:GameTypes, options?:gameContentOptions) {
    let content: string[][] = [];
    let rounds = GAME_ROUDNS;
    let notesPerRound = 8;
    let lowestNote = 'G3';
    let highestNote = 'B5'


    if (gameType === GameTypes.SIGHT_READ) {
        for (let i = 0; i < rounds; i ++) {
            content.push(generateNoteSeries(lowestNote, highestNote, notesPerRound));
        }
    }

    return content;
}
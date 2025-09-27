import OpenAI from "openai";
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
    'C3', 'Db3', 'D3', 'Eb3', 'E3', 'F3', 'Gb3', 'G3', 'Ab3', 'A3', 'Bb3', 'B3',
    'C4', 'Db4', 'D4', 'Eb4', 'E4', 'F4', 'Gb4', 'G4', 'Ab4', 'A4', 'Bb4', 'B4',
    'C5', 'Db5', 'D5', 'Eb5', 'E5', 'F5', 'Gb5', 'G5', 'Ab5', 'A5', 'Bb5', 'B5',
    'C6', 'Db6', 'D6', 'Eb6', 'E6', 'F6', 'Gb6', 'G6', 'Ab6', 'A6', 'Bb6', 'B6',
    'C7', 'Db7', 'D7', 'Eb7', 'E7', 'F7', 'Gb7', 'G7', 'Ab7', 'A7', 'Bb7', 'B7',
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

export function generateGameContent(gameType: GameTypes, options?: gameContentOptions) {
    let content: string[][] = [];
    let rounds = GAME_ROUDNS;
    let notesPerRound = 8;
    let lowestNote = 'G3';
    let highestNote = 'B5'


    if (gameType === GameTypes.SIGHT_READ) {
        for (let i = 0; i < rounds; i++) {
            content.push(generateNoteSeries(lowestNote, highestNote, notesPerRound));
        }
    }

    return content;
}

//  -- AI --

export async function generateAIGameContent(gameType: GameTypes, roundsLength: number, seriesLength: number, composer: string) {
    const promptInstructions = {
        'sight-read': 'Format your reponse as a 2D array of string. output just this array and NOTHING else.'
    }

    const promptContent = {
        'sight-read': `there are ${roundsLength} rounds. for each round, generate an array containing ${seriesLength} music notes. the notes are represented as 'G3', 'Ab4' and so on. only use flats and not sharps. try to make a complete and interesting musical phrase. take very heavy inspiration from ${composer}`
    }

    const fullPropt = promptInstructions[gameType] + promptContent[gameType];

    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const aiRes = await openai.responses.create({
        reasoning: {effort: "high"},        
        model: 'gpt-5-nano',
        instructions: promptInstructions[gameType],
        input: promptContent[gameType],                        
    })

    console.log('complete AI text: ', aiRes);
    return aiRes.output_text;
}


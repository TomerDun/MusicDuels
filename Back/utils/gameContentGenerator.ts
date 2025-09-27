import OpenAI from "openai";
import { GameTypes } from "../types/gameContentTypes";

// --Contant configurations for game content--
export const GAME_ROUDNS = 2;
const NOTES_PER_ROUND = 14;
let LOWEST_NOTE = 'A3';
let HIGHEST_NOTE = 'B5'

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

function generateRandomGameContent() {
    let content = [];
    console.log('🦕 Generating boring random content...');

    for (let i = 0; i < GAME_ROUDNS; i++) {
        content.push(generateNoteSeries(LOWEST_NOTE, HIGHEST_NOTE, NOTES_PER_ROUND));
    }
    return content;
}

export async function generateGameContent(gameType: GameTypes, inspiration: string | null) {
    let content: string[][] = [];


    if (gameType === GameTypes.SIGHT_READ) {

        if (inspiration === 'random' || !inspiration) {
            content = generateRandomGameContent();
        }
        else {
            try {
                const aiContent = await generateAIGameContent(gameType, GAME_ROUDNS, NOTES_PER_ROUND, inspiration) // should return a string containing 2d array of strings
                content = JSON.parse(aiContent);
                console.log('AI content parse success - ', content);
            }
            catch {
                console.log('❌ error generating valid AI content, moving to random');
                content = generateRandomGameContent()                
            }
        }

    }

    return content;
}

//  -- AI --

export async function generateAIGameContent(gameType: GameTypes, roundsLength: number, seriesLength: number, inspiration: string) {

    console.log('🧠 Generating AI game content based on ', inspiration);

    const promptInstructions = {
        'sight-read': 'Format your reponse as a 2D array of string (use double quotes for strings). output just this array and NOTHING else. make sure your response is a valid JSON array'
    }

    const promptContent = {
        'sight-read': `there are ${roundsLength} rounds. for each round, generate an array containing ${seriesLength} music notes. the notes are represented as 'G3', 'Ab4' and so on. only use flats and not sharps. only use notes between ${LOWEST_NOTE} and ${HIGHEST_NOTE}.
         make a melodic musical phrase. try to replicate a line from a composition by ${inspiration} and even copy it directly`
    }

    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const aiRes = await openai.responses.create({
        reasoning: { effort: "medium" },
        model: 'gpt-5',
        instructions: promptInstructions[gameType],
        input: promptContent[gameType],
        store: true,
    })

    console.log('complete OpenAI response: ', aiRes);

    return aiRes.output_text;
}


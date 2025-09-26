import express, { Request, Response } from "express";

import OpenAI from "openai";
import StatusCode from "../utils/status-code";
import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const router = express.Router();

router.get('/', (async (req: Request, res: Response) => {
    const gameType = 'sight-read';
    const composer = 'bach';
    const roundsLengh = 1;
    const seriesLength = 8;

    let instructions = {
        'sight-read': 'Your reponse should be formatted as an arary of strings representing musical notes as G3, Bb4 and so on. only use flats and not sharps. the reponse should ONLY include this array and nothign else'
    }
    
    let prompt = `${instructions[gameType]}. give me a series of ${seriesLength} notes. try to make it sound like a complete musical phrase. take very heavy inspiration from ${composer}`;

    console.log('Your prompt: ', prompt);
    


    const result = await openai.responses.create({
        model: "gpt-5-nano",
        input: "write a haiku about ai",
        store: true,
        // max_output_tokens:1000,        
    });
    console.log(result);
    res.status(StatusCode.OK).send(result.output_text);
}))



export default router;
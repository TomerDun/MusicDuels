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
    const result = await openai.responses.create({
        model: "gpt-5-nano",
        input: "write a haiku about ai",
        store: true,
        max_output_tokens:1000,
    });
    console.log(result);
    res.status(StatusCode.OK).send(result.output_text)
}))

export default router;
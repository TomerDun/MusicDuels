import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { callApi } from "../utils/serverUtils";
import { Loader } from "@mantine/core";
import SightReaderPage from "./SightReaderPage";
import type { GameSessionType } from "../types/GameSessionTypes";

export default function GameSessionPage() {

    const [gameSession, setGameSession] = useState<GameSessionType | null>(null);
    const [currentRound, setCurrentRound] = useState<number>(0);
    const [gameRounds, setGameRounds] = useState<number | null>(null);
    const [paused, setPaused] = useState(true);
    const [gameTimer, setGameTimer] = useState(0);
    const [timerInterval, setTimerInverval] = useState(0);
    const [userInput, setUserInput] = useState<string[]>([]); // the user input FOR THE CURRENT ROUND
    const [correctInputs, setCorrectInputs] = useState(0); // the amount of inputs from the user that are correct (updated after every round)
    

    const urlParams = useParams();

    useEffect(() => {
        console.log(urlParams.gameSessionId);
        
        loadGameSession();
    }, [])

    // Start/ Stop Timer
    useEffect(() => {        
        if (paused === false) {
            const intervalId = setInterval(() => setGameTimer(prev => prev + 1), 1000);
            setTimerInverval(intervalId);
        }
        else {
            clearInterval(timerInterval);
        }
    }, [paused])


    async function loadGameSession() {
        const gameSessionRes: GameSessionType = await callApi('/games/session/' + urlParams.gameSessionId);
        setGameSession(gameSessionRes);
        setGameRounds(gameSessionRes.content.length);
    }

    function renderGamePage() {
        if (gameSession) {
            switch (gameSession.gameType) {
                case 'sight-read': return <SightReaderPage answerNotes={gameSession.content[currentRound]} gameTimer={gameTimer} setUserInput={setUserInput}/>
            }
        }
    }

    if (gameSession === null) {
        return (
            <div className="page-outside-container from-blue-300 to-blue-400">
                <div className="page-content-container flex justify-center">
                    <Loader color="indigo" size='xl' type="dots" />

                </div>
            </div>
        )
    }

    return (
        renderGamePage()
    )
}
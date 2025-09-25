import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { callApi } from "../utils/serverUtils";
import { Loader } from "@mantine/core";
import SightReaderPage from "./SightReaderPage";
import type { GameSessionType } from "../types/GameSessionTypes";
import Modal from "../components/MiscArea/Modal";

export default function GameSessionPage() {

    const [gameSession, setGameSession] = useState<GameSessionType | null>(null);
    const [currentRound, setCurrentRound] = useState<number>(0);
    const [gameRounds, setGameRounds] = useState<number | null>(null);
    const [paused, setPaused] = useState(true);
    const [gameTimer, setGameTimer] = useState(0);
    const [timerInterval, setTimerInverval] = useState(0);
    const [userInput, setUserInput] = useState<string[]>([]); // the user input FOR THE CURRENT ROUND
    const [correctInputCount, setCorrectInputCount] = useState(0); // the amount of inputs from the user that are correct (updated after every round)
    const [betweenRounds, setBetweenRounds] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [finalScore, setFinalScore] = useState(0);

    const navigate = useNavigate();


    const urlParams = useParams();

    useEffect(() => {
        console.log(urlParams.gameSessionId);

        loadGameSession();
    }, [])

    // Start | Stop Timer
    useEffect(() => {
        if (paused === false) {
            console.log('Staring game');

            const intervalId = setInterval(() => setGameTimer(prev => prev + 1), 1000);
            setTimerInverval(intervalId);
        }
        else {
            clearInterval(timerInterval);
        }
    }, [paused])

    useEffect(() => {
        if (gameSession) {
            // Check if the new input is correct and update the count
            if (userInput.length > 0 && userInput[userInput.length - 1] === gameSession.content[currentRound][userInput.length - 1]) {
                setCorrectInputCount(prev => prev + 1);
            }

            // Check if there is a need to switch to a new round
            if (userInput.length === gameSession.content[currentRound].length) {
                advanceRound();
            }

        }
    }, [userInput])

    useEffect(() => {
        if (gameRounds !== null) {
            if (currentRound >= gameRounds) finishGame()
        }
    }, [currentRound])

    function advanceRound() {
        setBetweenRounds(true);

        setTimeout(() => {
            setBetweenRounds(false);
            if (gameRounds && currentRound >= gameRounds - 1) {
                finishGame()
            }
            else {
                setCurrentRound(prev => prev + 1);
                setUserInput([]);
            }
        }, 2500)
    }

    async function finishGame() {
        if (gameSession) {
            clearInterval(timerInterval);
    
            console.log('GAME IS FINISHED!');
            calculateScore();
            await callApi(`/games/session/${gameSession.id}/finish`, 'PATCH', {score: finalScore});
            
            setModalOpen(true);
        }


    }

    function calculateScore() {
        if (gameSession) {
            let score = 700;
            score -= gameTimer;


            let answerCount = gameSession.content.length * gameSession.content[0].length;
            let multiplier = correctInputCount / answerCount;

            score *= multiplier;
            score = Math.floor(score);

            setFinalScore(score);
        }
    }





    async function loadGameSession() {
        const gameSessionRes: GameSessionType = await callApi('/games/session/' + urlParams.gameSessionId);
        setGameSession(gameSessionRes);
        setGameRounds(gameSessionRes.content.length);
    }

    function renderGamePage() {
        if (gameSession) {
            switch (gameSession.gameType) {
                case 'sight-read': return <SightReaderPage betweenRounds={betweenRounds} answerNotes={gameSession.content[currentRound]} gameTimer={gameTimer} userInput={userInput} setUserInput={setUserInput} paused={paused} setPaused={setPaused} />
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
        <>
            {renderGamePage()}
            <Modal isOpen={modalOpen} setIsOpen={() => ({})}>
                <div id="game-finish-container" className="border-2 py-8 px-20 min-w-[25vw] max-w-[90vw] border-white/70 bg-black/70 text-white text-xl font-bold flex flex-col gap-2 items-center rounded-md">

                    <div id="header-area">
                        <h2 className="text-2xl font-bold text-teal-500 mb-6">Game Over!</h2>
                    </div>

                    <div id="final-time" className="hover:scale-150 transition-all">
                        <span>Time: </span>
                        <span className="text-teal-500">{gameTimer}s</span>
                    </div>

                    <div id="final-accuracy" className="hover:scale-150 transition-all">
                        <span>Accuracy: </span>
                        <span className="text-amber-400">{(gameSession.content.length / gameSession.content[0].length) * 100}%</span>
                    </div>

                    <div id="final-score" className="hover:scale-150 transition-all">
                        <span>Final Score: </span>
                        <span className="text-indigo-400">{finalScore}</span>
                    </div>

                    <div id="buttons-row" className="mt-7">
                        <button onClick={() => navigate('/')} className="action-button from-teal-500 to-teal-800 border border-white/70 interactive">Continue</button>
                    </div>

                </div>
            </Modal>

        </>
    )
}
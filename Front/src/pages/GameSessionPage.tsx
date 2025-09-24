import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { callApi } from "../utils/serverUtils";
import { Loader } from "@mantine/core";
import SightReaderPage from "./SightReaderPage";

export default function GameSessionPage() {

    const [gameSession, setGameSession] = useState<any>(null);

    const urlParams = useParams();

    useEffect(() => {
        console.log(urlParams.gameSessionId);
        
        loadGameSession();
    }, [])


    async function loadGameSession() {
        const gameSessionRes = await callApi('/games/session/' + urlParams.gameSessionId);
        setGameSession(gameSessionRes);
    }

    function renderGamePage() {
        switch (gameSession.gameType) {
            case 'sight-read': return <SightReaderPage answerNotes={['a','b','c']} instructions="Play this note!"/>
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
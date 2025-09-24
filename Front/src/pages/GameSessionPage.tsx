import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { callApi } from "../utils/serverUtils";
import { Loader } from "@mantine/core";

export default function GameSessionPage() {

    const [gameSession, setGameSession] = useState(null);

    const urlParams = useParams();

    useEffect(() => {
        loadGameSession();
    }, [])


    async function loadGameSession() {
        const gameSessionRes = await callApi('/games/' + urlParams.gameSessionId);
        setGameSession(gameSessionRes);
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
        </>
    )
}
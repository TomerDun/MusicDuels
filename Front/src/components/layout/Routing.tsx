import { Route, Routes } from "react-router";
import DashboardPage from "../../pages/DashboardPage";
import GameSessionPage from "../../pages/GameSessionPage";
import LeaderboardPage from "../../pages/LeaderboardPage";
import Login from "../../pages/Login/Login";
import { PageNotFound } from "../../pages/PageNotFound/PageNotFound";
import Register from "../../pages/Register/Register";
import SightReaderPage from "../../pages/SightReaderPage";
import ProtectedRoute from "../authArea/ProtectedRoute";


export function Routing() {
    return (
        <Routes>
            <Route path="/" element={
                <ProtectedRoute>
                    <DashboardPage />
                </ProtectedRoute>
            }
            />

            {/* @ts-expect-error - Missing props will be added later */}
            <Route path="/games/sight-reader" element={<SightReaderPage />} />
            <Route path="/games/:gameSessionId" element={<GameSessionPage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<PageNotFound />} />
            {/* 404 */}
        </Routes >
    );
}
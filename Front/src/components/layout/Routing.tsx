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
            <Route path="/dashboard" element={
                <ProtectedRoute>
                    <DashboardPage />
                </ProtectedRoute>
            } />

            <Route path="/games/sight-reader" element={
                <ProtectedRoute>
                    {/* @ts-expect-error - Missing props will be added later */}
                    <SightReaderPage />
                </ProtectedRoute>} />
            <Route path="/games/:gameSessionId" element={
                <ProtectedRoute>
                    <GameSessionPage />
                </ProtectedRoute>} />
            <Route path="/" element={<LeaderboardPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<PageNotFound />} />
            {/* 404 */}                
        </Routes >
    );
}
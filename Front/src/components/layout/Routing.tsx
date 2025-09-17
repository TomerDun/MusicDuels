import { Route, Routes } from "react-router";
import DashboardPage from "../../pages/DashboardPage";
import LeaderboardPage from "../../pages/LeaderboardPage";

export function Routing() {
    return (
            <Routes> 
                <Route path="/" element={<DashboardPage />}/>               
                <Route path="/leaderboard" element={<LeaderboardPage />}/>               
            </Routes >
    );
}
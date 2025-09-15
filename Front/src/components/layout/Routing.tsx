import { Route, Routes } from "react-router";
import { Box } from "@mantine/core";
import { Register } from "../auth/Register/Register";
import { PageNotFound } from "../../pages/PageNotFound/PageNotFound";
import DashboardPage from "../../pages/DashboardPage/DashboardPage";
import FeedPage from "../../pages/FeedPage/FeedPage";
import ProtectedRoute from "../auth/ProtectedRoute";
import Login from "../auth/Login/Login";
import StatsPage from "../../pages/StatsPage/StatsPage";
import ProfilePage from "../../pages/ProfilePage/ProfilePage";

export function Routing() {
    return (
        <Box flex={1}>
            <Routes>
                {/* feed - will change to the home page address*/}
                <Route path="/profile" element={
                    <ProtectedRoute>
                        <ProfilePage />
                    </ProtectedRoute>}>
                </Route>

                <Route path="/feed" element={<FeedPage />} />
                <Route path="/" element={
                    <ProtectedRoute>
                        <DashboardPage />
                    </ProtectedRoute>}>
                </Route>

                <Route path="/stats" element={
                    <ProtectedRoute>
                        <StatsPage />
                    </ProtectedRoute>}>
                </Route>


                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                {/* 404 */}
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </Box>
    );
}
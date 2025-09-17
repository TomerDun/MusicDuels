import { Route, Routes } from "react-router";
import DashboardPage from "../../pages/DashboardPage/DashboardPage";

export function Routing() {
    return (
            <Routes> 
                <Route path="/" element={<DashboardPage />}/>               
            </Routes >
    );
}
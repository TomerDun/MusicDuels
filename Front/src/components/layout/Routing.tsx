import { Route, Routes } from "react-router";
import DashboardPage from "../../pages/DashboardPage/DashboardPage";
import SightReaderPage from '../../pages/SightReaderPage'


export function Routing() {
    return (
            <Routes> 
                <Route path="/" element={<DashboardPage />}/>               
                <Route path="/games/sight-reader" element={<SightReaderPage />}/>               
            </Routes >
    );
}
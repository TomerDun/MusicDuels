import { Route, Routes } from "react-router";
import DashboardPage from "../../pages/DashboardPage/DashboardPage";
import SightReaderPage from '../../pages/SightReaderPage.js'
import DrumMachine from "../musicToolsArea/DrumMachine.js";


export function Routing() {
    return (
            <Routes> 
                <Route path="/" element={<DashboardPage />}/>               
                <Route path="/games/sight-reader" element={<SightReaderPage />}/>               
                <Route path="/games/beat-copy" element={<DrumMachine />}/>               
            </Routes >
    );
}
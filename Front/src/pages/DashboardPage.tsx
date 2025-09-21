import { onLogin, onRegister } from "../utils/authUtils";

export default function DashboardPage({ }) {
    return (
        <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 h-full text-white pt-24" id="dashboard-page">
            <div className="w-[90%] m-auto" id="inner-container">
                <div className="flex flex-col items-center" id="header-area">
                    <h1 className="text-3xl font-bold">Welcome Back, Nadav</h1>
                    <p className="text-white/70">Time to continue your music journey...</p>
                </div>
                <div id="play-buttons-container" className="flex justify-center gap-4 mt-6">
                    <button className="action-button interactive from-amber-500 to-amber-600">Practice</button>
                    <button className="action-button interactive from-indigo-500 to-indigo-600">Challenge Player</button>
                </div>


                <div className="flex justify-between mt-6 gap-4" id="stats-row">

                    <div className="glass-container">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-white/60 text-sm" contentEditable="false">Streak</p>
                                <h3 className="text-3xl font-bold text-accent" contentEditable="false">12</h3>
                            </div>
                        </div>
                    </div>

                    <div className="glass-container">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-white/60 text-sm" contentEditable="false">Streak</p>
                                <h3 className="text-3xl font-bold text-accent" contentEditable="false">12</h3>
                            </div>
                        </div>
                    </div>

                    <div className="glass-container">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-white/60 text-sm" contentEditable="false">Streak</p>
                                <h3 className="text-3xl font-bold text-accent" contentEditable="false">12</h3>
                            </div>
                        </div>
                    </div>

                    <div className="glass-container">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-white/60 text-sm" contentEditable="false">Streak</p>
                                <h3 className="text-3xl font-bold text-accent" contentEditable="false">12</h3>
                            </div>
                        </div>
                    </div>

                    <div className="glass-container">
                        <button onClick={() => onLogin('tomer@email.com', '1234')} className="bg-red-500">LOGIN</button>
                        <button onClick={() => onRegister({email: 'react@gmail.com', password: '1234', 'username': 'react-newuser'})} className="bg-green-500">REGISTER</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
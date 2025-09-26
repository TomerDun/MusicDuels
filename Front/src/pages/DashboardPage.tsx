import { useEffect, useState } from "react"
import Modal from "../components/MiscArea/Modal";
import GameSelector from "../components/GamesArea/GameSelector";
import Leaderboard from "../components/leaderboardArea/Leaderboard";
import type { LeaderboardItemType } from "../types/LeaderboardTypes";
import { getGlobalLeaderboard } from "../services/leaderboardService";
import { observer } from "mobx-react-lite";
import { userStore } from "../stores/UserStore";
import { callApi } from "../utils/serverUtils";
import { useNavigate } from "react-router";
import { Loader } from "@mantine/core";
import type { Notification } from "../types/NotificationTypes";
import { acceptInviteNotification, declineInviteNotification, dismissDeclinedNotification, getActiveUserNotifications } from "../services/NotificationService";
import NotificationBox from "../components/NotificationsArea/NotificationBox";
import { getActiveUserCompletedGameHistory } from "../services/gameSessionService";
import GameHistoryItem from "../components/gameHistoryItem";
import type { GameHistoryItemType } from "../types/GameSessionTypes";

function DashboardPage({}) {

    const [modalOpen, setModalOpen] = useState(false);
    const [challengeGame, setChallengeGame] = useState<null | string>(null) // which game type the player has chosen as a challenge
    const [challengePlayer, setChallengePlayer] = useState<null | string>(null) // playerId of the opponent
    const [leaderboardItems, setLeaderboardItems] = useState<LeaderboardItemType[]>([]);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [gameHistory, setGameHistory] = useState<GameHistoryItemType[]>([]);
    const activeUser = userStore.activeUser;
    const navigate = useNavigate();

    useEffect(() => {
        loadLeaderboard();
        loadNotifications();
        loadGameHistory();
    }, [])

    // After selecing an opponent, create a new game
    useEffect(() => {
        if (challengePlayer && activeUser) {
            startGame();
        }

    }, [challengePlayer])

    // -- Handler Functions --

    async function loadLeaderboard() {
        const res = await getGlobalLeaderboard();
        setLeaderboardItems(res);
    }

    async function loadNotifications() {
        const res = await getActiveUserNotifications();
        setNotifications(res);
    }

    async function loadGameHistory(){
        const res = await getActiveUserCompletedGameHistory();
        setGameHistory(res);
    }

    async function dismissNotification(notification: Notification) {
        await dismissDeclinedNotification(notification);
        await loadNotifications();
    }

    async function acceptInvite(notification: Notification) {
        await acceptInviteNotification(notification)
        navigate('/games/' + notification.gameSessionId);
    }

    async function declineInvite(notification: Notification) {
        await declineInviteNotification(notification);
        await loadNotifications();
    }

    async function startGame() {
        const body = {
            player2Id: challengePlayer,
            player1Score: 0 // TODO: Change this to null after changing the backend flow to allow null values for player1Score
        }
        const newGame = await callApi(`/games/${challengeGame}`, 'POST', body)
        const newGAmeId = newGame.id;
        console.log(body);
        navigate(`/games/${newGAmeId}`);
    }

    return (
        <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 min-h-screen text-white pt-24" id="dashboard-page">
            <Modal isOpen={modalOpen} setIsOpen={setModalOpen}>
                {challengeGame ? <Leaderboard onClickItem={setChallengePlayer} items={leaderboardItems} /> :
                    <GameSelector onPickGame={setChallengeGame} />
                }
            </Modal>
            <div className="w-[90%] m-auto" id="inner-container">
                <div className="flex flex-col items-center" id="header-area">
                    {activeUser ?
                        <>
                            <div>
                                <span className="text-3xl font-bold">Welcome Back, </span>
                                <span id="username" className="text-3xl font-bold text-teal-500">{activeUser.username}</span>
                            </div>
                            <p className="text-white/70">Time to continue your music journey...</p>
                        </>
                        :
                        <Loader color="indigo" size='xl' type="dots" />
                    }
                </div>
                <div id="play-buttons-container" className="flex justify-center gap-4 mt-6">
                    {activeUser ?
                        <>
                            <button className="action-button interactive from-amber-500 to-amber-600">Practice</button>
                            <button className="action-button interactive from-indigo-500 to-indigo-600" onClick={() => setModalOpen(true)}>Challenge Player</button>
                        </>
                        :
                        <Loader color="indigo" size='lg' type="dots" />
                    }
                </div>


                <div className="flex justify-between mt-6 gap-4" id="stats-row">

                    <div className="glass-container">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-white/60 text-sm">Streak</p>
                                <h3 className="text-3xl font-bold text-accent">12</h3>
                            </div>
                        </div>
                    </div>

                    <div className="glass-container">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-white/60 text-sm">Streak</p>
                                <h3 className="text-3xl font-bold text-accent">12</h3>
                            </div>
                        </div>
                    </div>

                    <div className="glass-container">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-white/60 text-sm" >Streak</p>
                                <h3 className="text-3xl font-bold text-accent" >12</h3>
                            </div>
                        </div>
                    </div>

                    <div className="glass-container">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-white/60 text-sm">Streak</p>
                                <h3 className="text-3xl font-bold text-accent">12</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="glass-container flex flex-wrap gap-2 mt-4" id="notifications-container">
                    {
                        notifications.map((n: Notification, i) =>
                            (n.status === 'declined' && n.recieverId === activeUser?.id) ? null
                                :
                                <NotificationBox
                                    key={i}
                                    notification={n}
                                    handleDismiss={() => dismissNotification(n)}
                                    handleGameAccept={() => acceptInvite(n)}
                                    handleGameDecline={() => declineInvite(n)}
                                />
                        )
                    }
                </div>
                <div className="glass-container">
                    {gameHistory.map((h:GameHistoryItemType,i) => <GameHistoryItem key={i} item={h} activeUserId={activeUser?.id}/>)}
                </div>
            </div>
        </div>
    )
}

export default observer(DashboardPage);
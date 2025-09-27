import { Loader } from "@mantine/core";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import GameHistoryItem from "../components/GameHistoryItem";
import GameSelector from "../components/GamesArea/GameSelector";
import Leaderboard from "../components/leaderboardArea/Leaderboard";
import Modal from "../components/MiscArea/Modal";
import NotificationBox from "../components/NotificationsArea/NotificationBox";
import { getActiveUserCompletedGameHistory } from "../services/gameSessionService";
import { getGlobalLeaderboard } from "../services/leaderboardService";
import { acceptInviteNotification, declineInviteNotification, dismissDeclinedNotification, getActiveUserNotifications } from "../services/NotificationService";
import { userStore } from "../stores/UserStore";
import { GameTypes, type GameHistoryItemType } from "../types/GameSessionTypes";
import type { LeaderboardItemType } from "../types/LeaderboardTypes";
import type { Notification } from "../types/NotificationTypes";
import { callApi } from "../utils/serverUtils";
import AnimatedList from "../components/MiscArea/AnimatedList";
import { IconChartArcs, IconFlame, IconSwords, IconTrophyFilled } from "@tabler/icons-react";
import InspirationSelector from "../components/GamesArea/InspirationSelector";

function DashboardPage({ }) {

    const [modalOpen, setModalOpen] = useState(false);
    const [challengeGame, setChallengeGame] = useState<null | string>(null) // which game type the player has chosen as a challenge
    const [challengePlayer, setChallengePlayer] = useState<null | string>(null) // playerId of the opponent
    const [challengeInspiration, setChallengeInspiration] = useState<null | string>(null);
    const [leaderboardItems, setLeaderboardItems] = useState<LeaderboardItemType[]>([]);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [gameHistory, setGameHistory] = useState<GameHistoryItemType[]>([]);
    const activeUser = userStore.activeUser;
    const activeUserStats = userStore.activeUserStats;
    const navigate = useNavigate();

    useEffect(() => {
        loadLeaderboard();
        loadNotifications();
        loadGameHistory();
        userStore.loadActiveUser();
        userStore.loadActiveUserStats();
    }, [])

    useEffect(() => {
        if (!modalOpen) {
            setChallengeGame(null);
            setChallengePlayer(null);
            setChallengeInspiration(null);
        }
    }, [modalOpen])

    // After selecing an opponent, create a new game
    useEffect(() => {
        if (challengeInspiration && activeUser) {
            startGame();
        }

    }, [challengeInspiration])

    useEffect(() => {
        if (challengePlayer && challengeGame !== GameTypes.SIGHT_READ) {
            setModalOpen(false);
            setChallengeInspiration('random');
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

    async function loadGameHistory() {
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
            player1Score: 0, // TODO: Change this to null after changing the backend flow to allow null values for player1Score
            inspiration: challengeInspiration
        }
        const newGame = await callApi(`/games/${challengeGame}`, 'POST', body)
        const newGAmeId = newGame.id;
        console.log(body);
        navigate(`/games/${newGAmeId}`);
    }

    return (
        <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 min-h-screen text-white pt-30" id="dashboard-page">
            <Modal isOpen={modalOpen} setIsOpen={setModalOpen}>
                {
                    challengeInspiration ?
                        <div className="flex flex-col items-center gap-12">
                            <div className="font-bold">
                                <span className="text-xl font-bold text-white">Generating an exercise based on </span>
                                <span className="text-xl font-bold text-teal-500">{challengeInspiration}</span>
                                <span className="text-xl font-bold text-white"> Using AI magic...</span>

                            </div>
                            <Loader size={"xl"} color="indigo" type="oval" />
                        </div>
                        :
                        challengeGame
                            ? challengePlayer ? (challengeGame === GameTypes.SIGHT_READ && <InspirationSelector onPick={setChallengeInspiration} />) : <Leaderboard onClickItem={setChallengePlayer} items={leaderboardItems} />
                            : <GameSelector onPickGame={setChallengeGame} />
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
                                <p className="text-white/60 text-sm">Global Rank</p>
                                <h3 className="text-[#FF6B35] text-3xl font-bold text-accent">#{activeUserStats?.rank}</h3>
                            </div>
                            <div id="icon-container" className="p-2 bg-[#FF6B35]/30 rounded-md">
                                <IconTrophyFilled color="#FF6B35" />
                            </div>
                        </div>
                    </div>

                    <div className="glass-container">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-white/60 text-sm">Win Rate</p>
                                <h3 className="text-[#31D14C] text-3xl font-bold text-accent">{activeUserStats?.winRate}%</h3>
                            </div>
                            <div id="icon-container" className="p-2 bg-[#31D14C]/30 rounded-md">
                                <IconChartArcs color="#31D14C" />
                            </div>
                        </div>
                    </div>

                    <div className="glass-container">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-white/60 text-sm" >Duels</p>
                                <h3 className="text-[#7B68EE] text-3xl font-bold text-accent" >{activeUserStats?.completedDuels}</h3>
                            </div>
                            <div id="icon-container" className="p-2 bg-[#2D3988] rounded-md">
                                <IconSwords color="#7B68EE" />
                            </div>
                        </div>
                    </div>

                    <div className="glass-container">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-white/60 text-sm">Streak</p>
                                <h3 className="text-[#FFD700] text-3xl font-bold text-accent">{activeUserStats?.streak}</h3>
                            </div>
                            <div id="icon-container" className="p-2 bg-[#FFD700]/30 rounded-md">
                                <IconFlame color="#FFD700" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="glass-container mt-4" id="notifications-container">
                    <h1 className="text-2xl p-4">
                        Game Invites
                    </h1>
                    <div className="flex flex-wrap gap-2">
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
                </div>
                <div className="glass-container mt-8">
                    <h1 className="text-2xl p-4">
                        Game History
                    </h1>
                    {<AnimatedList displayScrollbar={true} showGradients={false} items={gameHistory.map((h: GameHistoryItemType, i) => <GameHistoryItem key={i} item={h} activeUserId={activeUser?.id} />)} />}
                </div>
            </div>
        </div>
    )
}

export default observer(DashboardPage);
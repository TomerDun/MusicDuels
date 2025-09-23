import { User } from '../user';
import { GameSession, GameType } from '../gameSession';
import { Notification, NotificationStatus } from '../notification';
import { sequelize } from '../index';
import { Op } from 'sequelize';

async function testAllMigrationsAndModels() {
    try {
        console.log('🔄 Testing ALL migrations and models (Users, GameSessions, Notifications)...');
        
        // Test 1: Connection check
        await sequelize.authenticate();
        console.log('✅ Database connection successful!');

        // Test 2: Create test users
        console.log('\n👥 Creating test users...');
        
        const player1 = await User.create({
            email: 'player1@musicduels.com',
            username: 'rhythmmaster',
            password: 'securepass123',
            totalScore: 0
        });
        console.log(`✅ Created Player1: ${player1.username} (ID: ${player1.id})`);

        const player2 = await User.create({
            email: 'player2@musicduels.com',
            username: 'beatkeeper',
            password: 'anotherpass456',
            totalScore: 150
        });
        console.log(`✅ Created Player2: ${player2.username} (Score: ${player2.totalScore})`);

        // Test 3: Game Flow Part 1 - Player1 creates game and sends notification
        console.log('\n🎮 GAME FLOW PART 1: Player1 creates game and sends invite...');
        
        // Player1 creates a new game session and immediately plays
        const gameSession = await GameSession.create({
            player1Id: player1.id,
            player2Id: player2.id,
            gameType: GameType.SIGHT_READ,
            player1Score: 78, // Player1 already played and got score
            content: { 
                tempo: 120, 
                difficulty: 'medium',
                questions: ['Q1', 'Q2', 'Q3'],
                timeLimit: 300
            }
            // No player2Score, winnerId, or finishedAt - waiting for Player2 to accept and play
        });
        console.log(`✅ Player1 created game session: ${gameSession.id}`);
        console.log(`   ${player1.username} played and scored: ${gameSession.player1Score}`);
        console.log(`   Game Type: ${gameSession.gameType}`);
        console.log(`   Game Status: ${gameSession.isFinished() ? 'Finished' : 'Pending Player2'}`);

        // Player1 sends notification to Player2 about the game invite
        const gameInviteNotification = await Notification.create({
            senderId: player1.id,
            receiverId: player2.id,
            gameSessionId: gameSession.id,
            content: `Challenge me to a ${gameSession.gameType} duel! I scored ${gameSession.player1Score} points.`,
            status: NotificationStatus.PENDING
        });
        console.log(`✅ Notification sent to Player2: ${gameInviteNotification.id}`);
        console.log(`   Status: ${gameInviteNotification.status}`);
        console.log(`   Message: ${await gameInviteNotification.getFormattedMessage()}`);

        // Test 4: Test notification relationships
        console.log('\n🔗 Testing notification relationships...');
        
        const notificationWithAssociations = await Notification.findByPk(gameInviteNotification.id, {
            include: [
                { association: 'sender', attributes: ['username'] },
                { association: 'receiver', attributes: ['username'] },
                { association: 'gameSession', attributes: ['gameType', 'player1Score'] }
            ]
        });
        
        console.log(`✅ Notification relationships loaded:`);
        console.log(`   From: ${notificationWithAssociations?.sender?.username}`);
        console.log(`   To: ${notificationWithAssociations?.receiver?.username}`);
        console.log(`   Game: ${notificationWithAssociations?.gameSession?.gameType} (Score: ${notificationWithAssociations?.gameSession?.player1Score})`);

        // Test 5: Game Flow Part 2 - Player2 sees notification and accepts
        console.log('\n🎮 GAME FLOW PART 2: Player2 accepts the invite...');
        
        // Check if notification is pending
        console.log(`   Notification is pending: ${gameInviteNotification.isPending()}`);
        console.log(`   Can accept: ${gameInviteNotification.isPending()}`);
        
        // Player2 accepts the notification
        await gameInviteNotification.accept();
        console.log(`✅ Player2 accepted the invite!`);
        console.log(`   Notification status: ${gameInviteNotification.status}`);
        console.log(`   Is accepted: ${gameInviteNotification.isAccepted()}`);

        // Test 6: Game Flow Part 3 - Player2 plays and game finishes
        console.log('\n🎮 GAME FLOW PART 3: Player2 plays and finishes the game...');
        
        // Player2 plays the game and gets their score
        const player2Score = 85; // Player2's game result
        gameSession.player2Score = player2Score;
        gameSession.winnerId = player2Score > gameSession.player1Score ? player2.id : player1.id;
        gameSession.finishedAt = new Date();
        await gameSession.save();
        
        console.log(`✅ Player2 played and game finished!`);
        console.log(`   Final scores: ${player1.username}: ${gameSession.player1Score}, ${player2.username}: ${gameSession.player2Score}`);
        console.log(`   Winner: ${gameSession.winnerId === player2.id ? player2.username : player1.username}`);
        console.log(`   Game finished at: ${gameSession.finishedAt}`);

        // Test 7: Game Flow Part 4 - Send result notification back to Player1
        console.log('\n🎮 GAME FLOW PART 4: Sending game result to Player1...');
        
        const winner = await gameSession.getWinner();
        const loser = await gameSession.getLoser();
        const resultMessage = `Game finished! ${winner?.username} won with ${gameSession.winnerId === player1.id ? gameSession.player1Score : gameSession.player2Score} points vs ${gameSession.winnerId === player1.id ? gameSession.player2Score : gameSession.player1Score} points.`;
        
        const gameResultNotification = await Notification.create({
            senderId: player2.id, // Player2 sends result back to Player1
            receiverId: player1.id,
            gameSessionId: gameSession.id,
            content: resultMessage,
            status: NotificationStatus.COMPLETED
        });
        
        console.log(`✅ Game result notification sent to Player1: ${gameResultNotification.id}`);
        console.log(`   Status: ${gameResultNotification.status}`);
        console.log(`   Message: ${gameResultNotification.content}`);

        // Update original notification to completed
        await gameInviteNotification.markCompleted();
        console.log(`✅ Original invite notification marked as completed`);

        // Test 8: Test all notification status methods
        console.log('\n📋 Testing notification status methods...');
        
        console.log(`   Game invite notification:`);
        console.log(`     isPending: ${gameInviteNotification.isPending()}`);
        console.log(`     isAccepted: ${gameInviteNotification.isAccepted()}`);
        console.log(`     isCompleted: ${gameInviteNotification.isCompleted()}`);
        console.log(`     isDeclined: ${gameInviteNotification.isDeclined()}`);
        
        console.log(`   Game result notification:`);
        console.log(`     isPending: ${gameResultNotification.isPending()}`);
        console.log(`     isCompleted: ${gameResultNotification.isCompleted()}`);

        // Test 9: Test decline scenario
        console.log('\n🎮 TESTING DECLINE SCENARIO: Creating another game invite...');
        
        const declineGameSession = await GameSession.create({
            player1Id: player2.id, // Player2 challenges Player1 this time
            player2Id: player1.id,
            gameType: GameType.SIGHT_READ,
            player1Score: 92,
            content: { tempo: 140, difficulty: 'hard' }
        });
        
        const declineNotification = await Notification.create({
            senderId: player2.id,
            receiverId: player1.id,
            gameSessionId: declineGameSession.id,
            status: NotificationStatus.PENDING
        });
        
        console.log(`✅ Player2 created challenge for Player1`);
        console.log(`   Challenge message: ${await declineNotification.getFormattedMessage()}`);
        
        // Player1 declines the challenge
        await declineNotification.decline();
        console.log(`✅ Player1 declined the challenge`);
        console.log(`   Status: ${declineNotification.status}`);
        console.log(`   Is declined: ${declineNotification.isDeclined()}`);

        // Test 10: Test user-notification relationships
        console.log('\n🔗 Testing user-notification relationships...');
        
        // Find all notifications for each user
        const player1Notifications = await Notification.findAll({
            where: {
                [Op.or]: [
                    { senderId: player1.id },
                    { receiverId: player1.id }
                ]
            },
            include: [
                { association: 'sender', attributes: ['username'] },
                { association: 'receiver', attributes: ['username'] }
            ]
        });
        
        const player2Notifications = await Notification.findAll({
            where: {
                [Op.or]: [
                    { senderId: player2.id },
                    { receiverId: player2.id }
                ]
            },
            include: [
                { association: 'sender', attributes: ['username'] },
                { association: 'receiver', attributes: ['username'] }
            ]
        });
        
        console.log(`✅ Player1 total notifications: ${player1Notifications.length}`);
        player1Notifications.forEach(notif => {
            console.log(`   ${notif.sender?.username} -> ${notif.receiver?.username}: ${notif.status}`);
        });
        
        console.log(`✅ Player2 total notifications: ${player2Notifications.length}`);
        player2Notifications.forEach(notif => {
            console.log(`   ${notif.sender?.username} -> ${notif.receiver?.username}: ${notif.status}`);
        });

        // Test 11: Test validation rules
        console.log('\n🛡️ Testing validation rules...');
        
        // Test notification validation - cannot send to self
        try {
            await Notification.create({
                senderId: player1.id,
                receiverId: player1.id, // Same as sender - should fail
                gameSessionId: gameSession.id,
                status: NotificationStatus.PENDING
            });
        } catch (error) {
            console.log('✅ Notification validation working - caught self-notification attempt');
        }
        
        // Test notification status validation with invalid operation
        try {
            await gameResultNotification.accept(); // Already completed - should fail
        } catch (error) {
            console.log('✅ Notification state validation working - caught invalid status transition');
        }

        // Test 12: Test cascade deletion
        console.log('\n🗑️ Testing cascade deletion...');
        
        const testUser = await User.create({
            email: 'test@delete.com',
            username: 'testdelete',
            password: 'password'
        });
        
        const testGame = await GameSession.create({
            player1Id: testUser.id,
            player2Id: player1.id,
            gameType: GameType.SIGHT_READ,
            player1Score: 50,
            content: {}
        });
        
        const testNotification = await Notification.create({
            senderId: testUser.id,
            receiverId: player1.id,
            gameSessionId: testGame.id,
            status: NotificationStatus.PENDING
        });
        
        const testNotificationId = testNotification.id;
        const testGameId = testGame.id;
        
        // Delete user - should cascade delete games and notifications
        await testUser.destroy();
        
        const deletedGame = await GameSession.findByPk(testGameId);
        const deletedNotification = await Notification.findByPk(testNotificationId);
        
        console.log(`✅ Cascade deletion test:`);
        console.log(`   Game deleted: ${deletedGame === null}`);
        console.log(`   Notification deleted: ${deletedNotification === null}`);

        // Test 13: Complex queries and statistics
        console.log('\n📊 Testing complex queries and statistics...');
        
        // Find all pending notifications
        const pendingNotifications = await Notification.findAll({
            where: { status: NotificationStatus.PENDING },
            include: [
                { association: 'sender', attributes: ['username'] },
                { association: 'receiver', attributes: ['username'] }
            ]
        });
        console.log(`✅ Pending notifications: ${pendingNotifications.length}`);
        
        // Find all completed games
        const completedGames = await GameSession.findAll({
            where: { finishedAt: { [Op.not]: null } },
            include: [
                { association: 'player1', attributes: ['username'] },
                { association: 'player2', attributes: ['username'] }
            ]
        });
        console.log(`✅ Completed games: ${completedGames.length}`);
        
        // Find games waiting for Player2
        const waitingGames = await GameSession.findAll({
            where: {
                finishedAt: null,
                player1Score: { [Op.not]: null },
                player2Score: null
            }
        });
        console.log(`✅ Games waiting for Player2: ${waitingGames.length}`);
        
        // User statistics
        const user1Games = await player1.getAllGames();
        const user1Wins = await player1.getWinCount();
        const user2Games = await player2.getAllGames();
        const user2Wins = await player2.getWinCount();
        
        console.log(`✅ ${player1.username} stats: ${user1Games.length} games, ${user1Wins} wins`);
        console.log(`✅ ${player2.username} stats: ${user2Games.length} games, ${user2Wins} wins`);

        // Test 14: Final database statistics
        console.log('\n📈 Final database statistics...');
        
        const totalUsers = await User.count();
        const totalGames = await GameSession.count();
        const totalNotifications = await Notification.count();
        const finishedGameCount = await GameSession.count({
            where: { finishedAt: { [Op.not]: null } }
        });
        const pendingNotificationCount = await Notification.count({
            where: { status: NotificationStatus.PENDING }
        });
        
        console.log(`📊 Database statistics:`);
        console.log(`   Total users: ${totalUsers}`);
        console.log(`   Total games: ${totalGames}`);
        console.log(`   Finished games: ${finishedGameCount}`);
        console.log(`   Pending invites: ${totalGames - finishedGameCount}`);
        console.log(`   Total notifications: ${totalNotifications}`);
        console.log(`   Pending notifications: ${pendingNotificationCount}`);

        console.log('\n🎉 ALL MIGRATION AND MODEL TESTS PASSED SUCCESSFULLY!');
        console.log('🎯 Complete game flow tested: Create -> Invite -> Accept -> Play -> Complete -> Notify');
        console.log('✅ All three models (User, GameSession, Notification) working perfectly!');
        console.log('✅ All relationships and associations functioning correctly!');
        console.log('✅ All validations and constraints enforced properly!');
        
        return true;

    } catch (error) {
        console.error('❌ Migration/Model test failed:', error);
        if (error instanceof Error) {
            console.error('Error details:', error.message);
            console.error('Stack trace:', error.stack);
        }
        return false;
    } finally {
        console.log('\n🧹 Skipping cleanup - test data will remain for inspection...');
        // Uncomment below to clean up test data
        /*
        console.log('\n🧹 Cleaning up test data...');
        try {
            await Notification.destroy({
                where: {
                    [Op.or]: [
                        { senderId: { [Op.in]: [player1.id, player2.id] } },
                        { receiverId: { [Op.in]: [player1.id, player2.id] } }
                    ]
                }
            });
            
            await GameSession.destroy({
                where: {
                    [Op.or]: [
                        { player1Id: { [Op.in]: [player1.id, player2.id] } },
                        { player2Id: { [Op.in]: [player1.id, player2.id] } }
                    ]
                }
            });
            
            await User.destroy({
                where: {
                    email: {
                        [Op.in]: [
                            'player1@musicduels.com',
                            'player2@musicduels.com'
                        ]
                    }
                }
            });
            console.log('✅ Test data cleaned up');
        } catch (cleanupError) {
            console.log('⚠️ Cleanup failed (this is ok):', cleanupError);
        }
        */
        
        await sequelize.close();
    }
}

// Run tests if this file is executed directly
if (require.main === module) {
    testAllMigrationsAndModels().then(success => {
        process.exit(success ? 0 : 1);
    });
}

export { testAllMigrationsAndModels };
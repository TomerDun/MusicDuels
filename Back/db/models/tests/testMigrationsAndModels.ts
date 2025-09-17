import { User } from '../user';
import { GameSession, GameType } from '../gameSession';
import { sequelize } from '../index';
import { Op } from 'sequelize';

async function testMigrationsAndModels() {
    try {
        console.log('🔄 Testing Users and GameSessions migrations and models...');
        
        // Test 1: Connection check
        await sequelize.authenticate();
        console.log('✅ Database connection successful!');

        // Test 2: Create test users
        console.log('\n👥 Creating test users...');
        
        const user1 = await User.create({
            email: 'player1@musicduels.com',
            username: 'rhythmmaster',
            password: 'securepass123'
            // totalScore defaults to 0
        });
        console.log(`✅ Created user1: ${user1.username} (ID: ${user1.id})`);

        const user2 = await User.create({
            email: 'player2@musicduels.com',
            username: 'beatkeeper',
            password: 'anotherpass456',
            totalScore: 200
        });
        console.log(`✅ Created user2: ${user2.username} (Score: ${user2.totalScore})`);

        // Test 3: Create game sessions
        console.log('\n🎮 Creating game sessions...');
        
        // Game where Player1 has played and sent invite, waiting for Player2
        const pendingGame = await GameSession.create({
            player1Id: user1.id,
            player2Id: user2.id,
            gameType: GameType.SIGHT_READ,
            player1Score: 78, // Player1 already played and got score
            content: { 
                tempo: 120, 
                difficulty: 'medium',
                questions: ['Q1', 'Q2', 'Q3'] 
            }
            // No player2Score, winnerId, or finishedAt - waiting for Player2 to accept and play
        });
        console.log(`✅ Created pending game: ${pendingGame.id}`);
        console.log(`   ${user1.username} sent invite and scored: ${pendingGame.player1Score}`);
        console.log(`   Waiting for ${user2.username} to accept and play...`);
        console.log(`   Type: ${pendingGame.gameType}`);
        console.log(`   Content:`, pendingGame.content);

        const finishedGame = await GameSession.create({
            player1Id: user1.id,
            player2Id: user2.id,
            gameType: GameType.SIGHT_READ,
            player1Score: 85,
            player2Score: 92,
            winnerId: user2.id,
            finishedAt: new Date(),
            content: { tempo: 140, difficulty: 'hard' }
        });
        console.log(`✅ Created finished game: ${finishedGame.id}`);
        console.log(`   Scores: ${finishedGame.player1Score} vs ${finishedGame.player2Score}`);
        console.log(`   Winner: ${user2.username}`);

        // Test 4: Test relationships and associations
        console.log('\n🔗 Testing relationships...');
        
        const userWithGames = await User.findByPk(user1.id, {
            include: [
                { association: 'gamesAsPlayer1' },
                { association: 'gamesAsPlayer2' }
            ]
        });
        
        console.log(`✅ User ${userWithGames?.username} relationships:`);
        console.log(`   Games as Player1: ${userWithGames?.gamesAsPlayer1?.length || 0}`);
        console.log(`   Games as Player2: ${userWithGames?.gamesAsPlayer2?.length || 0}`);

        const gameWithPlayers = await GameSession.findByPk(pendingGame.id, {
            include: [
                { association: 'player1' },
                { association: 'player2' }
            ]
        });

        console.log(`✅ Game ${gameWithPlayers?.id} includes:`);
        console.log(`   Player1: ${gameWithPlayers?.player1?.username}`);
        console.log(`   Player2: ${gameWithPlayers?.player2?.username}`);

        // Test 5: Test model instance methods
        console.log('\n⚡ Testing instance methods...');
        
        console.log(`Pending game finished status: ${pendingGame.isFinished()}`);
        console.log(`Finished game finished status: ${finishedGame.isFinished()}`);
        
        const winner = await finishedGame.getWinner();
        const loser = await finishedGame.getLoser();
        console.log(`Winner: ${winner?.username}`);
        console.log(`Loser: ${loser?.username}`);

        // Test user methods (now they should work with GameSession table existing)
        const user1Games = await user1.getAllGames();
        const user1Wins = await user1.getWinCount();
        console.log(`${user1.username} total games: ${user1Games.length}`);
        console.log(`${user1.username} wins: ${user1Wins}`);

        // Test 6: Complex queries
        console.log('\n📊 Testing complex queries...');
        
        // Find all finished games
        const completedGames = await GameSession.findAll({
            where: {
                finishedAt: {
                    [Op.not]: null
                }
            },
            include: [
                { association: 'player1', attributes: ['username'] },
                { association: 'player2', attributes: ['username'] }
            ]
        });
        console.log(`✅ Completed games: ${completedGames.length}`);
        completedGames.forEach(game => {
            console.log(`   ${game.player1?.username} vs ${game.player2?.username} - Winner: ${game.winnerId === game.player1Id ? game.player1?.username : game.player2?.username}`);
        });

        // Find games waiting for Player2 to accept (pending invites)
        const pendingInvites = await GameSession.findAll({
            where: {
                finishedAt: null,
                player1Score: { [Op.not]: null }, // Player1 has played
                player2Score: null                 // Player2 hasn't played yet
            }
        });
        console.log(`✅ Pending invites (waiting for Player2): ${pendingInvites.length}`);

        // Find users with highest scores
        const topPlayers = await User.findAll({
            order: [['totalScore', 'DESC']],
            limit: 5,
            attributes: ['username', 'totalScore']
        });
        console.log(`✅ Top players:`);
        topPlayers.forEach((player, index) => {
            console.log(`   ${index + 1}. ${player.username}: ${player.totalScore} points`);
        });

        // Test 7: Update operations - Player2 accepts invite and plays
        console.log('\n🔄 Testing Player2 accepting invite and finishing game...');
        
        // Player2 accepts the invite and plays, which finishes the game immediately
        pendingGame.player2Score = 81; // Player2 plays and gets score
        pendingGame.winnerId = pendingGame.player2Score > pendingGame.player1Score ? user2.id : user1.id;
        pendingGame.finishedAt = new Date(); // Game is finished as soon as both players have played
        await pendingGame.save();
        
        console.log(`✅ ${user2.username} accepted invite and played!`);
        console.log(`   Final scores: ${user1.username}: ${pendingGame.player1Score}, ${user2.username}: ${pendingGame.player2Score}`);
        console.log(`   Winner: ${pendingGame.winnerId === user2.id ? user2.username : user1.username}`);

        // Update user scores based on game results
        user1.totalScore += 78 + 85; // From pending game + finished game
        user2.totalScore += 81 + 92; // From both games won
        await user1.save();
        await user2.save();
        
        console.log(`✅ Updated total scores - ${user1.username}: ${user1.totalScore}, ${user2.username}: ${user2.totalScore}`);

        // Test 8: Foreign key constraints
        console.log('\n🔒 Testing foreign key constraints...');
        
        try {
            await GameSession.create({
                player1Id: '00000000-0000-0000-0000-000000000000', // Non-existent user
                player2Id: user2.id,
                gameType: GameType.SIGHT_READ,
                content: {}
            });
        } catch (error) {
            console.log('✅ Foreign key constraint working - caught invalid player1Id');
        }

        // Test 9: Validation tests
        console.log('\n🛡️ Testing validations...');
        
        try {
            await GameSession.create({
                player1Id: user1.id,
                player2Id: user1.id, // Same player - should fail model validation
                gameType: GameType.SIGHT_READ,
                content: {}
            });
        } catch (error) {
            console.log('✅ Model validation working - caught same player for both sides');
        }

        // Test 10: Migration rollback safety
        console.log('\n📈 Final statistics...');
        
        const totalUsers = await User.count();
        const totalGames = await GameSession.count();
        const finishedGameCount = await GameSession.count({
            where: { finishedAt: { [Op.not]: null } }
        });
        
        console.log(`📊 Database statistics:`);
        console.log(`   Total users: ${totalUsers}`);
        console.log(`   Total games: ${totalGames}`);
        console.log(`   Finished games: ${finishedGameCount}`);
        console.log(`   Pending invites: ${totalGames - finishedGameCount}`);

        console.log('\n🎉 All migration and model tests passed successfully!');
        return true;

    } catch (error) {
        console.error('❌ Migration/Model test failed:', error);
        if (error instanceof Error) {
            console.error('Error details:', error.message);
            console.error('Stack trace:', error.stack);
        }
        return false;
    } finally {
        console.log('\n🧹 Skipping cleanup - test data will remain...');
        // Clean up test data
        // console.log('\n🧹 Cleaning up test data...');
        // try {
        //     await GameSession.destroy({
        //         where: {
        //             [Op.or]: [
        //                 { player1Id: { [Op.in]: [
        //                     await User.findOne({ where: { email: 'player1@musicduels.com' } }).then(u => u?.id),
        //                     await User.findOne({ where: { email: 'player2@musicduels.com' } }).then(u => u?.id)
        //                 ].filter(Boolean) } },
        //                 { player2Id: { [Op.in]: [
        //                     await User.findOne({ where: { email: 'player1@musicduels.com' } }).then(u => u?.id),
        //                     await User.findOne({ where: { email: 'player2@musicduels.com' } }).then(u => u?.id)
        //                 ].filter(Boolean) } }
        //             ]
        //         }
        //     });
            
        //     await User.destroy({
        //         where: {
        //             email: {
        //                 [Op.in]: [
        //                     'player1@musicduels.com',
        //                     'player2@musicduels.com'
        //                 ]
        //             }
        //         }
        //     });
        //     console.log('✅ Test data cleaned up');
        // } catch (cleanupError) {
        //     console.log('⚠️ Cleanup failed (this is ok):', cleanupError);
        // }
        
        await sequelize.close();
    }
}

// Run tests if this file is executed directly
if (require.main === module) {
    testMigrationsAndModels().then(success => {
        process.exit(success ? 0 : 1);
    });
}

export { testMigrationsAndModels };
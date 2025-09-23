import { sequelize, User, GameSession, Notification } from './index';
import { GameType } from './gameSession';
import { NotificationStatus } from './notification';

async function testModels() {
    try {
        console.log('🔄 Testing database connection...');
        
        // Test 1: Connection
        await sequelize.authenticate();
        console.log('✅ Database connection successful!');
        
        // Test 2: Sync models (creates tables if they don't exist)
        console.log('🔄 Syncing models...');
        await sequelize.sync({ force: true }); // WARNING: force: true drops existing tables
        console.log('✅ Models synced successfully!');
        
        // Test 3: Create User
        console.log('🔄 Testing User model...');
        const user1 = await User.create({
            email: 'test1@example.com',
            username: 'testuser1',
            fName: 'Test',
            lastName: 'User1',
            password: 'password123'
        });
        console.log('✅ User created:', user1.username);
        
        const user2 = await User.create({
            email: 'test2@example.com',
            username: 'testuser2',
            fName: 'Test',
            lastName: 'User2',
            password: 'password456'
        });
        console.log('✅ User created:', user2.username);
        
        // Test 4: Create GameSession
        console.log('🔄 Testing GameSession model...');
        const gameSession = await GameSession.create({
            player1Id: user1.id,
            player2Id: user2.id,
            gameType: GameType.SIGHT_READ,
            content: { tempo: 120, difficulty: 'medium' }
        });
        console.log('✅ GameSession created:', gameSession.id);
        
        // Test 5: Create Notification
        console.log('🔄 Testing Notification model...');
        const notification = await Notification.create({
            senderId: user1.id,
            receiverId: user2.id,
            gameSessionId: gameSession.id,
            status: NotificationStatus.PENDING,
            content: 'Challenge you to a rhythm battle!'
        });
        console.log('✅ Notification created:', notification.id);
        
        // Test 6: Test relationships
        console.log('🔄 Testing relationships...');
        const userWithGames = await User.findByPk(user1.id, {
            include: ['gamesAsPlayer1', 'sentNotifications']
        });
        
        console.log('✅ Relationships working:');
        console.log(`   User has ${userWithGames?.gamesAsPlayer1?.length || 0} games as player1`);
        console.log(`   User has ${userWithGames?.sentNotifications?.length || 0} sent notifications`);
        
        // Test 7: Test instance methods
        console.log('🔄 Testing instance methods...');
        const isFinished = gameSession.isFinished();
        console.log('✅ Game finished status:', isFinished);
        
        // Manually finish the game
        gameSession.player1Score = 85;
        gameSession.player2Score = 92;
        gameSession.winnerId = 92 > 85 ? user2.id : user1.id;
        gameSession.finishedAt = new Date();
        await gameSession.save();
        
        console.log('✅ Game finished with scores: 85 vs 92');
        console.log('   Winner ID:', gameSession.winnerId);
        
        const isPending = notification.isPending();
        console.log('✅ Notification pending status:', isPending);
        
        // Test notification methods
        await notification.accept();
        console.log('✅ Notification accepted, new status:', notification.status);
        
        console.log('\n🎉 All model tests passed!');
        return true;
        
    } catch (error) {
        console.error('❌ Model test failed:', error);
        if (error instanceof Error) {
            console.error('Error details:', error.message);
        }
        return false;
    } finally {
        // Close connection
        await sequelize.close();
    }
}

// Run tests if this file is executed directly
if (require.main === module) {
    testModels().then(success => {
        process.exit(success ? 0 : 1);
    });
}

export { testModels };
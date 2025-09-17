import { User } from '../user';
import { sequelize } from '../index';
import { Op } from 'sequelize';

async function testUserOperations() {
    try {
        console.log('🔄 Testing User model operations...');

        // Test 1: Connection check
        await sequelize.authenticate();
        console.log('✅ Database connection successful!');

        // Test 2: Create new users
        console.log('\n📝 Creating new users...');

        const user1 = await User.create({
            email: 'alice@musicduels.com',
            username: 'alice_beats',
            password: 'securepassword123'
            // totalScore will default to 0
        });
        console.log(`✅ Created user: ${user1.username} (ID: ${user1.id})`);

        const user2 = await User.create({
            email: 'bob@musicduels.com',
            username: 'bob_rhythm',
            password: 'anotherpassword456',
            totalScore: 150 // Override default
        });
        console.log(`✅ Created user: ${user2.username} (Score: ${user2.totalScore})`);

        // Test 3: Find users
        console.log('\n🔍 Finding users...');

        const foundUser = await User.findOne({
            where: { email: 'alice@musicduels.com' }
        });
        console.log(`✅ Found user by email: ${foundUser?.username}`);

        const userByUsername = await User.findOne({
            where: { username: 'bob_rhythm' }
        });
        console.log(`✅ Found user by username: ${userByUsername?.email}`);

        // Test 4: Get all users
        console.log('\n📋 Getting all users...');
        const allUsers = await User.findAll({
            attributes: ['id', 'username', 'email', 'totalScore', 'createdAt'],
            order: [['totalScore', 'DESC']]
        });

        console.log('All users (sorted by score):');
        allUsers.forEach(user => {
            console.log(`  - ${user.username}: ${user.totalScore} points (${user.email})`);
        });

        // Test 5: Update user score
        console.log('\n🎯 Updating user score...');
        if (foundUser) {
            foundUser.totalScore += 50;
            await foundUser.save();
            console.log(`✅ Updated ${foundUser.username}'s score to: ${foundUser.totalScore}`);
        }

        // Test 6: Bulk operations
        console.log('\n🔄 Bulk operations...');

        // Count users
        const userCount = await User.count();
        console.log(`📊 Total users in database: ${userCount}`);

        // Find users with score > 100
        const highScorers = await User.findAll({
            where: {
                totalScore: {
                    [Op.gt]: 100
                }
            },
            attributes: ['username', 'totalScore']
        });
        console.log(`🏆 High scorers (>100):`, highScorers.map(u => `${u.username}: ${u.totalScore}`));

        // Test 7: Validation test
        console.log('\n🛡️ Testing validations...');
        try {
            await User.create({
                email: 'invalid-email', // Should fail validation
                username: 'test',
                password: 'pass'
            });
        } catch (error) {
            console.log('✅ Email validation working - caught invalid email');
        }

        try {
            await User.create({
                email: 'valid@email.com',
                username: 'ab', // Should fail - too short
                password: 'pass'
            });
        } catch (error) {
            console.log('✅ Username validation working - caught short username');
        }

        // Test 8: Unique constraint test
        console.log('\n🔒 Testing unique constraints...');
        try {
            await User.create({
                email: 'alice@musicduels.com', // Duplicate email
                username: 'different_user',
                password: 'password'
            });
        } catch (error) {
            console.log('✅ Email uniqueness working - caught duplicate email');
        }

        // // Test 9: Custom instance methods
        // console.log('\n🎮 Testing custom methods...');
        // if (foundUser) {
        //     const games = await foundUser.getAllGames();
        //     const winCount = await foundUser.getWinCount();
        //     console.log(`📊 ${foundUser.username} stats:`);
        //     console.log(`  - Total games: ${games.length}`);
        //     console.log(`  - Wins: ${winCount}`);
        // }

        console.log('\n🎉 All User model tests completed successfully!');
        return true;

    } catch (error) {
        console.error('❌ User model test failed:', error);
        if (error instanceof Error) {
            console.error('Error details:', error.message);
        }
        return false;
    } finally {
        console.log('\n🧹 Skipping cleanup - test data will remain...');

        // Clean up - optionally remove test users
        // console.log('\n🧹 Cleaning up test data...');
        // try {
        //     await User.destroy({
        //         where: {
        //             email: {
        //                 [Op.in]: [
        //                     'alice@musicduels.com',
        //                     'bob@musicduels.com'
        //                 ]
        //             }
        //         }
        //     });
        //     console.log('✅ Test users cleaned up');
        // } catch (cleanupError) {
        //     console.log('⚠️ Cleanup failed (this is ok):', cleanupError);
        // }

        await sequelize.close();
    }
}

// Run tests if this file is executed directly
if (require.main === module) {
    testUserOperations().then(success => {
        process.exit(success ? 0 : 1);
    });
}

export { testUserOperations };
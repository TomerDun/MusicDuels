import { sequelize } from './index';

async function quickConnectionTest() {
    try {
        console.log('🔄 Testing PostgreSQL connection...');
        await sequelize.authenticate();
        console.log('✅ Connection successful!');
        
        console.log('🔄 Testing models sync...');
        await sequelize.sync({ alter: true }); // Creates/updates tables without dropping
        console.log('✅ Models synced!');
        
        await sequelize.close();
        return true;
    } catch (error) {
        console.error('❌ Connection failed:', error);
        return false;
    }
}

quickConnectionTest();
import { sequelize } from '../index';

async function dropTables() {
    try {
        console.log('🗑️ Dropping all tables...');
        
        // Drop tables in correct order (reverse of dependencies)
        await sequelize.drop({ cascade: true });
        
        console.log('✅ All tables dropped successfully!');
        
    } catch (error) {
        console.error('❌ Failed to drop tables:', error);
    } finally {
        await sequelize.close();
    }
}

// Run if executed directly
if (require.main === module) {
    dropTables().then(() => {
        process.exit(0);
    }).catch(() => {
        process.exit(1);
    });
}

export { dropTables };
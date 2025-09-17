'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    /** types intellisense:
    * @param {import('sequelize').QueryInterface} queryInterface
    * @param {typeof import('sequelize')} Sequelize
    */
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('game_sessions', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
                allowNull: false
            },
            player1Id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            player2Id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            player1Score: {
                type: Sequelize.BIGINT,
                allowNull: true
            },
            player2Score: {
                type: Sequelize.BIGINT,
                allowNull: true
            },
            gameType: {
                type: Sequelize.STRING,
                allowNull: false
            },
            winnerId: {
                type: Sequelize.UUID,
                allowNull: true
            },
            content: {
                type: Sequelize.JSON,
                allowNull: false,
                defaultValue: {}
            },
            finishedAt: {
                type: Sequelize.DATE,
                allowNull: true
            },
            imageUrl: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            }
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable('game_sessions');
    }
};
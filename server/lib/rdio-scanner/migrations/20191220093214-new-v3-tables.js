/*
 * *****************************************************************************
 *  Copyright (C) 2019-2020 Chrystian Huot
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>
 * ****************************************************************************
 */

'use strict';

module.exports = {

    up: async (queryInterface, Sequelize) => {
        const transaction = await queryInterface.sequelize.transaction();

        try {
            await queryInterface.addColumn('rdioScannerCalls', 'audioName', Sequelize.STRING, { transaction });

            await queryInterface.addColumn('rdioScannerCalls', 'audioType', Sequelize.STRING, { transaction });

            await queryInterface.addColumn('rdioScannerSystems', 'aliases', { allowNull: false, defaultValue: [], type: Sequelize.JSON }, { transaction });

            await transaction.commit();

        } catch (err) {
            await transaction.rollback();

            throw err;
        }
    },

    down: async (queryInterface, Sequelize) => {
        const transaction = queryInterface.sequelize.transaction();

        try {
            await transaction.commit();

            await queryInterface.removeColumn('rdioScannerCalls', 'audioName', Sequelize.STRING, { transaction });

            await queryInterface.removeColumn('rdioScannerCalls', 'audioType', Sequelize.STRING, { transaction });

            await queryInterface.removeColumn('rdioScannerSystems', 'aliases', Sequelize.JSON, { transaction });

        } catch (err) {
            await transaction.rollback();

            throw err;
        }
    },
};

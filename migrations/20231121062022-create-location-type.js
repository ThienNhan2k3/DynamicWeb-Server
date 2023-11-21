'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('locationTypes', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      locationType: {
        type: DataTypes.STRING,
        allowNull: false 
      },
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('locationTypes');
  }
};
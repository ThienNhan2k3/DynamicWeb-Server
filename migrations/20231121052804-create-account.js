'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('accounts', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      firstName:  {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName:  {
        type: DataTypes.STRING,
        allowNull: false
      },
      username:  {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      type: { 
        type:DataTypes.STRING,
        allowNull: false
      },
      district: DataTypes.STRING,
      ward: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      otp: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      expiredOtp: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('accounts');
  }
};
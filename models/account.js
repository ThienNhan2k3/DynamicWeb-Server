"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Report }) {
      // define association here
      this.hasMany(Report);
    }
  }
  Account.init(
    {
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
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      district: DataTypes.STRING,
      ward: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      otp: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      expiredOtp: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "accounts",
      modelName: "Account",
    }
  );
  return Account;
};


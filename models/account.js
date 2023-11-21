'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Report}) {
      // define association here
      this.hasMany(Report, {foreignKey: "accountId"});
    }
  }
  Account.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
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
  }, {
    sequelize,
    tableName: "accounts",
    modelName: 'Account',
  });
  return Account;
};
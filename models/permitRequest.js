'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PermitRequest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Board, AdsPlacement, Company, Account}) {
      // define association here
      this.belongsTo(Board);
      this.belongsTo(AdsPlacement);
      this.belongsTo(Company);
      this.belongsTo(Account);
    }
  }
  PermitRequest.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    size: {
      type: DataTypes.STRING,
      allowNull: true
    },
    quantity: {
      type: DataTypes.STRING,
      allowNull: true
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    start: {
      type: DataTypes.DATE,
      allowNull: false
    },
    end: {
      type: DataTypes.DATE,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    size: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    tableName: "permitRequests",
    modelName: 'PermitRequest',
  });
  return PermitRequest;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Board extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({BoardType, AdsPlacement, Report, PermitRequest}) {
      // define association here
      this.belongsTo(BoardType, {foreignKey: "boardTypeId"});
      this.belongsTo(AdsPlacement, {foreignKey: "adsPlacementId"});
      this.hasMany(Report, {foreignKey: "boardId"});
      this.hasOne(PermitRequest, {foreignKey: 'boardId'});
    }
  }
  Board.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    size: {
      type: DataTypes.STRING,
      allowNull: false
    },
    quantity: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // image: DataTypes.STRING,
  }, {
    sequelize,
    tableName: "boards",
    modelName: 'Board',
  });
  return Board;
};
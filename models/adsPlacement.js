'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AdsPlacement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Area, LocationType, AdsType, Board, PermitRequest}) {
      // define association here
      this.belongsTo(Area, { foreignKey: 'areaId'});
      this.belongsTo(LocationType, { foreignKey: 'locationTypeId'});
      this.belongsTo(AdsType, { foreignKey: 'adsTypeId'});
      this.hasMany(Board, { foreignKey: 'adsPlacementId'});
      this.hasMany(PermitRequest, { foreignKey: 'adsPlacementId'});
    }
  }
  AdsPlacement.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: DataTypes.STRING,
    long: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    lat: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
  }, {
    sequelize,
    tableName: "adsPlacements",
    modelName: 'AdsPlacement',
  });
  return AdsPlacement;
};
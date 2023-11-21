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
    static associate({Board, AdsPlacement, Company}) {
      // define association here
      this.belongsTo(Board, {foreignKey: 'boardId'});
      this.belongsTo(AdsPlacement, {foreignKey: 'adsPlacementId'});
      this.belongsTo(Company, {foreignKey: 'companyId'});
    }
  }
  PermitRequest.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    // size: DataTypes.STRING,
    // quantity: DataTypes.STRING,
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
      allowNull: false
    },
  }, {
    sequelize,
    tableName: "permitRequests",
    modelName: 'PermitRequest',
  });
  return PermitRequest;
};
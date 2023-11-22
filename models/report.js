'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Report extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Board, ReportType, Account,AdsPlacement}) {
      // define association here
      this.belongsTo(Board, { foreignKey: { allowNull: true } });
      this.belongsTo(ReportType);
      this.belongsTo(Account);
      this.belongsTo(AdsPlacement, { foreignKey: { allowNull: true } });
    }
  }
  Report.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    submission_time: DataTypes.DATE,
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    reportContent: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    method: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    tableName: "reports",
    modelName: 'Report',
  });
  return Report;
};
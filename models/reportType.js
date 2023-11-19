import Sequelize from "sequelize";

import sequelize from "../util/database.js";

const ReportType = sequelize.define("ReportType", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  type: Sequelize.STRING,
});

export default ReportType;

import Sequelize from "sequelize";

import sequelize from "../util/database.js";

const Area = sequelize.define("Area", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  ward: Sequelize.INTEGER,
  district: Sequelize.INTEGER,
});

export default Area;

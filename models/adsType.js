import Sequelize from "sequelize";

import sequelize from "../util/database.js";

const AdsType = sequelize.define("AdsType", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  type:Sequelize.STRING,
});

export default AdsType;

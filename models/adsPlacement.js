import Sequelize from "sequelize";

import sequelize from "../util/database.js";

const AdsPlacement = sequelize.define("AdsPlacement", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  address: Sequelize.STRING,
  status: Sequelize.STRING,
  long: Sequelize.DOUBLE,
  lat: Sequelize.DOUBLE,
});

export default AdsPlacement;

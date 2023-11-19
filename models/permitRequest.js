import Sequelize from "sequelize";

import sequelize from "../util/database.js";

const PermitRequest = sequelize.define("PermitRequest", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  // size: Sequelize.STRING,
  // quantity: Sequelize.STRING,
  content: Sequelize.STRING,
  image: Sequelize.STRING,
  start: Sequelize.DATE,
  end: Sequelize.DATE,
  status: Sequelize.STRING,
  boardType: Sequelize.STRING,
  size: Sequelize.STRING,
  adsType: Sequelize.STRING,
});

export default PermitRequest;

import Sequelize from "sequelize";

import sequelize from "../util/database.js";

const BoardType = sequelize.define("BoardType", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  type: Sequelize.STRING,
});

export default BoardType;

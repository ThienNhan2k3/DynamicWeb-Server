import Sequelize from "sequelize";

import sequelize from "../util/database.js";

const Board = sequelize.define("Board", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  size: Sequelize.STRING,
  quantity: Sequelize.STRING,
  // image: Sequelize.STRING,
  
});

export default Board;

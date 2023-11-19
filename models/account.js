import Sequelize from "sequelize";

import sequelize from "../util/database.js";

const Account = sequelize.define("Account", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  type: Sequelize.STRING,
  district: Sequelize.INTEGER,
  ward: Sequelize.INTEGER,
  email: Sequelize.STRING,
});

export default Account;

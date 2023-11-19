import Sequelize from "sequelize";

import sequelize from "../util/database.js";

const Company = sequelize.define("Company", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: Sequelize.STRING,
  phone: Sequelize.STRING,
  address: Sequelize.STRING,
  email: Sequelize.STRING,
});

export default Company;

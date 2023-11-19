import Sequelize from "sequelize";

import sequelize from "../util/database.js";

const Report = sequelize.define("Report", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  submission_time: Sequelize.DATE,
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  phone: Sequelize.STRING,
  reportContent: Sequelize.STRING,
  image: Sequelize.STRING,
  status:Sequelize.STRING,
  method:Sequelize.STRING,
});

export default Report;

import Sequelize from "sequelize";

import sequelize from "../util/database.js";

const LocationType = sequelize.define("LocationType", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  locationType: Sequelize.STRING,
});

export default LocationType;

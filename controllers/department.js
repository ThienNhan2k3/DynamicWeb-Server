const {Area, sequelize} = require("../models");
const sql = sequelize.sql;
const controller = {};

controller.accountManagement = async (req, res) => {
    const wards = await Area.findAll({
        attributes: ['district', "ward"]
    });
    const [districts] = await sequelize.query(`SELECT DISTINCT district FROM Areas`);
    console.log(districts);

    return res.render("So/accountManagement.ejs", {
        districts, 
        wards
    });
}

controller.createAccount =  (req, res) => {
    return res.render("So/accountManagement.ejs");
}

module.exports = controller;
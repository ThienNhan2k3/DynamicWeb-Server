const {Area} = require("../models");
const controller = {};

controller.accountManagement = async (req, res) => {
    const areas = await Area.findAll({
        attributes: ['id', 'district', "ward"]
    });
    return res.render("So/accountManagement.ejs", {
        areas
    });
}

controller.createAccount =  (req, res) => {
    return res.render("So/accountManagement.ejs");
}

module.exports = controller;
const models = require("../models");
const Sequelize = require("sequelize");
const controller = {};

controller.home = async (req, res) => {
    
    return res.render("PhuongQuan/home.ejs", {
        tab: "Trang chủ",
    });
}

controller.showListAdsplacements = async (req, res) => {

    let options = {
        include: [
            {model: models.Area},
            {model: models.LocationType},
            {model: models.AdsType}
        ]
    }

    let {rows, count} = await models.AdsPlacement.findAndCountAll(options);

    return res.render("PhuongQuan/list-adsplacements.ejs", {
        tab: "Danh sách điểm đặt quảng cáo",
        adsPlacements: rows,
    });
}

module.exports = controller;
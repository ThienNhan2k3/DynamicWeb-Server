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

    //Adding options for select forms
    res.locals.areas = await models.Area.findAll();
    res.locals.adsTypes = await models.AdsType.findAll();
    res.locals.locationTypes = await models.LocationType.findAll();

    return res.render("PhuongQuan/list-adsplacements.ejs", {
        tab: "Danh sách điểm đặt quảng cáo",
        adsPlacements: rows,
    });
}

controller.editAdsplacement = async (req, res) => {
    let {id, address, areaId, adsTypeId, locationTypeId, status} = req.body;
}

module.exports = controller;
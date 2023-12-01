const models = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const controller = {};

controller.home = async (req, res) => {
    
    return res.render("PhuongQuan/home.ejs", {
        tab: "Trang chủ",
    });
}

controller.showListAdsplacements = async (req, res) => {

    let options = {
        include: [
            {
                model: models.Area,
                where: {}
            },
            {model: models.LocationType},
            {model: models.AdsType}
        ],
        where: {}
    }

    options.include[0].where.district = req.session.accountDistrict;

    if (req.session.accountType == 'Phuong') {
        options.include[0].where.ward = req.session.accountWard;
    }

    else {
        let selectedArea = req.query.selectedArea ? req.query.selectedArea : '';
        console.log('Select 1', selectedArea);
        console.log('Account', req.session.accountWard);
        if (selectedArea.trim() != '' && selectedArea != 'all') {
            options.where.areaId = selectedArea;
        }
        else {
            options.include[0].where.district = req.session.accountDistrict;
        }
    }

    let {rows, count} = await models.AdsPlacement.findAndCountAll(options);

    //Adding options for select forms
    res.locals.areas = await models.Area.findAll({
        order: [
            ['district', 'ASC'],
            ['ward', 'ASC']
        ]
    });
    res.locals.adsTypes = await models.AdsType.findAll();
    res.locals.locationTypes = await models.LocationType.findAll();
    res.locals.myArea = await models.Area.findAll({
        where: {district: req.session.accountDistrict},
        order: [
            ['ward', 'ASC']
        ]
    })

    return res.render("PhuongQuan/list-adsplacements.ejs", {
        tab: "Danh sách điểm đặt quảng cáo",
        adsPlacements: rows,
    });
}

controller.editAdsplacement = async (req, res) => {
    let {id, address, areaId, adsTypeId, locationTypeId, status} = req.body;
}

module.exports = controller;
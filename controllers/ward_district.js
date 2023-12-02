const models = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const controller = {};

controller.home = async (req, res) => {
    
    return res.render("PhuongQuan/home.ejs", {
        tab: "Trang chủ",
        selectedId: req.session.selectedAdsplacementId
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
        selectedId: req.session.selectedAdsplacementId
    });
}

controller.editAdsplacement = async (req, res) => {
    let {id, address, areaId, adsTypeId, locationTypeId, status} = req.body;
}

controller.showListBoards = async (req, res) => {

    let id = isNaN(req.params.id) ? -1 : parseInt(req.params.id);

    req.session.selectedAdsplacementId = id;

    res.locals.adsplacement = await models.AdsPlacement.findOne({
        include: [{model: models.Area}],
        where: {id: id}
    });

    let {rows, count} = await models.Board.findAndCountAll({
        include: [
            {
                model: models.PermitRequest,
                required: true
            },
            {model: models.BoardType}
        ],
        where: {adsPlacementId: id},
    });

    let permitedRows = rows;

    let emptyBoards = await models.Board.findAll({
        include: [
            {
                model: models.PermitRequest,
                required: false,
                where: {boardId: null}
            },
            {model: models.BoardType}
        ],
        where: {
            [Op.and]: [
                {adsPlacementId: id},
                {id: {
                    [Op.notIn]: Sequelize.literal(
                      '(SELECT boardId FROM permitRequests WHERE boardId IS NOT NULL)'
                    )
                  }}
            ]
        }
    });

    res.locals.waitingBoards = await models.Board.findAll({
        include: [
            {
                model: models.PermitRequest,
                where: {
                    status: 'Chưa cấp phép',
                    accountId: req.session.accountId
                }
            },
            {model: models.BoardType}
        ],
        where: {adsPlacementId: id},
    });

    return res.render("PhuongQuan/list-boards", {
        selectedId: id,
        tab: "Danh sách bảng quảng cáo",
        selectedId: req.session.selectedAdsplacementId,
        permitedBoards: permitedRows,
        emptyBoards: emptyBoards
    });
}

module.exports = controller;
const models = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const controller = {};

controller.home = async (req, res) => {

    res.locals.adsTypes = await models.AdsType.findAll();
    res.locals.companies = await models.Company.findAll();
    res.locals.boardTypes = await models.BoardType.findAll();

    const account = await models.Account.findOne({
      where: { id: req.session.accountId },
      include: [
        {
          model: models.Area,
          required: true,
        },
      ],
    });

    return res.render("PhuongQuan/home.ejs", {
        tab: "Trang chủ",
        selectedId: req.session.selectedAdsplacementId,
        area: account.Area,
        type: account.type,
    });
}

controller.addPermitRequest = async (req, res) => {
  let {boardId} = req.body;
  if (boardId == -1) {
    let {adsPlacementId, boardTypeId, boardSize, boardQuantity} = req.body;
    //Create new board
    adsPlacementId = 2;
    try {
      let newBoard = await models.Board.create({
        size: boardSize,
        quantity: boardQuantity,
        BoardTypeId: boardTypeId,
        AdsPlacementId: adsPlacementId,
      })
      boardId = newBoard.id;
    } catch (error) {
      res.send("Có lỗi xảy ra!");
      console.error(error);
    }
  }
  let {companyId} = req.body;
  if (companyId == -1) {
    let {companyName, email, phone, address} = req.body;
    // Create new company
    try {
      let newCompany = await models.Company.create({
        name: companyName,
        phone: phone,
        address: address,
        email: email,
      })
      companyId = newCompany.id;
    } catch (error) {
      res.send("Có lỗi xảy ra!");
      console.error(error);
    }
  }
    
  //Create new permit request
  let {content, startDate, endDate} = req.body;
  try {
    const file = req.file;
    console.log('image', file);
    let imageUrl;
    const path = [];
    path.push(file.path);
    if (file) {
      path.push(file.path);
      imageUrl = path.join(",");
      imageUrl = imageUrl.replace(/\\/g, "/");
    }
    await models.PermitRequest.create({
      content: content,
      image: imageUrl,
      start: startDate,
      end: endDate,
      status: 'Chưa cấp phép',
      BoardId: boardId,
      CompanyId: companyId,
      AccountId: req.session.accountId
    })
    res.redirect('back');
  } catch (error) {
    res.send("Có lỗi xảy ra!");
    console.error(error);
  }
}

controller.showListAdsplacements = async (req, res) => {
  let options = {
    include: [
      {
        model: models.Area,
        where: {},
      },
      { model: models.LocationType },
      { model: models.AdsType },
    ],
    where: {},
  };

  options.include[0].where.district = req.session.accountDistrict;

  if (req.session.accountType == "Phuong") {
    options.include[0].where.ward = req.session.accountWard;
  } else {
    let selectedArea = req.query.selectedArea ? req.query.selectedArea : "";
    if (selectedArea.trim() != "" && selectedArea != "all") {
      options.where.areaId = selectedArea;
    } else {
      options.include[0].where.district = req.session.accountDistrict;
    }
  }

  let { rows, count } = await models.AdsPlacement.findAndCountAll(options);

  //Adding options for select forms
  res.locals.areas = await models.Area.findAll({
    order: [
      ["district", "ASC"],
      ["ward", "ASC"],
    ],
  });
  res.locals.adsTypes = await models.AdsType.findAll();
  res.locals.locationTypes = await models.LocationType.findAll();
  res.locals.myArea = await models.Area.findAll({
    where: { district: req.session.accountDistrict },
    order: [["ward", "ASC"]],
  });

  return res.render("PhuongQuan/list-adsplacements.ejs", {
    tab: "Danh sách điểm đặt quảng cáo",
    adsPlacements: rows,
    selectedId: req.session.selectedAdsplacementId,
  });
};

controller.editAdsplacement = async (req, res) => {
  let { adsplacementId, address, adsTypeId, locationTypeId, status, reason } =
    req.body;
  try {
    await models.AdsPlacementRequest.create({
      AdsPlacementId: adsplacementId,
      address: address,
      AdsTypeId: adsTypeId,
      LocationTypeId: locationTypeId,
      status: status,
      reason: reason,
      AccountId: req.session.accountId,
      requestStatus: "Chờ phê duyệt",
    });
    res.redirect("./list-adsplacements");
  } catch (error) {
    res.send("Gửi yêu cầu thất bại!");
    console.error(error);
  }
};

controller.showListBoards = async (req, res) => {
  let id = isNaN(req.params.id) ? -1 : parseInt(req.params.id);

  req.session.selectedAdsplacementId = id;

  res.locals.adsplacement = await models.AdsPlacement.findOne({
    include: [{ model: models.Area }],
    where: { id: id },
  });

  let { rows, count } = await models.Board.findAndCountAll({
    include: [
      {
        model: models.PermitRequest,
        required: true,
      },
      { model: models.BoardType },
    ],
    where: { adsPlacementId: id },
  });

  let permitedRows = rows;

  let emptyBoards = await models.Board.findAll({
    include: [
      {
        model: models.PermitRequest,
        required: false,
        where: { boardId: null },
      },
      { model: models.BoardType },
    ],
    where: {
      [Op.and]: [
        { adsPlacementId: id },
        {
          id: {
            [Op.notIn]: Sequelize.literal(
              "(SELECT boardId FROM permitRequests WHERE boardId IS NOT NULL)"
            ),
          },
        },
      ],
    },
  });

  //Adding options for select forms
  res.locals.boardTypes = await models.BoardType.findAll();
  res.locals.companies = await models.Company.findAll();
  res.locals.adsTypes = await models.AdsType.findAll();

  return res.render("PhuongQuan/list-boards", {
    selectedId: id,
    tab: "Danh sách bảng quảng cáo",
    selectedId: req.session.selectedAdsplacementId,
    permitedBoards: permitedRows,
    emptyBoards: emptyBoards,
  });
};

controller.editBoard = async (req, res) => {
  let { boardId, quantity, size, boardTypeId, reason } = req.body;
  try {
    await models.BoardRequest.create({
      BoardId: boardId,
      size: size,
      quantity: quantity,
      BoardTypeId: boardTypeId,
      reason: reason,
      AccountId: req.session.accountId,
      requestStatus: "Chờ phê duyệt",
    });
    res.redirect("./list-boards/" + req.session.selectedAdsplacementId);
  } catch (error) {
    res.send("Gửi yêu cầu thất bại!");
    console.error(error);
  }
};

controller.showMyRequests = async (req, res) => {
  res.locals.adsplacementRequests = await models.AdsPlacementRequest.findAll({
    include: [{ model: models.LocationType }, { model: models.AdsType }],
    where: {
      accountId: req.session.accountId,
    },
    order: [["id", "ASC"]],
  });

  res.locals.boardRequests = await models.BoardRequest.findAll({
    include: [{ model: models.BoardType }],
    where: { accountId: req.session.accountId },
    order: [["id", "ASC"]],
  });

  res.locals.permitRequests = await models.PermitRequest.findAll({
    include: [{ model: models.Company }],
    where: {
      status: "Chưa cấp phép",
      accountId: req.session.accountId,
    },
    order: [["id", "ASC"]],
  });

  return res.render("PhuongQuan/my-requests.ejs", {
    tab: "Yêu cầu của tôi",
    selectedId: req.session.selectedAdsplacementId,
  });
};

controller.deleteRequest = async (req, res) => {
  let { tableName, requestId } = req.body;
  console.log(req.body);
  try {
    if (tableName == "BoardRequest") {
      await models.BoardRequest.destroy({ where: { id: requestId } });
    }
    if (tableName == "AdsPlacementRequest") {
      await models.AdsPlacementRequest.destroy({ where: { id: requestId } });
    }
    if (tableName == "PermitRequest") {
      await models.PermitRequest.destroy({ where: { id: requestId } });
    }
    res.redirect("back");
  } catch (error) {
    res.send("Huỷ yêu cầu thất bại!");
    console.error(error);
  }
};

controller.showListReports = async (req, res) => {

  let options = {
    include: [
      {
        model: models.AdsPlacement,
        attribute: ['address'],
        include: [{
          model: models.Area,
          where: {}
        }],
        where: {}
      },
      {model: models.ReportType},
    ],
    where: {},
  };

  options.include[0].include[0].where.district = req.session.accountDistrict;

  if (req.session.accountType == "Phuong") {
    options.include[0].include[0].where.ward = req.session.accountWard;
  } else {
    let selectedArea = req.query.selectedArea ? req.query.selectedArea : "";
    if (selectedArea.trim() != "" && selectedArea != "all") {
      options.include[0].where.areaId = selectedArea;
    } else {
      options.include[0].include[0].where.district = req.session.accountDistrict;
    }
  }

  res.locals.reports = await models.Report.findAll(options);

  res.locals.myArea = await models.Area.findAll({
    where: { district: req.session.accountDistrict },
    order: [["ward", "ASC"]],
  });

  return res.render("PhuongQuan/list-reports.ejs", {
    tab: "Danh sách báo cáo",
    selectedId: req.session.selectedAdsplacementId,
  });
};

controller.showReportDetails = async (req, res) => {

  let id = isNaN(req.params.id) ? -1 : parseInt(req.params.id);

  if (id == -1) {
    return res.send("Report not found!");
  }

  res.locals.report = await models.Report.findOne({
    where: {id}
  })

  return res.render("PhuongQuan/view-report-details.ejs", {
    tab: "Chi tiết báo cáo",
    selectedId: req.session.selectedAdsplacementId,
  })
}

controller.updateReportDetails = async (req, res) => {
  let {reportId, method, status} = req.body;
  try {
    await models.Report.update({
      method: method,
      status: status,
      AccountId: req.session.accountId
    },
    {where: {id: reportId}});
    res.redirect('back');
  } catch (error) {
    res.send('Xử lý báo cáo thất bại!');
    console.error(error);
  }
}

module.exports = controller;

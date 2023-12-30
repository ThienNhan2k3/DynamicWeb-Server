const models = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const Mailjet = require("node-mailjet");
const controller = {};

const mailjet = new Mailjet({
  apiKey: process.env.MJ_APIKEY_PUBLIC || "5f453b57b69003f11cdbd0d46c363385",
  apiSecret:
    process.env.MJ_APIKEY_PRIVATE || "b7af7b365498a7f77d1270fb86fa5826",
});

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

  const wards=await models.Area.findAll({
    attributes:['ward'],
    where:{district:account.Area.district}
  })
  const wardArr=wards.map((area)=>{return area.dataValues.ward})
  // console.log(wardArr)
  return res.render("PhuongQuan/home.ejs", {
    tab: "Trang chủ",
    area: account.Area,
    type: account.type,
    wards:wardArr,
    path:"/home"
  });
};

controller.addPermitRequest = async (req, res) => {
  let {boardId} = req.body;
  if (boardId == -1) {
    let { adsPlacementId, boardTypeId, boardSize, boardQuantity } = req.body;
    //Create new board
    try {
      let newBoard = await models.Board.create({
        size: boardSize,
        quantity: boardQuantity,
        BoardTypeId: boardTypeId,
        AdsPlacementId: adsPlacementId,
      });
      boardId = newBoard.id;
    } catch (error) {
      res.send("Có lỗi xảy ra!");
      console.error(error);
    }
  }
  let { companyId } = req.body;
  if (companyId == -1) {
    let { companyName, email, phone, address } = req.body;
    // Create new company
    try {
      let newCompany = await models.Company.create({
        name: companyName,
        phone: phone,
        address: address,
        email: email,
      });
      companyId = newCompany.id;
    } catch (error) {
      res.send("Có lỗi xảy ra!");
      console.error(error);
    }
  }

  //Create new permit request
  let { content, startDate, endDate } = req.body;
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
      status: "Chưa cấp phép",
      BoardId: boardId,
      CompanyId: companyId,
      AccountId: req.session.accountId,
    });
    res.redirect("back");
  } catch (error) {
    res.send("Có lỗi xảy ra!");
    console.error(error);
  }
};

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
    if (selectedArea != "") {
      options.where.areaId = selectedArea;
    } 
    // else {
    //   options.include[0].where.district = req.session.accountDistrict;
    // }
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
    path:"/list-adsplacements"
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

  let options = {
    include: [
      {
        model: models.AdsPlacement,
        attribute: ["address"],
        include: [
          {
            model: models.Area,
            where: {},
          },
        ],
        where: {},
      },
      {
        model: models.PermitRequest,
        required: true,
      },
      { model: models.BoardType },
    ],
    where: {}
  };

  if (id != -1) {
    options.where.adsPlacementId = id;
  }

  options.include[0].include[0].where.district = req.session.accountDistrict;

  if (req.session.accountType == "Phuong") {
    options.include[0].include[0].where.ward = req.session.accountWard;
  } else {
    let selectedArea = req.query.selectedArea ? req.query.selectedArea : "";
    if (selectedArea != "") {
      options.include[0].where.areaId = selectedArea;
    }
  }

  let { rows, count } = await models.Board.findAndCountAll(options);
  let permitedRows = rows;

  options = {
    include: [
      {
        model: models.AdsPlacement,
        attribute: ["address"],
        include: [
          {
            model: models.Area,
            where: {},
          },
        ],
        where: {},
      },
      {
        model: models.PermitRequest,
        required: false,
        where: { boardId: null },
      },
      { model: models.BoardType },
    ],
    where: {
      [Op.and]: [
        {
          id: {
            [Op.notIn]: Sequelize.literal(
              "(SELECT boardId FROM permitRequests WHERE boardId IS NOT NULL)"
            ),
          },
        },
      ],
    },
  };

  if (id != -1) options.where[Op.and].push({adsPlacementId: id});

  options.include[0].include[0].where.district = req.session.accountDistrict;

  if (req.session.accountType == "Phuong") {
    options.include[0].include[0].where.ward = req.session.accountWard;
  } else {
    let selectedArea = req.query.selectedArea ? req.query.selectedArea : "";
    if (selectedArea != "") {
      options.include[0].where.areaId = selectedArea;
    }
  }

  let emptyBoards = await models.Board.findAll(options);

  //Adding options for select forms
  res.locals.boardTypes = await models.BoardType.findAll();
  res.locals.companies = await models.Company.findAll();
  res.locals.adsTypes = await models.AdsType.findAll();
  res.locals.myArea = await models.Area.findAll({
    where: { district: req.session.accountDistrict },
    order: [["ward", "ASC"]],
  });

  return res.render("PhuongQuan/list-boards", {
    tab: "Danh sách bảng quảng cáo",
    permitedBoards: permitedRows,
    emptyBoards: emptyBoards,
    path:"/list-boards"
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
    path:"/my-requests"
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
        attribute: ["address"],
        include: [
          {
            model: models.Area,
            where: {},
          },
        ],
        where: {},
      },
      { model: models.ReportType },
    ],
    where: {},
  };

  options.include[0].include[0].where.district = req.session.accountDistrict;

  if (req.session.accountType == "Phuong") {
    options.include[0].include[0].where.ward = req.session.accountWard;
  } else {
    let selectedArea = req.query.selectedArea ? req.query.selectedArea : "";
    if (selectedArea != "") {
      options.include[0].where.areaId = selectedArea;
    }
  }

  res.locals.reports = await models.Report.findAll(options);

  res.locals.myArea = await models.Area.findAll({
    where: { district: req.session.accountDistrict },
    order: [["ward", "ASC"]],
  });

  return res.render("PhuongQuan/list-reports.ejs", {
    tab: "Danh sách báo cáo",
    path:"/list-reports"
  });
};

controller.showReportDetails = async (req, res) => {
  let id = isNaN(req.params.id) ? -1 : parseInt(req.params.id);

  if (id == -1) {
    return res.send("Report not found!");
  }

  res.locals.report = await models.Report.findOne({
    where: { id },
  });

  return res.render("PhuongQuan/view-report-details.ejs", {
    tab: "Chi tiết báo cáo",
    path:"/list-reports"
  });
};

controller.updateReportDetails = async (req, res) => {
  let { reportId, method, status } = req.body;
  try {
    await models.Report.update(
      {
        method: method,
        status: status,
        AccountId: req.session.accountId,
      },
      { where: { id: reportId } }
    );
    const report = await models.Report.findOne({ where: { id: reportId } });
    const account = await models.Account.findOne({
      where: { id: req.session.accountId },
      include: [{ model: models.Area }],
    });

    // Send email
    const request = await mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: "hiiback0608@gmail.com",
            Name: "Sở văn hóa và du lịch",
          },
          To: [
            {
              Email: report.email,
              Name: report.email,
            },
          ],
          TemplateID: 5485692,
          Subject: "Phản hồi về báo cáo",
          TemplateLanguage: true,
          Variables: {
            citizenName: report.name,
            content: method,
            officerName: `${account.lastName} ${account.firstName}`,
            officerType:
              account.type == "Quan"
                ? `Cán bộ  ${account.Area.district.toLowerCase()}`
                : ` Cán bộ ${account.Area.ward.toLowerCase()}`,
            email: account.email,
          },
        },
      ],
    });
    res.redirect("back");
  } catch (error) {
    res.send("Xử lý báo cáo thất bại!");
    console.error(error);
  }
};

module.exports = controller;

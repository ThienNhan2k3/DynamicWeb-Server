const {
  sequelize,
  AdsPlacement,
  Area,
  LocationType,
  AdsType,
  Report,
  ReportType,
  PermitRequest,
  BoardType,
  Board,
  LocationReport
} = require("../models");
const Sequelize = require("sequelize");

const getSipulated = async (req, res, next) => {
  const sipulated = await AdsPlacement.findAll({
    where: {
      status: "Đã quy hoạch",
    },
    include: [
      {
        model: Area,
        required: true,
      },
      {
        model: LocationType,
        required: true,
      },
      {
        model: AdsType,
        required: true,
      },
    ],
  });
  const sipulatedGeoJSON = {
    type: "FeatureCollection",
    features: [],
  };
  for (i = 0; i < sipulated.length; i++) {
    const boards = await Board.findAll({
      where: {
        adsPlacementId: sipulated[i].id,
      },
    });
    const feature = {
      type: "Feature",
      properties: {
        id: sipulated[i].id,
        area: {
          ward: sipulated[i].Area.ward,
          district: sipulated[i].Area.district,
        },
        locationType: sipulated[i].LocationType.locationType,
        adsType: sipulated[i].AdsType.type,
        address: sipulated[i].address,
        status: "Chưa quy hoạch",
        numBoard: boards.length,
      },
      geometry: {
        coordinates: [sipulated[i].long, sipulated[i].lat],
        type: "Point",
      },
    };
    sipulatedGeoJSON.features.push(feature);
  }

  res.json(JSON.stringify(sipulatedGeoJSON));
};
const getNonSipulated = async (req, res, next) => {
  const nonSipulated = await AdsPlacement.findAll({
    where: {
      status: "Chưa quy hoạch",
    },
    include: [
      {
        model: Area,
        required: true,
      },
      {
        model: LocationType,
        required: true,
      },
      {
        model: AdsType,
        required: true,
      },
    ],
  });
  const nonSipulatedGeoJSON = {
    type: "FeatureCollection",
    features: [],
  };
  for (let i = 0; i < nonSipulated.length; i++) {
    const boards = await Board.findAll({
      where: {
        adsPlacementId: nonSipulated[i].id,
      },
    });
    const feature = {
      type: "Feature",
      properties: {
        id: nonSipulated[i].id,
        area: {
          ward: nonSipulated[i].Area.ward,
          district: nonSipulated[i].Area.district,
        },
        locationType: nonSipulated[i].LocationType.locationType,
        adsType: nonSipulated[i].AdsType.type,
        address: nonSipulated[i].address,
        status: "Chưa quy hoạch",
        numBoard: boards.length,
      },
      geometry: {
        coordinates: [nonSipulated[i].long, nonSipulated[i].lat],
        type: "Point",
      },
    };
    nonSipulatedGeoJSON.features.push(feature);
  }

  res.json(JSON.stringify(nonSipulatedGeoJSON));
};

const getReport = async (req, res, next) => {
  const reported = await Report.findAll({
    where: {
      AdsPlacementId: {
        [Sequelize.Op.not]: null,
      },
      status: {
        [Sequelize.Op.not]: "Đã xử lý",
      },
    },
    include: [
      {
        model: AdsPlacement,
        required: true,
        include: [
          {
            model: Area,
            required: true,
          },
          {
            model: LocationType,
            required: true,
          },
          {
            model: AdsType,
            required: true,
          },
        ],
      },
    ],
  });

  const reportedGeoJSON = {
    type: "FeatureCollection",
    features: [],
  };
  const placement = [];
  reported.forEach((data) => {
    if (placement.indexOf(data.AdsPlacement.id) == -1) {
      placement.push(data.AdsPlacement.id);
      const feature = {
        type: "Feature",
        properties: {
          id: data.AdsPlacement.id,
          area: {
            ward: data.AdsPlacement.Area.ward,
            district: data.AdsPlacement.Area.district,
          },
          locationType: data.AdsPlacement.LocationType.locationType,
          adsType: data.AdsPlacement.AdsType.type,
          address: data.AdsPlacement.address,
          status: "Bị báo cáo",
        },
        geometry: {
          coordinates: [data.AdsPlacement.long, data.AdsPlacement.lat],
          type: "Point",
        },
      };
      reportedGeoJSON.features.push(feature);
    }
  });
  res.json(JSON.stringify(reportedGeoJSON));
};

const getAds = async (req, res, next) => {
  const placementId = req.params.placementId;
  const placement = await AdsPlacement.findByPk(placementId);
  const respondData = [];
  if (!placement) {
    return res.status(403).send({ message: "Không tìm thấy vị trí quả" });
  }
  const boards = await placement.getBoards({
    include: [
      {
        model: BoardType,
        required: true,
      },
      {
        model: AdsPlacement,
        required: true,
        include: [
          {
            model: LocationType,
            required: true,
          },
          {
            model: AdsType,
            required: true,
          },
          {
            model: Area,
            required: true,
          },
        ],
      },
    ],
  });
  for (const board of boards) {
    try {
      const permitRequest = await board.getPermitRequest();
      if (permitRequest) {
        const data = {
          ...board.dataValues,
          image: permitRequest.image,
          start: permitRequest.start,
          end: permitRequest.end,
          content: permitRequest.content,
          status: permitRequest.status,
        };
        respondData.push(data);
      } else {
        const data = {
          ...board.dataValues,
          image: "",
          start: "",
          end: "",
          content: "",
          status: "",
        };
        respondData.push(data);
      }
    } catch (err) {
      console.log(err);
    }
  }
  res.json(JSON.stringify(respondData));
};

const postReport = async (req, res, next) => {
  let { name, email, phone, type, content, board, location } = req.body;
  if (board == "undefined") {
    board = undefined;
  }
  const files = req.files;
  let imageUrl;
  const path = [];
  if (files) {
    files.forEach((file) => {
      path.push(file.path);
    });
    imageUrl = path.join(", ");
    imageUrl = imageUrl.replace(/\\/g, "/");
  }

  if (type == "TGSP") {
    type = "Tố giác sai phạm";
  } else if (type == "DKND") {
    type = "Đăng ký nội dung";
  } else if (type == "DGYK") {
    type = "Đóng góp ý kiến";
  } else if (type == "GDTM") {
    type = "Giải đáp thắc mắc";
  }
  const dbquery = await ReportType.findOne({ where: { type: type } });
  if (dbquery == null) {
    return;
  }
  const typeId = dbquery.id;

  const newReport = await Report.create({
    submission_time: new Date(),
    name: name,
    email: email,
    phone: phone,
    reportContent: content,
    image: imageUrl,
    ReportTypeId: typeId,
    BoardId: board,
    AdsPlacementId: location,
    status: "Chưa xử lý",
  });
  newReport.save();
  if (board != undefined) {
    let permitRequest = await PermitRequest.findOne({
      where: { BoardId: board },
    });
    permitRequest.status = "Bị báo cáo";
    permitRequest.save();
  }
  res.status(200).json({ newReport });
};

const getReportData = async (req, res, next) => {
  let adsPlacementId = req.query.placement;
  let boardId = req.query.board;

  let reports;

  if (boardId != "undefined") {
    boardId = parseInt(boardId);

    reports = await Report.findAll({
      where: { BoardId: boardId },
      include: [{ model: ReportType, required: true }],
    });
  } else {
    // adsPlacementId = parseInt(adsPlacementId);
    reports = await Report.findAll({
      where: { AdsPlacementId: adsPlacementId },
      include: [{ model: ReportType, required: true }],
    });
  }

  res.json(JSON.stringify(reports));
};

const postSelfReport = async (req, res) => {
  const reportIds = req.body.reportIds;
  const reports = await Report.findAll({
    where: { id: { [Sequelize.Op.in]: reportIds } },
    include: [
      { model: ReportType, required: true },
      { model: AdsPlacement, required: true },
    ],
  });
  res.json(JSON.stringify(reports));
};

const postReportRandomLocation = async (req, res) => {
  let { name, email, phone, type, content, address, lng, lat } = req.body;
  const files = req.files;
  let imageUrl;
  const path = [];
  if (files) {
    files.forEach((file) => {
      path.push(file.path);
    });
    imageUrl = path.join(", ");
    imageUrl = imageUrl.replace(/\\/g, "/");
  }

  if (type == "TGSP") {
    type = "Tố giác sai phạm";
  } else if (type == "DKND") {
    type = "Đăng ký nội dung";
  } else if (type == "DGYK") {
    type = "Đóng góp ý kiến";
  } else if (type == "GDTM") {
    type = "Giải đáp thắc mắc";
  }
  const dbquery = await ReportType.findOne({ where: { type: type } });
  if (dbquery == null) {
    return;
  }
  const typeId = dbquery.id;

  const area = await fetch(
    `https://rsapi.goong.io/Geocode?latlng=${lat},%20${lng}&api_key=7iVK3dd86pgsEJggbfiky0xOrcRa9xJMNTtX22nS`
  );
  const jsonReturn = await area.json();
  const data = jsonReturn.results;
  let ward,district
  console.log(data[0])
  if(data.length>0){
    ward=data[0].compound.commune,
    district=data[0].compound.district
  }
  if(!ward.includes("0")&&/\d/.test(ward)){
    let parts=ward.split(" ")
    ward=parts[0]+" "+"0"+parts[1]
  }
  if(!ward.includes("Phường")){
    ward="Phường "+ward
  }
  const selectedArea = await Area.findOne({
    where: {
      ward: ward.trim(),
      district: district.trim(),
    },
  });

  if(!selectedArea)
  {
    console.log(ward)
    console.log(district)
    return
  }
  const areaId=selectedArea.id
  const newReport=await LocationReport.create({
    name:name,
    email:email,
    phone:phone,
    reportContent:content,
    image:imageUrl,
    status:"Chờ xử lý",
    address:address,
    long:lng,
    lat:lat,
    AreaId:areaId,
    ReportTypeId: typeId,
  })
  await newReport.save();
  return res.status(200).json({ newReport }); 
};
module.exports = {
  getSipulated,
  getNonSipulated,
  getReport,
  getAds,
  postReport,
  getReportData,
  postSelfReport,
  postReportRandomLocation,
};

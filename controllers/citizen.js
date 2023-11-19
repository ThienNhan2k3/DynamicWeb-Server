import {
  AdsPlacement,
  Area,
  LocationType,
  AdsType,
  Report,
  ReportType,
  PermitRequest,
} from "../models/index.js";

import BoardType from "../models/boardType.js";
import Sequelize from "sequelize";

const getSipulated = async (req, res, next) => {
  const sipulated = await AdsPlacement.findAll({
    where: {
      status: "Đã quy hoạch",
      id: {
        [Sequelize.Op.notIn]: Sequelize.literal(
          "(SELECT AdsPlacementId FROM reports)"
        ),
      },
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
  sipulated.forEach((data) => {
    const feature = {
      type: "Feature",
      properties: {
        id: data.id,
        area: { ward: data.Area.ward, district: data.Area.district },
        locationType: data.LocationType.locationType,
        adsType: data.AdsType.type,
        address: data.address,
        status: "Đã quy hoạch",
      },
      geometry: {
        coordinates: [data.long, data.lat],
        type: "Point",
      },
    };
    sipulatedGeoJSON.features.push(feature);
  });

  res.json(JSON.stringify(sipulatedGeoJSON));
};
const getNonSipulated = async (req, res, next) => {
  const nonSipulated = await AdsPlacement.findAll({
    where: {
      status: "Chưa quy hoạch",
      id: {
        [Sequelize.Op.notIn]: Sequelize.literal(
          "(SELECT AdsPlacementId FROM reports)"
        ),
      },
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
  nonSipulated.forEach((data) => {
    const feature = {
      type: "Feature",
      properties: {
        id: data.id,
        area: { ward: data.Area.ward, district: data.Area.district },
        locationType: data.LocationType.locationType,
        adsType: data.AdsType.type,
        address: data.address,
        status: "Chưa quy hoạch",
      },
      geometry: {
        coordinates: [data.long, data.lat],
        type: "Point",
      },
    };
    nonSipulatedGeoJSON.features.push(feature);
  });

  res.json(JSON.stringify(nonSipulatedGeoJSON));
};

const getReport = async (req, res, next) => {
  const reported = await Report.findAll({
    where: {
      AdsPlacementId: {
        [Sequelize.Op.not]: null,
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
        ],
      },
    ],
  });
  for (const board of boards) {
    const permitRequest = await board.getPermitRequest();
    const data = {
      ...board.dataValues,
      image: permitRequest.image,
      start: permitRequest.start,
      end: permitRequest.end,
      content: permitRequest.content,
      status: permitRequest.status,
    };
    respondData.push(data);
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
    imageUrl = path.join(",");
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
    let permitRequest= await PermitRequest.findOne({ where: { BoardId: board } });
    permitRequest.status="Bị báo cáo"
    permitRequest.save()
  }
  res.status(200).json({ id: newReport.id });
};

const getReportData = async (req, res, next) => {
  const adsPlacementId = req.query.placement;
  const boardId = req.query.board;
  let reports;
  if (boardId != "undefined") {
    console.log("HEHE");
    reports = await Report.findAll({
      where: { BoardId: boardId },
      include: [{ model: ReportType, required: true }],
    });
  } else {
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

export default {
  getSipulated,
  getNonSipulated,
  getReport,
  getAds,
  postReport,
  getReportData,
  postSelfReport,
};

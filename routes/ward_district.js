const express = require('express');
const controller = require('../controllers/ward_district.js');
const title = require('../middlewares/title.js');
const router = express.Router();

router.get("/home", title.role, controller.home);
router.post("/home", title.role, controller.addPermitRequest);
router.get("/list-adsplacements", title.role, controller.showListAdsplacements);
router.post("/list-adsplacements", title.role, controller.editAdsplacement);
router.get("/list-boards/:id", title.role, controller.showListBoards);
router.post("/list-boards", title.role, controller.editBoard);
router.get("/my-requests", title.role, controller.showMyRequests);
router.post("/my-requests", controller.deleteRequest);
router.get("/list-reports", title.role, controller.showListReports);

module.exports = router;
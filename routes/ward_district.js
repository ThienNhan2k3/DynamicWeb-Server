const express = require('express');
const controller = require('../controllers/ward_district.js');
const title = require('../middlewares/title.js');
const router = express.Router();

router.get("/home", title.role, controller.home);
router.get("/list-adsplacements", title.role, controller.showListAdsplacements);
router.put("/list-adsplacements", controller.editAdsplacement);
router.get("/list-boards/:id", title.role, controller.showListBoards);

module.exports = router;
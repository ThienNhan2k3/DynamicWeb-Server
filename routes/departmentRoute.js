const express = require("express");
const controller = require("../controllers/departmentController");
const router = express.Router();

/*-------------------- AccountManagement --------------------*/
router.get("/accountManagement", controller.accountManagement);
router.get(
  "/accountManagement/api/wards",
  controller.getWardsWithSpecificDistrict
);
router.post("/accountManagement", controller.createAccount);
router.put("/accountManagement", controller.editAccount);
router.delete("/accountManagement", controller.deleteAccount);

// adplaceManagement
router.get("/adplaceManagement", controller.adplaceManagement);
router.post("/adplaceManagement", controller.createAdplace);
router.put("/adplaceManagement", controller.editAdplace);
router.delete("/adplaceManagement", controller.deleteAdplace);
// boardManagement
router.get("/boardManagement", controller.boardManagement);
router.post("/boardManagement", controller.createBoard);
/*-------------------- ViewAdsRequest --------------------*/
router.get("/viewAdsRequest", controller.viewAdsRequests);
router.get("/viewAdsRequest/:id", controller.acceptOrDenyAdsRequest);

/*-------------------- ViewAdsRequest --------------------*/
router.get("/viewReport", controller.viewReports);
router.post("/viewReport/api/statisticReport", controller.statisticReport);
router.get(
  "/viewReport/api/getWaitingAndProcessedReport",
  controller.getWaitingAndProcessedReport
);
router.get("/viewReport/:id", controller.detailReport);

// Area management
router.get("/areaManagement", controller.getAreas);
router.post("/editArea", controller.postEditArea);
router.post("/addArea", controller.postAddArea);
module.exports = router;

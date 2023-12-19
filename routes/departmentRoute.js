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
/*-------------------- ViewAdsRequest --------------------*/
router.get("/viewAdsRequest", controller.viewAdsRequest);
router.get("/viewAdsRequest/:id", controller.acceptOrDenyAdsRequest);

module.exports = router;

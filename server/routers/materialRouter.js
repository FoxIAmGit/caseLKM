const Router = require("express");
const router = new Router();

const materialController = require("../controllers/materialController");
const user = require("../middleware/userMiddleware");
const checkRole = require("../middleware/checkRoleMiddleware");

router.get("/subject", user(), materialController.getSubject);
router.post("/", user(), materialController.create);
router.get("/", user(), materialController.getAllMine);
router.get("/t", checkRole("teacher"), materialController.getStudWork);
router.get("/s", checkRole("student"), materialController.getEduWork);
router.get("/download/:id", materialController.downloadMaterial);

module.exports = router;
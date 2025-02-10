const Router = require("express");
const router = new Router();

const mainController = require("../controllers/mainController");
const user = require("../middleware/userMiddleware");

router.get("/avg", user(), mainController.getAvgRate);
router.get("/les", user(), mainController.getLessonsToday);
router.get("/ipr", user(), mainController.getipr);

module.exports = router;

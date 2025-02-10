const Router = require("express");
const router = new Router();

const timetableController = require("../controllers/timetableController");
const user = require("../middleware/userMiddleware");

router.get("/", user(), timetableController.getAllNow);
router.get("/date", user(), timetableController.getAllbyDate);
router.get("/search", user(), timetableController.getbyQuery);

module.exports = router;

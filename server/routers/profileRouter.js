const Router = require("express");
const router = new Router();

const profileControllers = require("../controllers/profileController");
const user = require("../middleware/userMiddleware");
const checkRole = require("../middleware/checkRoleMiddleware");

router.get("/", user(), profileControllers.getOne);
router.put("/", user(), profileControllers.putOne);
router.put("/resume", checkRole("student"), profileControllers.putFile);

module.exports = router;

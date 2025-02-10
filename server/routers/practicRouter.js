const Router = require("express");
const router = new Router();

const practicController = require("../controllers/practicController");
const checkRole = require("../middleware/checkRoleMiddleware");

router.post("/:id", checkRole("student"), practicController.create);
router.get("/", checkRole("student"), practicController.getAll);
router.get("/my", checkRole("student"), practicController.getMine);

module.exports = router;

const Router = require("express");
const router = new Router();

const ratingController = require("../controllers/ratingController");
const user = require("../middleware/userMiddleware");
const checkRole = require("../middleware/checkRoleMiddleware");

router.get("/", user(), ratingController.getAll);
router.put("/:id", checkRole("teacher"), ratingController.putMark);

module.exports = router;

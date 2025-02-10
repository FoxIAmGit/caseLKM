const Router = require("express");
const router = new Router();

const feedbackController = require("../controllers/feedbackController");
const user = require("../middleware/userMiddleware");

router.post("/", user(), feedbackController.create);
router.get("/", user(), feedbackController.getAll);
router.delete("/:id", user(), feedbackController.delOne);

module.exports = router;

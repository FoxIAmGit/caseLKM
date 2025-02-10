const Router = require("express");
const router = new Router();

const iprController = require("../controllers/iprController");
const user = require("../middleware/userMiddleware");

router.post("/", user(), iprController.create);
router.get("/:day", user(), iprController.getAll);
router.delete("/:id", user(), iprController.delOne);
router.put("/:id", user(), iprController.putOne);

module.exports = router;

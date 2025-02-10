const Router = require("express");
const router = new Router();

const adminController = require("../controllers/adminController");
const checkRole = require("../middleware/checkRoleMiddleware");

router.post("/faculty", checkRole("admin"), adminController.createFaculty);
router.put("/faculty/:id", checkRole("admin"), adminController.putDecan);
router.get("/faculty", checkRole("admin"), adminController.getFaculty);

router.post("/dept", checkRole("admin"), adminController.createDept);
router.put("/dept/:id", checkRole("admin"), adminController.putСhief);
router.get("/dept", checkRole("admin"), adminController.getDept);

router.post("/group", checkRole("admin"), adminController.createGroup);
router.get("/group", checkRole("admin"), adminController.getGroup);

router.post("/job", checkRole("admin"), adminController.createJob);
router.post("/vacancy", checkRole("admin"), adminController.createVacancy);

router.post("/subject", checkRole("admin"), adminController.createSubject);
router.post("/lesson", checkRole("admin"), adminController.createLesson);

module.exports = router;

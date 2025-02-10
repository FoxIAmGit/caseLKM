const Router = require("express");
const router = new Router();

const feedbackRouter = require("./feedbackRouter");
const iprRouter = require("./iprRouter");
const mainRouter = require("./mainRouter");
const materialRouter = require("./materialRouter");
const practicRouter = require("./practicRouter");
const profileRouter = require("./profileRouter");
const ratingRouter = require("./ratingRouter");
const timetableRouter = require("./timetableRouter");
const userRouter = require("./userRouter");
const adminRouter = require("./adminRouter");

router.use("/feedback", feedbackRouter);
router.use("/ipr", iprRouter);
router.use("/main", mainRouter);
router.use("/material", materialRouter);
router.use("/practic", practicRouter);
router.use("/profile", profileRouter);
router.use("/rating", ratingRouter);
router.use("/timetable", timetableRouter);
router.use("/user", userRouter);
router.use("/admin", adminRouter);

module.exports = router;

const errors = require("../errors");
const {
  Students,
  Teachers,
  Edu_plan,
  Gradebook,
  Groups,
  Users,
} = require("../models");

class ratingController {
  async getAll(req, res, next) {
    try {
      let grades; 
      switch (req.user.role) {
        case "student":
          const student = await Students.findOne({
            where: { userId: req.user.id },
          });
          
          if (!student) {
            return next(errors.badRequest("Студент не найден."));
          }
          grades = await Gradebook.findAndCountAll({
            include: [{model: Edu_plan}],
            where: { studentId: student.id }});
          break;

        case "teacher":
          const teacher = await Teachers.findOne({
            where: { userId: req.user.id },
          });
          grades = await Gradebook.findAndCountAll({
            include: [
              {
                model: Students,
                attributes: ["groupId"],
                include: [{ model: Users, attributes: ["full_name", "phone"] }],
              },
              { model: Edu_plan, where: { teacherId: teacher.id } },
            ],
          });
          break;

        default:
          return res.json(Edu_plan);
      }
      return res.json(grades);
    } catch (e) {
      next(errors.badRequest(e.message));
    }
  }

  async putMark(req, res, next) {
    try {
      const { id } = req.params;
      const { mark } = req.body;
      const updateGrade = await Gradebook.update(
        { mark: mark },
        { where: { id } },
      );
      return res.json(updateGrade);
    } catch (e) {
      next(errors.badRequest(e.message));
    }
  }
}

module.exports = new ratingController();

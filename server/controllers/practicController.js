const errors = require("../errors");
const {
  Students,
  Vacancies,
  Applications,
  Jobs,
  Companies,
} = require("../models");

class practicController {
  async create(req, res, next) {
    try {
      const student = await Students.findOne({ where: { userId: req.user.id } });
      const application = await Applications.create({
        studentId: student.id,
        vacancyId: req.params.id,
      });
      return res.json(application);
    } catch (e) {
      next(errors.badRequest(e.message));
    }
  }

  async getAll(req, res, next) {
    try {
      const id = req.user.id;
      const student = await Students.findOne({ where: {userId : id} });
      console.log(student);
      const vacancies = await Vacancies.findAndCountAll({
        include: [{ model: Jobs, include: [Companies] }],
        where: { groupId: student.groupId },  order : ["createdAt"]
      });
      
      return res.json(vacancies);
    } catch (e) {
      next(errors.badRequest(e.message));
    }
  }

  async getMine(req, res, next) {
    try {
      const student = await Students.findOne({ where: { userId: req.user.id } });
      const applications = await Applications.findAll({
        include: [
          {
            model: Vacancies,
            include: [{ model: Jobs, include: [Companies] }],
          },
        ],
        where: { studentId: student.id }, order : ["createdAt"]
      });
      return res.json(applications);
    } catch (e) {
      next(errors.badRequest(e.message));
    }
  }
}

module.exports = new practicController();

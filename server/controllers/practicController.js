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
      const student = await Students.findOne({ where: { id: req.user.id } });
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
      const student = await Students.findOne({ where: id });
      const vacancies = await Vacancies.findAndCountAll({
        include: [{ model: Jobs, include: [Companies] }],
        where: { groupId: student.groupId },
      });
      return res.json(vacancies);
    } catch (e) {
      next(errors.badRequest(e.message));
    }
  }

  async getMine(req, res, next) {
    try {
      const id = req.user.id;
      const applications = await Applications.findAndCountAll({
        include: [
          {
            model: Vacancies,
            include: [{ model: Jobs, include: [Companies] }],
          },
        ],
        where: { studentId: id },
      });
      return res.json(applications);
    } catch (e) {
      next(errors.badRequest(e.message));
    }
  }
}

module.exports = new practicController();

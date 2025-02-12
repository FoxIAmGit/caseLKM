const errors = require("../errors");
const { IPR } = require("../models");
const { Op } = require("sequelize");

class iprController {
  async create(req, res, next) {
    try {
      const { start_date, end_date, title, descript } = req.body; //2025-01-24T19:26:42.279Z
      const userId = req.user.id;
      const task = await IPR.create({
        start_date,
        end_date,
        title,
        descript,
        userId,
      });
      return res.json(task);
    } catch (e) {
      next(errors.badRequest(e.message));
    }
  }

  async getAll(req, res, next) {
    try {
      const { day } = req.params;
      // Приводим переданную дату к началу дня
      const startOfDay = new Date(day);
      startOfDay.setHours(0, 0, 0, 0);

      // Приводим переданную дату к концу дня
      const endOfDay = new Date(day);
      endOfDay.setHours(23, 59, 59, 999);
      const tasks = await IPR.findAll({
        where: {
          start_date: { [Op.lt]: startOfDay }, // Начальная дата раньше чем начало дня
          end_date: { [Op.gt]: endOfDay }, // Конечная дата позже чем конец дня
          userId: req.user.id,
        }, order : ["start_date"]
      });
      return res.json(tasks);
    } catch (e) {
      next(errors.badRequest(e.message));
    }
  }

  async delOne(req, res, next) {
    try {
      const { id } = req.params;
      const task = await IPR.destroy({ where: { id } });
      if (task) {
        return res.json("del");
      } else {
        return next(errors.badRequest("Не удалось удалить"));
      }
    } catch (e) {
      next(errors.badRequest(e.message));
    }
  }

  async putOne(req, res, next) {
    try {
      const { id } = req.params;
      const { start_date, end_date, title, descript, status } = req.body;

      const updates = {};
      if (start_date) updates.start_date = start_date;
      if (end_date) updates.end_date = end_date;
      if (title) updates.title = title;
      if (descript) updates.descript = descript;
      if (status) updates.status = status;

      await IPR.update(updates, { where: { id } });

      // Получаем обновленную запись
      const updatedTask = await IPR.findOne({ where: { id } });
      return res.json(updatedTask);
    } catch (e) {
      next(errors.badRequest(e.message));
    }
  }
}

module.exports = new iprController();

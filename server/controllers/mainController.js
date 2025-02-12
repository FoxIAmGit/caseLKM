const errors = require("../errors");
const {
  Gradebook,
  Students,
  Edu_plan,
  Teachers,
  IPR,
  Timetable,
  Users,
} = require("../models");
const { sequelize } = require("../models");
const { Op } = require("sequelize");

class mainController {
  async getAvgRate(req, res, next) {
    try {
        // Находим студента по id пользователя
        const student = await Students.findOne({ where: { userId: req.user.id } });

        // Если студент не найден, вернем ошибку
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        // Получаем средний балл
        const avg = await Gradebook.findOne({
            where: { studentId: student.id },
            attributes: [[sequelize.fn("AVG", sequelize.col("mark")), "avg_rate"]],
        });

        // Если средний балл не найден, возвращаем 0 или соответствующее сообщение
        const averageGrade = avg ? parseFloat(avg.get("avg_rate")).toFixed(1) : 0;
        
        return res.json({ avg_rate: averageGrade });
    } catch (e) {
        next(errors.badRequest(e.message));
    }
}

  async getLessonsToday(req, res, next) {
    try {
        const currentDate = new Date();
        const startOfToday = new Date(currentDate);
        startOfToday.setHours(0, 0, 0, 0); // Начало текущего дня

        const endOfToday = new Date(currentDate);
        endOfToday.setHours(23, 59, 59, 999); // Конец текущего дня

        let searchCriteria = {};
        switch (req.user.role) {
            case "student":
                const student = await Students.findOne({ where: { userId: req.user.id } });
                searchCriteria = { groupId: student.groupId };
                break;
            case "teacher":
                const teacher = await Teachers.findOne({ where: { userId: req.user.id } });
                searchCriteria = { teacherId: teacher.id };
                break;
        }

        const lessons = await Timetable.findAndCountAll({
          where: { 
            date: { [Op.between]: [startOfToday, endOfToday] } 
          },
          include: [
            {
              model: Edu_plan,
              where: searchCriteria,
              include: [
                {
                  model: Teachers,
                  include: [
                    {
                      model: Users, 
                      attributes: ['full_name'] 
                    }
                  ]
                }
              ]
            }
          ],
          order : ["num_les"]
        });
        
        return res.json({ count: lessons.count, rows: lessons.rows });
    } catch (e) {
        return next(errors.badRequest(e.message));
    }
}

  async getipr(req, res, next) {
    try {
      const day = new Date();
      // Приводим переданную дату к началу дня
      const startOfDay = new Date(day);
      startOfDay.setHours(0, 0, 0, 0);

      // Приводим переданную дату к концу дня
      const endOfDay = new Date(day);
      endOfDay.setHours(23, 59, 59, 999);
      const tasks = await IPR.findAndCountAll({
        where: {
          start_date: { [Op.lt]: startOfDay }, // Начальная дата раньше чем начало дня
          end_date: { [Op.gt]: endOfDay }, // Конечная дата позже чем конец дня
          userId: req.user.id,
        }, 
      });
      return res.json( tasks.count );
    } catch (e) {
      return next(errors.badRequest(e.message));
    }
  }
}

module.exports = new mainController();

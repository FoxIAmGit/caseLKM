const errors = require("../errors");
const { Op } = require("sequelize");
const {
  Students,
  Timetable,
  Edu_plan,
  Teachers,
  Groups,
} = require("../models");

class TimetableController {
  async getAllNow(req, res, next) {
    try {
      const id = req.user.id;
      let { page } = req.query;

      page = page || 1;

      // Получаем текущую дату
      const currentDate = new Date();
      const startOfWeek = new Date(currentDate);
      startOfWeek.setHours(0, 0, 0, 0);
      startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1); // Начало недели (понедельник)

      // Рассчитываем начало и конец недели для страницы
      const weekStartDate = new Date(startOfWeek);
      weekStartDate.setDate(weekStartDate.getDate() + (page - 1) * 7); // Скользим на количество недель

      const weekEndDate = new Date(weekStartDate);
      weekEndDate.setDate(weekStartDate.getDate() + 6); // Конец недели (воскресенье)

      const searchCriteria = {};
      switch (req.user.role) {
        case "student":
          const student = await Students.findOne({ where: { id } });
          searchCriteria = { groupId: student.groupId };
          break;
        case "teacher":
          const teacher = await Teachers.findOne({ where: { id } });
          searchCriteria = { teacherId: teacher.id };
          break;
      }

      const lessons = await Timetable.findAndCountAll({
        include: [{ model: Edu_plan, where: searchCriteria }],
        where: { date: { [Op.between]: [weekStartDate, weekEndDate] } },
      });

      return res.json(lessons);
    } catch (e) {
      return next(errors.badRequest(e.message));
    }
  }

  async getAllbyDate(req, res, next) {
    try {
      const id = req.user.id;
      const { date } = req.body; // Ожидаем, что дата будет передана в формате YYYY-MM-DD

      // Получаем указанную дату и вычисляем начало этой недели
      const targetDate = new Date(date);
      const startOfWeek = new Date(targetDate);
      startOfWeek.setHours(0, 0, 0, 0);
      startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1); // Начало недели (понедельник)

      // Применяем пагинацию на основе номера недели, которая начинается с указанной даты
      const page = 1; // Для этой функции фиксируем страницу на первой неделе
      const weekStartDate = new Date(startOfWeek);
      const weekEndDate = new Date(weekStartDate);
      weekEndDate.setDate(weekStartDate.getDate() + 6); // Конец недели (воскресенье)

      const searchCriteria = {};
      switch (req.user.role) {
        case "student":
          const student = await Students.findOne({ where: { id } });
          searchCriteria = { groupId: student.groupId };
          break;
        case "teacher":
          const teacher = await Teachers.findOne({ where: { id } });
          searchCriteria = { teacherId: teacher.id };
          break;
      }

      const lessons = await Timetable.findAndCountAll({
        include: [{ model: Edu_plan, where: searchCriteria }],
        where: { date: { [Op.gte]: weekStartDate } },
      });
      return res.json(lessons);
    } catch (e) {
      return next(errors.badRequest(e.message));
    }
  }

  async getbyQuery(req, res, next) {
    try {
      const { searchValue } = req.body;
      const { page = 1, pageSize = 7 } = req.params; // Получаем параметры поиска и пагинации
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0); // Устанавливаем время на начало дня

      const conditions = { date: { [Op.gte]: currentDate } }; // Уроки, начиная с текущей даты

      // Проверяем, является ли searchValue id преподавателя или группы
      const isTeacherId = await Teachers.findOne({
        where: { id: searchValue },
      });
      const isGroupId = await Groups.findOne({ where: { id: searchValue } });

      if (isTeacherId) {
        conditions.teacherId = searchValue; // Фильтруем по преподавателю
      } else if (isGroupId) {
        conditions.groupId = searchValue; // Фильтруем по группе
      } else {
        return res
          .status(404)
          .json({ message: "Преподаватель или группа не найдены" });
      }

      // Определяем количество записей, которые нужно пропустить для текущей страницы
      const offset = (page - 1) * pageSize;

      // Запрашиваем расписание из базы данных с учетом пагинации
      const { count, rows: lessons } = await Timetable.findAndCountAll({
        include: { Edu_plan, where: { conditions } },
        order: [["date", "ASC"]], // Сортируем по дате
        limit: pageSize,
        offset: offset,
      });

      // Возвращаем результат с пагинацией
      return res.json({
        totalItems: count,
        totalPages: Math.ceil(count / pageSize),
        currentPage: page,
        lessons: lessons,
      });
    } catch (e) {
      return next(errors.badRequest(e.message));
    }
  }
}

module.exports = new TimetableController();

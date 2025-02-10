const errors = require("../errors");
const uuid = require("uuid");
const path = require("path");

const { Materials, Edu_plan, Students, Teachers } = require("../models");
class materialController {
  async getSubject(req, res, next){
    try {
      let subjects;
      switch (req.user.role) {
        case 'student':
          subjects = await Edu_plan.findAll({
            include: [{ model: Students, 
              where: { userId: req.user.id } }],
          });
          break;
        case 'teacher':
          subjects = await Edu_plan.findAll({
            include: [{ model: Teachers, 
              where: { userId: req.user.id } }],
          });
        break;
        default:
          break;
      }
      
      return res.json(subjects);
    } catch (e) {
      next(errors.badRequest(e.message));
    }
  }
  async create(req, res, next) {
    try {
      const userId = req.user.id;
      const { title, type_work, descript, semester, subjectId } = req.body;
      const { file } = req.files;

      if (!file) {
        // Проверка наличия файла
        return next(errors.badRequest({ message: "Загрузите файл!" }));
      }

      // Генерация имени файла
      const name_file = uuid.v4() + path.extname(file.name); // Используем оригинальное расширение файла
      const title_file = file.name;

      // Перемещение файла
      await file.mv(path.resolve(__dirname, "..", "static", name_file));
      console.log(title, type_work, descript, semester, subjectId)
      // Создание устройства в базе данных
      const material = await Materials.create({
        title,
        title_file,
        name_file,
        type_work,
        descript,
        semester,
        subjectId,
        userId,
      });
      
      return res.json(material); // Возврат созданного устройства
    } catch (e) {
      next(errors.badRequest(e.message));
    }
  }

  async getAllMine(req, res, next) {
    try {
      const userId = req.user.id;
      const maretials = await Materials.findAndCountAll({
        where: { userId: userId },
      });
      return res.json(maretials);
    } catch (e) {
      next(errors.badRequest(e.message));
    }
  }

  async getStudWork(req, res, next) {
    try {
      const userId = req.user.id;
      const maretials = await Materials.findAndCountAll({
        include: [{ model: Edu_plan, where: { teacherId: userId } }],
      });
      return res.json(maretials);
    } catch (e) {
      next(errors.badRequest(e.message));
    }
  }

  async getEduWork(req, res, next) {
    try {
      const student = await Students.findOne({ where: req.user.id });
      const maretials = await Materials.findAndCountAll({
        include: [{ model: Edu_plan, where: { groupId: student.groupId } }],
      });
      return res.json(maretials);
    } catch (e) {
      next(errors.badRequest(e.message));
    }
  }
}

module.exports = new materialController();
const errors = require("../errors");
const uuid = require("uuid");
const path = require("path");
const { Op } = require('sequelize');

const { Materials, Edu_plan, Students, Teachers, Groups } = require("../models");
class materialController {
  async getSubject(req, res, next){
    try {
      let subjects;
      switch (req.user.role) {
        case 'student':
          subjects = await Edu_plan.findAll({
            include: [{
              model: Groups,
              include: [{
                model: Students,
                where: { userId: req.user.id },
              }],
            }],
            order : ["name"]
          });
          break;
        case 'teacher':
          subjects = await Edu_plan.findAll({
            include: [{ model: Teachers, 
              where: { userId: req.user.id } }],  order : ["name"]
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
        return next(errors.badRequest({ message: "Загрузите файл!" }));
      }

      const name_file = uuid.v4() + path.extname(file.name); 
      const title_file = file.name;

      await file.mv(path.resolve(__dirname, "..", "static", name_file));
      console.log(title, type_work, descript, semester, subjectId)
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
      
      return res.json(material); 
    } catch (e) {
      next(errors.badRequest(e.message));
    }
  }

  async getAllMine(req, res, next) {
    try {
      const userId = req.user.id;
      const maretials = await Materials.findAndCountAll({
        include : Edu_plan,
        where: { userId: userId },  order : ["createdAt"]
      });
      return res.json(maretials);
    } catch (e) {
      next(errors.badRequest(e.message));
    }
  }

  async getStudWork(req, res, next) {
    try {
      const teacher = await Teachers.findOne({ where: {userId : req.user.id }});
      const maretials = await Materials.findAll({
        include: [{ model: Edu_plan, where: { teacherId: teacher.id } }],
        where: { userId: { [Op.ne]: req.user.id }},  order : ["createdAt"]
      });
      
      return res.json(maretials);
    } catch (e) {
      next(errors.badRequest(e.message));
    }
  }

  async getEduWork(req, res, next) {
    try {
      const student = await Students.findOne({ where: {userId : req.user.id }});
      const maretials = await Materials.findAll({
        include: [{ model: Edu_plan, where: { groupId: student.groupId } }],
        where: { userId: { [Op.ne]: req.user.id }},  order : ["createdAt"]
      });
      return res.json(maretials);
    } catch (e) {
      next(errors.badRequest(e.message));
    }
  } 
}

module.exports = new materialController();
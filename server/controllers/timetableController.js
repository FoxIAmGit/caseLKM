
const errors = require("../errors");
const { Op } = require("sequelize");
const {
  Students,
  Timetable,
  Edu_plan,
  Teachers,
  Groups,
  Users,
} = require("../models");

class TimetableController {
  async getAllNow(req, res, next) {
    try {
      const id = req.user.id;
      let { page } = req.query;
      page = page || 1;

      const currentDate = new Date();
      const startOfWeek = new Date(currentDate);
      startOfWeek.setHours(0, 0, 0, 0);
      startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1); 

      const weekStartDate = new Date(startOfWeek);
      weekStartDate.setDate(weekStartDate.getDate() + (page - 1) * 7); 

      const weekEndDate = new Date(weekStartDate);
      weekEndDate.setDate(weekStartDate.getDate() + 6); 

      let searchCriteria = {};
      switch (req.user.role) {
        case "student":
          const student = await Students.findOne({ where: { userId : req.user.id } });
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
        order : ["num_les"]
      });

      return res.json(lessons);
    } catch (e) {
      return next(errors.badRequest(e.message));
    }
  }

  async getAllbyDate(req, res, next) {
    try {
      const { page } = req.body || 1; 
      
      const targetDate = new Date();
      const startOfWeek = new Date(targetDate);
      startOfWeek.setHours(0, 0, 0, 0);
      startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1); 

      const weekStartDate = new Date(startOfWeek);
      const weekEndDate = new Date(weekStartDate);
      weekEndDate.setDate(weekStartDate.getDate() + 6); 
      
      let searchCriteria = {};
      switch (req.user.role) {
        case "student":
          const student = await Students.findOne({ where: { userId : req.user.id } });
          searchCriteria = { groupId: student.groupId };
          break;
        case "teacher":
          const teacher = await Teachers.findOne({ where: { userId : req.user.id } });
          searchCriteria = { teacherId: teacher.id };
          break;
      }

      const lessons = await Timetable.findAndCountAll({
        include: [{ model: Edu_plan, where: searchCriteria }],
        where: { date: { [Op.gte]: weekStartDate } },
        order : ["num_les"]
      });
      return res.json(lessons);
    } catch (e) {
      return next(errors.badRequest(e.message));
    }
  }

  async getbyQuery(req, res, next) {
    try {
      const { searchValue } = req.body;
      const { page = 1, pageSize = 7 } = req.params;
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0); 

      const conditions = { date: { [Op.gte]: currentDate } }; 

      const isTeacherId = await Teachers.findOne({
        where: { id: searchValue },
      });
      const isGroupId = await Groups.findOne({ where: { id: searchValue } });

      if (isTeacherId) {
        conditions.teacherId = searchValue; 
      } else if (isGroupId) {
        conditions.groupId = searchValue; 
      } else {
        return res
          .status(404)
          .json({ message: "Преподаватель или группа не найдены" });
      }

      const offset = (page - 1) * pageSize;

      const { count, rows: lessons } = await Timetable.findAndCountAll({
        include: { Edu_plan, where: { conditions } },
        order: [["date", "ASC"]], 
        limit: pageSize,
        offset: offset,
      });

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

  async getAll(req, res, next) {
    try {
      const { searchText } = req.body;
      let { page } = req.body;
      page = page
      let searchCipher, searchTeacher
      console.log(searchText);
      
      const groupRegex = /^[А-Яа-яЁё]{3,4}-\d{2}-\d{2}$/;

      if (groupRegex.test(searchText)) {
          searchCipher = searchText;
          console.log("Найдено название группы:", searchCipher);
      } else {
          searchTeacher = searchText;
          console.log("Найдено ФИО преподавателя:", searchTeacher);
      }

      const currentDate = new Date();
      const startOfWeek = new Date(currentDate);
      startOfWeek.setHours(0, 0, 0, 0);
      startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1); 

      const weekStartDate = new Date(startOfWeek);
      weekStartDate.setDate(weekStartDate.getDate() + (page - 1) * 7); 

      const weekEndDate = new Date(weekStartDate);
      weekEndDate.setDate(weekStartDate.getDate() + 6); 
      
      let searchCriteria = {};

      if(searchTeacher && !searchCipher){
        const teacher = await Teachers.findOne({
          include : Users, 
          where: { "$user.full_name$" : searchTeacher }
        });
          
        searchCriteria = { teacherId: teacher.id };
      }
      if(searchCipher && !searchTeacher){
        const group = await Groups.findOne(
          { where: { cipher : searchCipher } });
        searchCriteria = { groupId: group.id };
      }
      
      if(!searchTeacher && !searchCipher){
        switch (req.user.role) {
          case "student":
            const student = await Students.findOne({ where: { userId : req.user.id } });
            searchCriteria = { groupId: student.groupId };
            break;
          case "teacher":
            const teacher = await Teachers.findOne({ where: { userId : req.user.id } });
            searchCriteria = { teacherId: teacher.id };
            break;
        }
      }

      const lessons = await Timetable.findAll({
        include: [
          {
            model: Edu_plan,
            include: [
                {
                    model: Teachers,
                    include: [Users] // Убедитесь, что ассоциации между Teachers и Users настроены
                }
            ],
            where: searchCriteria // Убедитесь, что searchCriteria корректно определен
        },
        ],
        where: { date: { [Op.between]: [weekStartDate, weekEndDate]} },
        
        order : ["num_les"]
      });

      let arrayLessons = [];
      for (let i =0;i<lessons.length;i++){
        const subject = {
          id: lessons[i].id,
          name: lessons[i].subject.name,
          cabinet: lessons[i].cabinet,
          num_les: lessons[i].num_les,
          teacher: lessons[i].subject.teacher.user.full_name
        }
        if(!arrayLessons[lessons[i].date.getDay()]){
          arrayLessons[lessons[i].date.getDay()]=[];
        }
        arrayLessons[lessons[i].date.getDay()].push(subject)
        
      }
      return res.json(arrayLessons);
    } catch (e) {
      return next(errors.badRequest(e.message));
    }
  }
}

module.exports = new TimetableController();
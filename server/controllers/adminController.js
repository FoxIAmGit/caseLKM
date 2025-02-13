const errors = require("../errors");

const {
  Faculties,
  Teachers,
  Departments,
  Users,
  Groups,
  Companies,
  Jobs,
  Vacancies,
  Edu_plan,
  Timetable,
} = require("../models");

class adminController {
  async createFaculty(req, res, next) {
    try {
      const { cipher, full_name } = req.body;
      const faculty = await Faculties.create({ cipher, full_name });
      return res.json(faculty);
    } catch (e) {
      next(errors.badRequest(e.message));
    }
  }

  async putDecan(req, res, next) {
    try {
      const id = req.params;
      const { full_name } = req.body;
           
      const teacher = await Teachers.findOne(
        { where: { "$user.full_name$":full_name },
         include: {model: Users, required: true}        
        }, 
      );
      if (!teacher) {
        return next(errors.badRequest("Такого преподавателя нет"));
      }
      const faculty = await Faculties.update(
        { teacherId: teacher.id },
        { where: id },
      );
      return res.json(faculty);
    } catch (e) {
      next(errors.badRequest(e.message));
    }
  }

  async getFaculty(req, res, next) {
    try {
        const faculties = await Faculties.findAll({
            include: [
                {
                    model: Teachers,
                    include: [
                        {
                            model: Users,
                            attributes: ['full_name'], 
                            as: 'user', 
                        }
                    ],
                    attributes: ['id'], 
                    as: 'teacher', 
                }
            ],
        });

        if (!faculties || faculties.length === 0) {
            return next(errors.badRequest("Факультеты еще не созданы"));
        }
        
        const formattedFaculties = faculties.map(faculty => {
            return {
                id: faculty.id, 
                cipher: faculty.cipher, 
                full_name: faculty.full_name,
                teach_names: faculty.teacher.user.full_name
            };
        });
        return res.json(formattedFaculties);
    } catch (e) {
        next(errors.badRequest(e.message));
    }
}

  async createDept(req, res, next) {
    try {
      const { name, cipher } = req.body;
      const faculty = await Faculties.findOne({ where: cipher });
      if (!faculty) {
        return next(errors.badRequest("Такого факультета нет"));
      }
      const dept = await Departments.create({ name, facultyId: faculty.id });
      return res.json(dept);
    } catch (e) {
      next(errors.badRequest(e.message));
    }
  }

  async putСhief(req, res, next) {
    try {
      const id = req.params;
      const { full_name } = req.body;
      const teacher = await Teachers.findOne(
        { include: Users },
        { where: full_name },
      );
      if (!teacher) {
        return next(errors.badRequest("Такого преподавателя нет"));
      }
      const dept = await Departments.update(
        { teacherId: teacher.id },
        { where: id },
      );
      return res.json(dept);
    } catch (e) {
      next(errors.badRequest(e.message));
    }
  }

  async getDept(req, res, next) {
    try {
      const departments = await Departments.findAll({
        include: [
            {
                model: Faculties,
                attributes: ['cipher'],
                as: 'faculty',
            },
            {
                model: Teachers,
                include: [
                    {
                        model: Users,
                        attributes: ['full_name'],
                        as: 'user', 
                    }
                ],
                attributes: ['id'],
                as: 'teacher',
            }
        ], order : ["name"]
    });


        if (!departments || departments.length === 0) {
            return next(errors.badRequest("Кафедры еще не созданы"));
        }

        const formattedDepartments = departments.map(department => {
            return {
                id: department.id,
                name: department.name, 
                fac_cipher: department.faculty ? department.faculty.cipher : null, 
                teach_name: department.teacher ? department.teacher.user.full_name : null
            };
        });

        return res.json(formattedDepartments);
    } catch (e) {
        next(errors.badRequest(e.message));
    }
}

  async createGroup(req, res, next) {
    try {
      const { cipher, name, start_year, total_sem, faculty_cipher } = req.body;
      const faculty = await Faculties.findOne({
        where: { cipher: faculty_cipher },
      });
      if (!faculty) {
        return next(errors.badRequest("Такого факультета нет"));
      }
      const group = await Groups.create({
        cipher,
        name,
        start_year,
        total_sem,
        facultyId: faculty.id,
      });
      return res.json(group);
    } catch (e) {
      next(errors.badRequest(e.message));
    }
  }

  async getGroup(req, res, next) {
    try {
      const groups = await Groups.findAll({include: Faculties}, {order : ["cipher"]});
      if (!groups) {
        return next(errors.badRequest("Группы еще не созданы"));
      }
      return res.json(groups);
    } catch (e) {
      next(errors.badRequest(e.message));
    }
  }

  async createJob(req, res, next) {
    try {
      const { title, descript, company_name } = req.body;
      const company = await Companies.findOne({
        where: { name: company_name },
      });
      if (!company) {
        const new_company = await Companies.create({ name: company_name });
        const job = await Jobs.create({
          title,
          descript,
          companyId: new_company.id,
        });
        return res.json(job);
      }
      const job = await Jobs.create({ title, descript, companyId: company.id });
      return res.json(job);
    } catch (e) {
      next(errors.badRequest(e.message));
    }
  }

  async createVacancy(req, res, next) {
    try {
      const { start_date, end_date, title, name, cipher } = req.body;
      const job = await Jobs.findOne({
        include: [{ model: Companies, where: { name: name } }],
        where: { title: title },
      });
      const group = await Groups.findOne({ where: { cipher: cipher } });

      if (!job) {
        return next(errors.badRequest("Такой должности не существует"));
      }
      if (!group) {
        return next(errors.badRequest("Такой группы не существует"));
      }

      const vacancy = await Vacancies.create({
        start_date,
        end_date,
        jobId: job.id,
        groupId: group.id,
      });
      return res.json(vacancy);
    } catch (e) {
      next(errors.badRequest(e.message));
    }
  }

  async createSubject(req, res, next) {
    try {
      const { name, type_exam, date_exam, semester, hours, full_name, cipher } =
        req.body;
      const teacher = await Teachers.findOne({
        include: [{ model: Users, where: { full_name: full_name } }],
      });
      const group = await Groups.findOne({ where: { cipher: cipher } });

      if (!teacher) {
        return next(errors.badRequest("Такого преподавателя не существует"));
      }
      if (!group) {
        return next(errors.badRequest("Такой группы не существует"));
      }

      const subject = await Edu_plan.create({
        name,
        type_exam,
        date_exam,
        semester,
        hours,
        teacherId: teacher.id,
        groupId: group.id,
      });
      return res.json(subject);
    } catch (e) {
      next(errors.badRequest(e.message));
    }
  }

  async createLesson(req, res, next) {
    try {
      const { num_les, cabinet, date, name, cipher } = req.body;
      const group = await Groups.findOne({
        where: { cipher: cipher },
      });

      if (!group) {
        return next(errors.badRequest("Группа не найдена."));
      }

      const subject = await Edu_plan.findOne({
        where: { name: name, groupId: group.id },
      });

      if (!subject) {
        return next(errors.badRequest("Предмет не найден"));
      }

      const lesson = await Timetable.create({
        num_les,
        cabinet,
        date,
        subjectId: subject.id,
      });

      return res.json(lesson);
    } catch (e) {
      next(errors.badRequest(e.message));
    }
  }
}

module.exports = new adminController();
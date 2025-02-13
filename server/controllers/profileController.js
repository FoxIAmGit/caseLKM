const errors = require("../errors");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const path = require("path");

const {
  Users,
  Students,
  Groups,
  Faculties,
  Departments,
  Teachers,
} = require("../models");

class profileController {
  async getOne(req, res, next) {
    try {
      const id = req.user.id;
      
      switch (req.user.role) {
        case "student":
          const student = await Students.findOne({ 
            include: [{ model: Groups, include: [Faculties] }],
            where: { "$student.userId$": id },
          });
          return res.json( student );

        case "teacher":
          const teacher = await Teachers.findOne(
            { include: [{ model: Departments, include: [Faculties] }] },
            { where: { "$teacher.userId$": id } },
          );
          return res.json(teacher );

        default:
          const user = await Users.findOne({ where: { id } });
          return res.json( user );
      }
    } catch (e) {
      next(errors.badRequest(e.message));
    }
  }

  async putOne(req, res, next) {
    try {
      const id = req.user.id;
      const { email, phone, password } = req.body;

      const updates = {};
      if (email) updates.email = email;
      if (phone) updates.phone = phone;
      if (password) {
        updates.password = await bcrypt.hash(password, 5);
      } 

      if (await Users.update(updates, { where: { id } })) {
        const updatedRecord = await Users.findOne({ where: { id } });
        return res.json(updatedRecord);
      }
      return next(errors.badRequest(e.message));
    } catch (e) {
      next(errors.badRequest(e.message));
    }
  }

  async putFile(req, res) {
    try {
      const id = req.user.id;
      const { file } = req.files;

      if (!file) {
        return next(errors.badRequest({ message: "Загрузите файл!" }));
      }

      const name_file = uuid.v4() + path.extname(file.name);
      await file.mv(path.resolve(__dirname, "..", "static", name_file));

      const student = await Students.update(
        { resume: name_file },
        { where: { userId: id } },
      );

      return res.json(student); 
    } catch (e) {
      next(errors.badRequest(e.message));
    }
  }
}

module.exports = new profileController();

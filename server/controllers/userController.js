const errors = require("../errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

const { Users, Students, Teachers, Groups, Departments } = require("../models");

const generateJWT = (id, email, phone, role) => {
  return jwt.sign({ id, email, phone, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

class userController {
  async registration(req, res, next) {
    try {
      const { email, phone, password, role, full_name, belonging } = req.body;

      // Проверка существующего пользователя по email или телефону
      const findUser = await Users.findOne({
        where: { [Op.or]: [{ email }, { phone }] },
      });

      if (findUser) {
        return next(
          errors.badRequest("Пользователь с таким логином уже существует!"),
        );
      }

      // Хеширование пароля
      const hashPassword = await bcrypt.hash(password, 5);
      // Создание нового пользователя
      const user = await Users.create({
        email,
        phone,
        full_name,
        role,
        password: hashPassword,
      });
      const token = generateJWT(user.id, user.email, user.phone, user.role);

      switch (role) {
        case "student":
          const group = await Groups.findOne({ where: { cipher: belonging } });
          if (!group) {
            await Users.destroy({ where: { id: user.id } });
            return next(errors.badRequest("Такой группы не существует!"));
          }
          await Students.create({ userId: user.id, groupId: group.id });
          break;

        case "teacher":
          const dept = await Departments.findOne({
            where: { name: belonging },
          });
          if (!dept) {
            await Users.destroy({ where: { id: user.id } });
            return next(errors.badRequest("Такой кафедры не существует!"));
          }
          await Teachers.create({ userId: user.id, departmentId: dept.id });
          break;

        case "admin":
          break;
      }

      // Возврат токена
      return res.json({ token });
    } catch (e) {
      return next(
        errors.badRequest(
          "Произошла ошибка при регистрации. Пожалуйста, попробуйте снова.",
        ),
      );
    }
  }

  async login(req, res, next) {
    const { login, password } = req.body;

    let searchCriteria = {};

    // Регулярные выражения для проверки
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex =
      /^(\+7|8)\s*[\(]?\d{3}[\)]?\s*\d{3}[-\s]?\d{2}[-\s]?\d{2}$/;

    if (emailRegex.test(login)) {
      // Если это email
      searchCriteria = { email: login };
    } else if (phoneRegex.test(login)) {
      // Если это телефон
      searchCriteria = { phone: login };
    } else {
      return next(
        errors.badRequest(
          "Некорректный логин. Пожалуйста, введите email или номер телефона.",
        ),
      );
    }

    const finduser = await Users.findOne({ where: searchCriteria });

    if (!finduser) {
      return next(errors.internal("Пользователь не найден"));
    }

    let comparePassword = bcrypt.compareSync(password, finduser.password);
    if (!comparePassword) {
      return next(errors.internal("Неверный пароль"));
    }

    const token = generateJWT(
      finduser.id,
      finduser.email,
      finduser.phone,
      finduser.role,
    );
    return res.json({user:{
      id:finduser.id,
      role:finduser.role,
      name: finduser.full_name
      },
      token: token
    });
  }

  async check(req, res, next) {
    const token = generateJWT(
      req.user.id,
      req.user.email,
      req.user.phone,
      req.user.role,
    );
    return res.json({ token: token });
  }
}

module.exports = new userController();

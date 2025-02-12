const sequelize = require("./db");
const { DataTypes } = require("sequelize");

const Jobs = sequelize.define("job", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING },
  descript: { type: DataTypes.STRING },
  location: { type: DataTypes.STRING },
});

const Companies = sequelize.define("company", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
});

const Faculties = sequelize.define("faculty", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  full_name: { type: DataTypes.STRING },
  cipher: { type: DataTypes.STRING },
});

const Vacancies = sequelize.define("vacancy", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  start_date: { type: DataTypes.DATE },
  end_date: { type: DataTypes.DATE },
});

const Groups = sequelize.define("group", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  cipher: { type: DataTypes.STRING },
  name: { type: DataTypes.STRING },
  start_year: { type: DataTypes.INTEGER },
  total_sem: { type: DataTypes.INTEGER },
});

const Departments = sequelize.define("department", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
});

const Teachers = sequelize.define("teacher", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Applications = sequelize.define("application", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Students = sequelize.define("student", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  resume: { type: DataTypes.STRING },
});

const Edu_plan = sequelize.define("subject", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  type_exam: { type: DataTypes.STRING },
  date_exam: { type: DataTypes.DATE },
  semester: { type: DataTypes.INTEGER },
  hours: { type: DataTypes.INTEGER },
});

const Gradebook = sequelize.define("grade", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  mark: { type: DataTypes.INTEGER },
});

const Materials = sequelize.define("material", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title_file: { type: DataTypes.STRING },
  name_file: { type: DataTypes.STRING },
  type_work: { type: DataTypes.STRING },
  descript: { type: DataTypes.STRING },
  semester: { type: DataTypes.INTEGER },
});

const Timetable = sequelize.define("lesson", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  num_les: { type: DataTypes.INTEGER },
  cabinet: { type: DataTypes.STRING },
  date: { type: DataTypes.DATE },
});

const Users = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING },
  phone: { type: DataTypes.STRING },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING },
  full_name: { type: DataTypes.STRING },
});

const IPR = sequelize.define("task", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  start_date: { type: DataTypes.DATE },
  end_date: { type: DataTypes.DATE },
  title: { type: DataTypes.STRING },
  descript: { type: DataTypes.STRING },
  status: { type: DataTypes.BOOLEAN, defaultValue: false },
});

const Feedback = sequelize.define("review", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING },
  message: { type: DataTypes.STRING },
});

Companies.hasMany(Jobs);

Jobs.hasMany(Vacancies);
Jobs.belongsTo(Companies);

Vacancies.hasMany(Applications);
Vacancies.belongsTo(Jobs);
Vacancies.belongsTo(Groups);

Applications.belongsTo(Vacancies);
Applications.belongsTo(Students);

Faculties.hasMany(Groups);
Faculties.hasMany(Departments);
Faculties.belongsTo(Teachers);

Departments.belongsTo(Faculties);
Departments.belongsTo(Teachers);

Teachers.hasMany(Edu_plan);
Teachers.hasMany(Departments);
Teachers.hasOne(Faculties);
Teachers.hasOne(Departments);
Teachers.belongsTo(Departments);
Teachers.belongsTo(Users);

Users.hasMany(Materials);
Users.hasMany(IPR);
Users.hasMany(Feedback);
Users.hasOne(Teachers);
Users.hasOne(Students);

Students.hasMany(Gradebook);
Students.hasMany(Applications);
Students.belongsTo(Groups);
Students.belongsTo(Users);

Groups.hasMany(Students);
Groups.hasMany(Vacancies);
Groups.belongsTo(Faculties);
Groups.hasMany(Edu_plan);

Edu_plan.hasMany(Gradebook);
Edu_plan.hasMany(Materials);
Edu_plan.hasMany(Timetable);
Edu_plan.belongsTo(Groups);
Edu_plan.belongsTo(Teachers);

Gradebook.belongsTo(Students);
Gradebook.belongsTo(Edu_plan);

Materials.belongsTo(Users);
Materials.belongsTo(Edu_plan);

Timetable.belongsTo(Edu_plan);

IPR.belongsTo(Users);

Feedback.belongsTo(Users);

module.exports = {
  sequelize,
  Jobs,
  Companies,
  Faculties,
  Vacancies,
  Groups,
  Departments,
  Teachers,
  Applications,
  Students,
  Edu_plan,
  Gradebook,
  Materials,
  Timetable,
  Users,
  IPR,
  Feedback,
};

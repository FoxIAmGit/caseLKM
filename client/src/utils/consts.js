export const ADMIN_ROUTE = "/admin";
export const LOGIN_ROUTE = "/login";
export const REGISTRATION = "/registration";
export const FEEDBACK = "/feedback";
export const GRADEBOOK = "/gradebook";
export const IPR = "/ipr";
export const MAIN = "/main";
export const MATERIALS = "/materials";
export const PRACTIC = "/practic";
export const PROFILE = "/profile";
export const TIMETABLE = "/timetable";
export const ZERO = "/";

export const menuItems = [
  { eventKey: "1", label: "Главная страница", path: MAIN },
  { eventKey: "2", label: "Расписание", path: TIMETABLE },
  { eventKey: "3", label: "Успеваемость", path: GRADEBOOK },
  { eventKey: "4", label: "Учебные материалы", path: MATERIALS },
  { eventKey: "5", label: "Практика", path: PRACTIC },
  { eventKey: "6", label: "ИПР", path: IPR },
  { eventKey: "7", label: "Обратная связь", path: FEEDBACK },
  { eventKey: "8", label: "Профиль", path: PROFILE },
];

export const cardFields = [
  { title: "Средний балл", value: "4,5" },
  { title: "Пар сегодня", value: "3" },
  { title: "Изученно материалов", value: "12" },
];

export const scheduleData = [
  {
    pairNumber: "1",
    subject: "Математика",
    teacher: "Иванов И.И.",
    time: "09:00 - 10:30",
    room: "101",
    type: "practic",
  },
  {
    pairNumber: "2",
    subject: "Физика",
    teacher: "Петров П.П.",
    time: "11:00 - 12:30",
    room: "102",
    type: "lecia",
  },
  {
    pairNumber: "3",
    subject: "Информатика",
    teacher: "Сидоров С.С.",
    time: "13:00 - 14:30",
    room: "203",
    type: "practic",
  },
];

export const feedbackData = [
  {
    id: "1",
    title: "Субботние пары",
    message: "Можно не первыми?",
  },
  {
    id: "2",
    title: "Очные пары",
    message: "Зачем так поздно?",
  },
  {
    id: "3",
    title: "Экономика",
    message: "Зачем программисту?",
  },
];

export const gradebookData = [
  {
    subject: "Математика",
    teacher: "Иванов И.И.",
    type: "экзамен",
    mark: "5",
  },
  {
    subject: "Физика",
    teacher: "Петров П.П.",
    type: "диф. зачет",
    mark: "5",
  },
  {
    subject: "Информатика",
    teacher: "Сидоров С.С.",
    type: "зачет",
    mark: "зачет",
  },
];

export const iprData = [
  {
    start_date: "22.03.2025",
    end_date: "22.05.2025",
    title: "Субботние пары",
    descript: "Можно не первыми?",
  },
  {
    start_date: "11.03.2025",
    end_date: "03.11.2025",
    title: "Субботние пары",
    descript: "Можно не первыми?",
  },
  {
    start_date: "02.02.2025",
    end_date: "22.03.2025",
    title: "Субботние пары",
    descript: "Можно не первыми?",
  },
];

export const materialsData = [
  {
    subject: "Математика",
    type_work: "Лекция",
    descript: "изучить до 12.01",
    semester: "5",
    file: "Базы данных.pdf",
  },
  {
    subject: "Информатика",
    type_work: "Практика",
    descript: "сделать 1-2 упражнение",
    semester: "4",
    file: "Операционные системы.docx",
  },
  {
    subject: "Физика",
    type_work: "Лекция",
    descript: "для экзамена",
    semester: "4",
    file: "Список вопросов.docx",
  },
];

export const subjectsData = [
  {
    id: 1,
    name: "Математика",
  },
  {
    id: 2,
    name: "Информатика",
  },
  {
    id: 3,
    name: "Физика",
  },
];

export const semesterData = [
  { num: 1 },
  { num: 2 },
  { num: 3 },
  { num: 4 },
  { num: 5 },
  { num: 6 },
  { num: 7 },
  { num: 8 },
];

export const typeWorkData = [
  { type: "отчет" },
  { type: "практика" },
  { type: "лабораторная работа" },
];

export const vacanciesData = [
  {
    company: "Пятерочка",
    job: "Уборщик",
    location: "Питер",
    duration: "2 месяца",
    descript: "Убирать шваброй",
  },
  {
    company: "Перекресток",
    job: "Кассир",
    location: "Москва",
    duration: "3 дня",
    descript: "Не ругаться",
  },
  {
    company: "Красное&Белое",
    job: "Директор",
    location: "Нью-Йорк",
    duration: "1 год",
    descript: "Просто жить",
  },
];

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

export const menuItemsStudent = [
  { eventKey: "1", label: "Главная страница", path: MAIN },
  { eventKey: "2", label: "Расписание", path: TIMETABLE },
  { eventKey: "3", label: "Успеваемость", path: GRADEBOOK },
  { eventKey: "4", label: "Учебные материалы", path: MATERIALS },
  { eventKey: "5", label: "Практика", path: PRACTIC },
  { eventKey: "6", label: "ИПР", path: IPR },
  { eventKey: "7", label: "Обратная связь", path: FEEDBACK },
  { eventKey: "8", label: "Профиль", path: PROFILE },
];

export const menuItemsTeacher = [
  { eventKey: "1", label: "Главная страница", path: MAIN },
  { eventKey: "2", label: "Расписание", path: TIMETABLE },
  { eventKey: "4", label: "Учебные материалы", path: MATERIALS },
  { eventKey: "5", label: "ИПР", path: IPR },
  { eventKey: "6", label: "Обратная связь", path: FEEDBACK },
  { eventKey: "7", label: "Профиль", path: PROFILE },
];

export const menuItemsAdmin = [
  { eventKey: "1", label: "Админ", path: ADMIN_ROUTE },
  { eventKey: "2", label: "Расписание", path: TIMETABLE },
  { eventKey: "3", label: "Профиль", path: PROFILE },
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

import React, { useState } from "react";
import "./css/Calendar.css"; // Импортируем стили

// Массив с названиями месяцев
const months = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

// Функция для получения количества дней в месяце
const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

// Основной компонент Календаря
const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  // Функция для смены месяца
  const changeMonth = (delta) => {
    const newMonth = currentMonth + delta;
    if (newMonth < 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else if (newMonth > 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(newMonth);
    }
  };

  // Получаем количество дней и первый день месяца
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();

  // Создаем массив дней для отображения
  const days = [...Array(daysInMonth).keys()].map((day) => day + 1);

  return (
    <div className="calendar-container">
      <h2 className="calendar-header">
        {months[currentMonth]} {currentYear}
      </h2>
      <div className="button-container">
        <button className="calendar-button" onClick={() => changeMonth(-1)}>
          Предыдущий месяц
        </button>
        <button className="calendar-button" onClick={() => changeMonth(1)}>
          Следующий месяц
        </button>
      </div>
      <div className="calendar-grid">
        {/* Заголовки дней недели */}
        {["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"].map((day) => (
          <div key={day} className="day-header">
            <strong>{day}</strong>
          </div>
        ))}
        {/* Пустые ячейки для выравнивания первого дня месяца */}
        {Array.from({ length: firstDay }).map((_, index) => (
          <div key={index} className="empty-cell"></div>
        ))}
        {/* Отображаем дни месяца */}
        {days.map((day) => (
          <div key={day} className="day-cell">
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;

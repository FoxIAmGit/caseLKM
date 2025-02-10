import React, { useState } from "react";
import "../components/css/Timetable.css";

const sampleSchedule = [
  {
    day: "Понедельник",
    classes: [
      { time: "09:00 - 10:30", subject: "Математика", teacher: "Иванов И.И." },
      { time: "10:45 - 12:15", subject: "Физика", teacher: "Петров П.П." },
    ],
  },
  {
    day: "Вторник",
    classes: [
      { time: "09:00 - 10:30", subject: "Химия", teacher: "Сидоров С.С." },
      { time: "10:45 - 12:15", subject: "История", teacher: "Васечкин В.В." },
    ],
  },
];

const Schedule = () => {
  const [currentWeek, setCurrentWeek] = useState(0);
  const [searchText, setSearchText] = useState("");

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const filteredSchedule = sampleSchedule.map((day) => ({
    ...day,
    classes: day.classes.filter(
      (cls) =>
        cls.subject.toLowerCase().includes(searchText.toLowerCase()) ||
        cls.teacher.toLowerCase().includes(searchText.toLowerCase()),
    ),
  }));

  const previousWeek = () => {
    setCurrentWeek(currentWeek - 1);
  };

  const nextWeek = () => {
    setCurrentWeek(currentWeek + 1);
  };

  return (
    <div className="schedule-container">
      <h1 className="schedule-title">Расписание пар</h1>

      <input
        type="text"
        value={searchText}
        onChange={handleSearch}
        placeholder="Поиск по предмету или преподавателю"
        className="search-input"
      />

      <div className="navigation-buttons">
        <button className="week-button" onClick={previousWeek}>
          Предыдущая неделя
        </button>
        <button className="week-button" onClick={nextWeek}>
          Следующая неделя
        </button>
      </div>

      <div className="schedule-list">
        {filteredSchedule.map((day) => (
          <div key={day.day} className="day-container">
            <h2 className="day-title">{day.day}</h2>
            {day.classes.length > 0 ? (
              <ul className="class-list">
                {day.classes.map((cls, index) => (
                  <li key={index} className="class-item">
                    {cls.time} - {cls.subject} (Преподаватель: {cls.teacher})
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-classes">Нет пар в этот день.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;

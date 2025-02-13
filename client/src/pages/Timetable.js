import React, { useCallback, useEffect, useState } from 'react';
import {
    Card,
    Col,
    Row,
  } from "react-bootstrap";
import {getAll} from '../http/authAPI'; 
import "../components/css/Timetable.css";

const pairTimes = {
    1: "8:45 - 10:20",
    2: "10:30 - 12:05",
    3: "12:15 - 13:50",
    4: "14:35 - 16:10",
    5: "16:20 - 17:55",
    6: "18:05 - 19:40",
    7: "19:50 - 21:15",
};

const pairDay = {
    1: "Понедельник",
    2: "Вторник",
    3: "Среда",
    4: "Четверг",
    5: "Пятница",
    6: "Суббота",
    7: "Воскресенье",
};

const Schedule = () => {
  const [currentWeek, setCurrentWeek] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [schedule, setSchedule] = useState([]); 

  const fetchSchedule = useCallback(async () => {
    try {
        console.log(currentWeek);
        const data = await getAll(currentWeek + 1, searchText);
        console.log('Fetched data:', data);
        setSchedule(data);
    } catch (error) {
        console.error('Error fetching schedule:', error);
        setSchedule([]);
    }
    }, [currentWeek, searchText]); 

    useEffect(() => {
        fetchSchedule();
    }, [fetchSchedule]);

  const handleSearch = (e) => {
      setSearchText(e.target.value);
  };

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
              <button className="week-button" key={"prev"} onClick={previousWeek}>
                  Предыдущая неделя
              </button>
              <button className="week-button" key={"next"} onClick={nextWeek}>
                  Следующая неделя
              </button>
          </div>

          <div className="schedule-list">
        
            {schedule.map((day, index) => (day ?
                <Card key={index} className="day-container">
                    <h2 className="day-title">{pairDay[index + 1]}</h2>
                        <ul className="class-list">
                            {day.map((les, lessonIndex) => (
                                <li key={lessonIndex} className="class-item">
                                    <Row>
                                    <Col md={1} className="pair-number">
                                          <strong>{les.num_les}</strong>
                                      </Col>
                                      <Col md={5}>
                                          <div className="subject">{les.name}</div>
                                          <div className="teacher">{les.teacher}</div>
                                      </Col>
                                      <Col md={6} className="time-room">
                                          <div>{pairTimes[les.num_les] || "Время не указано"}</div>
                                          <div>{les.cabinet}</div>
                                      </Col>
                                    </Row>
                                </li>
                            ))}
                        </ul>
                </Card>:null
            ))}
          </div>
      </div>
  );
};

export default Schedule;
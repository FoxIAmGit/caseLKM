import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Row, Card } from "react-bootstrap";
import { Context } from "../index";
import {
  fetchAvgRate,
  fetchLessonsToday,
  fetchCountLessonsToday,
  fetchGoalsToday,
} from "../http/authAPI";
import "../components/css/Main.css";

const pairTimes = {
  1: "8:45 - 10:20",
  2: "10:30 - 12:05",
  3: "12:15 - 13:50",
  4: "14:35 - 16:10",
  5: "16:20 - 17:55",
  6: "18:05 - 19:40",
  7: "19:50 - 21:15",
};

const Main = () => {
  const { user } = useContext(Context);
  const [averageScore, setAverageScore] = useState(0);
  const [lessonCount, setLessonCount] = useState(0);
  const [goalCount, setGoalCount] = useState(0);
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user._user.role === "student") {
          const avg = await fetchAvgRate();
          if (avg !== "NaN") {
            setAverageScore(avg);
          } else {
            setAverageScore(0);
          }
        }
        const goals = await fetchGoalsToday();
        setGoalCount(goals ? goals : 0);

        const lessonsCount = await fetchCountLessonsToday();
        setLessonCount(lessonsCount.count);

        const scheduleData = await fetchLessonsToday();
        setSchedule(scheduleData.rows || []);
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container fluid className="main-container">
      <div className="welcome-message">
        <h3>Добро пожаловать!</h3>
      </div>

      <Row>
        <Col md={3}>
          <div className="card-columns">
            {user._user.role === "student" && (
              <Card className="info-card mb-3">
                <Card.Body>
                  <Card.Title className="text-center">Средний балл</Card.Title>
                  <Card.Text className="value-text">{averageScore}</Card.Text>
                </Card.Body>
              </Card>
            )}
            <Card className="info-card mb-3">
              <Card.Body>
                <Card.Title className="text-center">
                  Количество уроков
                </Card.Title>
                <Card.Text className="value-text">{lessonCount}</Card.Text>
              </Card.Body>
            </Card>
            <Card className="info-card mb-3">
              <Card.Body>
                <Card.Title className="text-center">
                  Количество целей
                </Card.Title>
                <Card.Text className="value-text">{goalCount}</Card.Text>
              </Card.Body>
            </Card>
          </div>
        </Col>
        <Col md={9}>
          <Card className="schedule-card justify-content-between align-items-center">
            <Card.Body>
              <Card.Title className="text-center">
                <h3>Расписание на сегодня</h3>
              </Card.Title>
            </Card.Body>
            {Array.isArray(schedule) && schedule.length > 0 ? (
              schedule.map((pair) => (
                <Card key={pair.id} className="schedule-item mb-1">
                  <Card.Body>
                    <Row>
                      <Col md={1} className="pair-number">
                        <strong>{pair.num_les}</strong>
                      </Col>
                      <Col md={5}>
                        <div className="subject">{pair.subject.name}</div>
                        <div className="teacher">
                          {pair.subject.teacher.user.full_name}
                        </div>
                      </Col>
                      <Col md={6} className="time-room">
                        <div>
                          {pairTimes[pair.num_les] || "Время не указано"}
                        </div>
                        <div>{pair.cabinet}</div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              ))
            ) : (
              <Card className="no-schedule">
                <Card.Body>
                  <p>Нет уроков на сегодня.</p>
                </Card.Body>
              </Card>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Main;

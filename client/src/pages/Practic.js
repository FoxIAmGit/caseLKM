import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Container, Nav, Row } from "react-bootstrap";
import { Context } from "../index";
import "../components/css/Practic.css";
import {
  fetchAllVacancies,
  fetchMyVacancies,
  applyForVacancy,
} from "../http/authAPI";

export default function Practic() {
  const { user } = useContext(Context);
  const [allVacancies, setAllVacancies] = useState([]);
  const [myVacancies, setMyVacancies] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allVacan = await fetchAllVacancies();
        setAllVacancies(allVacan || []);
        const myVacan = await fetchMyVacancies();
        setMyVacancies(myVacan || []);
      } catch (e) {
        alert("Ошибка при получении данных: " + e.message);
      }
    };

    fetchData();
  }, [user]);

  const handleApply = async (vacancyId) => {
    try {
      await applyForVacancy(vacancyId);
      alert("Вы успешно откликнулись на вакансию!");
    } catch (e) {
      alert("Ошибка при отклике на вакансию: " + e.message);
    }
  };

  return (
    <Container className="practic-container">
      <h1 className="header-title">Практика</h1>
      <Nav variant="tabs">
        <Nav.Item>
          <Nav.Link
            className={currentCategory === "all" ? "active" : ""}
            onClick={() => setCurrentCategory("all")}
          >
            Все вакансии
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            className={currentCategory === "mine" ? "active" : ""}
            onClick={() => setCurrentCategory("mine")}
          >
            Мои заявки
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <Row>
        {currentCategory === "all"
          ? allVacancies.map((field) => (
              <Col md={4} className="practic-col mb-3 mt-3" key={field.id}>
                <Card className="practic-card">
                  <Card.Body>
                    <h5 className="practic-job">{field.job.title}</h5>
                    <p className="practic-company">
                      <strong>Компания:</strong>
                      <p>{field.job.company.name}</p>
                    </p>
                    <p className="practic-location">
                      <strong>Локация:</strong>
                      <p>{field.job.location}</p>
                    </p>
                    <p className="practic-duration">
                      <strong>Длительность:</strong>
                      <p>{`с ${field.start_date.slice(0, 10)} по ${field.end_date.slice(0, 10)}`}</p>
                    </p>
                    <p className="practic-description">
                      <strong>Описание:</strong>
                      <p>{field.job.descript}</p>
                    </p>
                    <Button
                      variant="outline-success"
                      className="practic-button"
                      onClick={() => handleApply(field.id)}
                    >
                      Откликнуться
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          : myVacancies.map((field) => (
              <Col md={4} className="practic-col mb-3 mt-3" key={field.id}>
                <Card className="practic-card">
                  <Card.Body>
                    <h5 className="practic-job">{field.vacancy.job.title}</h5>
                    <p className="practic-company">
                      <strong>Компания:</strong>
                      <p>{field.vacancy.job.company.name}</p>
                    </p>
                    <p className="practic-location">
                      <strong>Локация:</strong>
                      <p>{field.vacancy.job.location}</p>
                    </p>
                    <p className="practic-duration">
                      <strong>Длительность:</strong>
                      <p>{`с ${field.vacancy.start_date.slice(0, 10)} по ${field.vacancy.end_date.slice(0, 10)}`}</p>
                    </p>
                    <p className="practic-description">
                      <strong>Описание:</strong>
                      <p>{field.vacancy.job.descript}</p>
                    </p>
                    <p>
                      <i>Откликнулся: {`${field.createdAt.slice(0, 10)}`}</i>
                    </p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
      </Row>
    </Container>
  );
}

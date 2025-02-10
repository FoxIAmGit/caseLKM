import React, { useEffect, useState } from "react";
import {
  Card,
  Col,
  Container,
  Row,
  Spinner,
  Alert,
} from "react-bootstrap";
import { fetchGrades } from "../http/authAPI";

export default function Gradebook() {
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getGrades = async () => {
      try {
        const data = await fetchGrades();
        setGrades(data.rows);
        
      } catch (err) {
        setError(
          err.response
            ? err.response.data.message
            : "Ошибка при загрузке оценок",
        );
      } finally {
        setLoading(false);
      }
    };

    getGrades();
  }, []);

  if (loading) {
    return (
      <Container className="my-5 d-flex justify-content-center">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  const averageGrade = grades.length
    ? (
        grades.reduce((sum, field) => sum + field.mark, 0) / grades.length
      ).toFixed(2)
    : 0;

  return (
    <Container className="my-5">
      <h1 className="text-center mb-3">Успеваемость</h1>

      <Card className="text-center shadow-sm mb-3">
        <Row className="mb-3 justify-content-between align-items-center">
          <Col>
            <Card.Title
              className="mb-0"
              style={{
                fontWeight: "bold",
                fontSize: "1.5rem",
              }}
            >
              Средний балл
            </Card.Title>
          </Col>
          <Col>
            <Card.Body
              className="mt-0"
              style={{
                fontWeight: "bold",
                fontSize: "3.5rem",
              }}
            >
              {averageGrade}
            </Card.Body>
          </Col>
        </Row>
      </Card>

      <Card className="shadow-sm">
        <Card.Body>
          {grades.length === 0 ? (
            <Alert variant="info">Нет оценок для отображения.</Alert>
          ) : (
            grades.map((field) => (
              <Row key={field.id} className="mb-2">
                <Col md={9}>{field.subject.name}</Col>
                <Col md={2} className="fw-bold">{field.subject.type_exam}</Col>
                <Col md={1}>{field.mark}</Col>
              </Row>
            ))
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

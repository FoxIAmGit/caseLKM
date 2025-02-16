import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import { createVacancies, fetchVacancy } from "../../http/adminAPI";

export default function CreateVacancyModal() {
  const [vacancies, setVacancies] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [cipher, setCipher] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const getVacancy = async () => {
      try {
        const data = await fetchVacancy();
        setVacancies(data);
      } catch (err) {
        alert(err.response?.data?.message || "Ошибка при загрузке групп");
      } finally {
        setLoading(false);
      }
    };

    getVacancy();
  }, []);

  const handleSave = async () => {
    if (!startDate || !endDate || !title || !name || !cipher) {
      setError("Все поля должны быть заполнены");
      return;
    }

    setError("");
    setLoading(true);
    try {
      await createVacancies({
        start_date: startDate,
        end_date: endDate,
        title,
        name,
        cipher,
      });
    } catch (e) {
      alert(
        e.response ? e.response.data.message : "Ошибка при добавлении вакансии",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mb-3 p-1 justify-content-between">
      <h3 className="mb-3">Добавить новую вакансию</h3>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Дата начала</Form.Label>
          <Form.Control
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            autoFocus
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Дата окончания</Form.Label>
          <Form.Control
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Название вакансии</Form.Label>
          <Form.Control
            type="text"
            placeholder="Название вакансии"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Название компании</Form.Label>
          <Form.Control
            type="text"
            placeholder="Название"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Шифр</Form.Label>
          <Form.Control
            type="text"
            placeholder="Шифр"
            value={cipher}
            onChange={(e) => setCipher(e.target.value)}
          />
          {error && <div className="text-danger">{error}</div>}
        </Form.Group>
        <Button
          variant="primary"
          onClick={handleSave}
          disabled={loading}
          className="mb-3"
        >
          Сохранить
          {loading && <Spinner animation="border" size="sm" />}
        </Button>
      </Form>

      {vacancies.map((vacItem) => (
        <Card
          key={vacItem.id}
          data-id={vacItem.id}
          className="mb-3 justify-content-between"
        >
          <Card.Body className="ml-3 justify-content-between">
            <Row className="mb-3">
              <h2>{vacItem.job.title}</h2>
            </Row>
            <Row>
              <Col md={4}>{vacItem.job.location}</Col>
              <Col md={4}>
                {`c ${vacItem.start_date.split("T")[0]} по ${vacItem.end_date.split("T")[0]}`}
              </Col>
              <Col md={4}>{vacItem.group.cipher}</Col>
            </Row>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
}

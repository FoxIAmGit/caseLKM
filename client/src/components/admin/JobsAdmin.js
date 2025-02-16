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
import { createJob, fetchJob } from "../../http/adminAPI";

export default function CreateJobModal() {
  const [jobs, setJobs] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [company_name, setcompany_name] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const getJob = async () => {
      try {
        const data = await fetchJob();
        setJobs(data);
      } catch (err) {
        alert(err.response?.data?.message || "Ошибка при загрузке групп");
      } finally {
        setLoading(false);
      }
    };

    getJob();
  }, []);

  const handleSave = async () => {
    if (!title || !description || !company_name) {
      setError("Все поля должны быть заполнены");
      return;
    }

    setError("");
    setLoading(true);
    try {
      await createJob({ title, description, company_name: company_name });
    } catch (e) {
      alert(
        e.response
          ? e.response.data.message
          : "Ошибка при добавлении должности",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mb-3 p-1 justify-content-between">
      <h3 className="mb-3">Добавить новую должность</h3>
      <Form>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Название должности"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Описание должности"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Название компании"
            value={company_name}
            onChange={(e) => setcompany_name(e.target.value)}
          />
          {error && <div className="text-danger">{error}</div>}
        </Form.Group>
        <Button
          variant="primary"
          onClick={handleSave}
          disabled={loading}
          className="mb-3"
        >
          Добавить
          {loading && <Spinner animation="border" size="sm" />}
        </Button>
      </Form>

      {jobs.map((jItem) => (
        <Card
          key={jItem.id}
          data-id={jItem.id}
          className="mb-3 justify-content-between"
        >
          <Card.Body className="ml-3 justify-content-between">
            <Row className="mb-3">
              <h2>{jItem.title}</h2>
            </Row>
            <Row className="mb-3">
              <Col md={4}>{jItem.location}</Col>
              <Col md={4}>{jItem.company.name}</Col>
            </Row>
            <Row>{jItem.descript}</Row>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
}

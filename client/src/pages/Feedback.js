import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Container,
  Form,
  Row,
  Col,
  Spinner,
  Alert,
} from "react-bootstrap";
import { fetchFeedback, createFeedback, deleteFeedback } from "../http/authAPI";
import Contact from "../components/Contact";

export default function Feedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getFeedbacks = async () => {
      try {
        const data = await fetchFeedback();
        setFeedbacks(data.rows);
      } catch (err) {
        setError(
          err.response
            ? err.response.data.message
            : "Ошибка при загрузке отзывов",
        );
      } finally {
        setLoading(false);
      }
    };

    getFeedbacks();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newFeedback = { title, message };
      const createdFeedback = await createFeedback(newFeedback);
      setFeedbacks((prevFeedbacks) => [...prevFeedbacks, createdFeedback]);
      setTitle("");
      setMessage("");
    } catch (err) {
      setError(
        err.response ? err.response.data.message : "Ошибка при создании отзыва",
      );
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteFeedback(id);
      setFeedbacks((prevFeedbacks) =>
        prevFeedbacks.filter((feedback) => feedback.id !== id),
      );
    } catch (err) {
      setError(
        err.response ? err.response.data.message : "Ошибка при удалении отзыва",
      );
    }
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Обратная связь</h1>
      <Row className="mb-4 align-items-center">
        <Col md={6}>
          <Contact />
        </Col>
        <Col md={6}>
          <Card className="p-4 shadow-sm">
            <Card.Title className="text-center">Отправить сообщение</Card.Title>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Control
                  placeholder="Тема сообщения"
                  className="mb-3"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Ваше сообщение"
                  className="mb-3"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" className="w-100" type="submit">
                Отправить
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
      <Card className="p-4 shadow-sm">
        <Card.Title className="font-weight-bold text-center m-0 mb-3">
          <h3>Отправленные отзывы</h3>
        </Card.Title>
        {feedbacks.length === 0 ? (
          <Alert variant="info">Нет отзывов для отображения.</Alert>
        ) : (
          feedbacks.map((feedback) => (
            <Card key={feedback.id} className="mb-3">
              <Card.Body>
                <Card.Title>{feedback.title}</Card.Title>
                <Row>
                  <Col>
                    <Card.Text>{feedback.message}</Card.Text>
                    <Card.Subtitle className="mt-1 text-muted">{`Создано: ${feedback.createdAt.split("T")[0]}`}</Card.Subtitle>
                  </Col>
                  <Col>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(feedback.id)}
                    >
                      Удалить
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))
        )}
      </Card>
    </Container>
  );
}

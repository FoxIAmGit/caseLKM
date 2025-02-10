import React, { useState } from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { createVacancies } from "../../http/adminAPI";

export default function CreateVacancyModal({ show, onHide }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [cipher, setCipher] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      onHide();
    } catch (e) {
      alert(
        e.response ? e.response.data.message : "Ошибка при добавлении вакансии",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Создать новую вакансию</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
            <Form.Label>Имя</Form.Label>
            <Form.Control
              type="text"
              placeholder="Имя"
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
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Отменить
        </Button>
        <Button variant="primary" onClick={handleSave} disabled={loading}>
          Сохранить
          {loading && <Spinner animation="border" size="sm" />}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

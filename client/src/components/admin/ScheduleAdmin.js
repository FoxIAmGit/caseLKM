import React, { useState } from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { createSchedule } from "../../http/adminAPI";

export default function CreateScheduleModal({ show, onHide }) {
  const [numLes, setNumLes] = useState("");
  const [cabinet, setCabinet] = useState("");
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [cipher, setCipher] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    if (!numLes || !cabinet || !date || !name || !cipher) {
      setError("Все поля должны быть заполнены");
      return;
    }

    setError("");
    setLoading(true);
    try {
      await createSchedule({ num_les: numLes, cabinet, date, name, cipher });
      onHide();
    } catch (e) {
      alert(
        e.response ? e.response.data.message : "Ошибка при добавлении урока",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Создать новый урок</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Номер урока</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите номер урока"
              value={numLes}
              onChange={(e) => setNumLes(e.target.value)}
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Кабинет</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите номер кабинета"
              value={cabinet}
              onChange={(e) => setCabinet(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Дата</Form.Label>
            <Form.Control
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Название урока</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите название урока"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Шифр</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите шифр"
              value={cipher}
              onChange={(e) => setCipher(e.target.value)}
            />
          </Form.Group>
          {error && <div className="text-danger">{error}</div>}
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

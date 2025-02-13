import React, { useState } from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { createJob } from "../../http/adminAPI";

export default function CreateJobModal({ show, onHide }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [company_name, setcompany_name] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    if (!title || !description || !company_name) {
      setError("Все поля должны быть заполнены");
      return;
    }

    setError("");
    setLoading(true);
    try {
      await createJob({ title, description, company_name: company_name });
      onHide();
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
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Создать новую должность</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
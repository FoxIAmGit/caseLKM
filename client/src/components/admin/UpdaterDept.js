import React, { useState } from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { putChief } from "../../http/adminAPI";

export default function UpdaterDept({ id, show, onHide }) {
  const [full_name, setChief] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const hiding = async () => {
    setTimeout(() => onHide(), 100);
  };

  const handleSave = async () => {
    if (!full_name) {
      setError("Поле не должно быть пустым");
      return;
    }

    setError("");
    setLoading(true);
    putChief(id, full_name)
      .then(() => onHide())
      .catch((e) => {
        alert(e.response ? e.response.data.message : "Ошибка при входе");
      })
      .finally(() => setLoading(false));
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Введите данные</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control
              type="text"
              placeholder="Имя, Отчество, Фамилия"
              value={full_name}
              onChange={(e) => setChief(e.target.value)}
              autoFocus
            />
            {error && <div className="text-danger">{error}</div>}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={hiding}>
          Отменить
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Сохранить
          {loading ? <Spinner animation="border" size="sm" /> : ""}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
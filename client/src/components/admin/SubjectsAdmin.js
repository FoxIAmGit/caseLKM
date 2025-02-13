import React, { useState } from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { createSubject } from "../../http/adminAPI";

export default function CreateSubjectModal({ show, onHide }) {
  const [name, setName] = useState("");
  const [typeExam, setTypeExam] = useState("");
  const [dateExam, setDateExam] = useState("");
  const [semester, setSemester] = useState("");
  const [hours, setHours] = useState("");
  const [fullName, setFullName] = useState("");
  const [cipher, setCipher] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    if (
      !name ||
      !typeExam ||
      !dateExam ||
      !semester ||
      !hours ||
      !fullName ||
      !cipher
    ) {
      setError("Все поля должны быть заполнены");
      return;
    }

    setError("");
    setLoading(true);
    try {
      await createSubject({
        name,
        type_exam: typeExam,
        date_exam: dateExam,
        semester,
        hours,
        full_name: fullName,
        cipher,
      });
      onHide();
    } catch (e) {
      alert(
        e.response ? e.response.data.message : "Ошибка при добавлении предмета",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Создать новый предмет</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Название предмета</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите название предмета"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Тип экзамена</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите тип экзамена"
              value={typeExam}
              onChange={(e) => setTypeExam(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Дата экзамена</Form.Label>
            <Form.Control
              type="date"
              value={dateExam}
              onChange={(e) => setDateExam(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Семестр</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите семестр"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Часы</Form.Label>
            <Form.Control
              type="number"
              placeholder="Введите количество часов"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Полное имя</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите полное имя"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
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
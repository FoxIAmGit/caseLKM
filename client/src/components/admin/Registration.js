import React, { useState } from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { createUser } from "../../http/adminAPI"; // Импортируем функцию для создания пользователя

export default function CreateUserModal({ show, onHide }) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Роль");
  const [full_name, setFull_name] = useState("");
  const [belonging, setBelonging] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    if (!email || !phone || !password || !role || !full_name ) {
      setError("Все поля должны быть заполнены");
      return;
    }

    setError("");
    setLoading(true);
    try {
      await createUser(email, phone, password, role, full_name, belonging);
      onHide();
    } catch (e) {
      setError(
        e.response ? e.response.data.message : "Ошибка при создании пользователя"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Создать пользователя</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
        <Form.Group className="mb-3">
            <Form.Label>ФИО</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите ФИО"
              value={full_name}
              onChange={(e) => setFull_name(e.target.value)}
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Введите email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Номер телефона</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Введите номер телефона"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Пароль</Form.Label>
            <Form.Control
              type="password"
              placeholder="Введите пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Роль</Form.Label>
            <Form.Control
              as="select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="Роль" disabled>Выберите роль</option>
              <option value="student">Студент</option>
              <option value="teacher">Преподаватель</option>
              <option value="admin">Админ</option>
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Принадлежность</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите принадлежность"
              value={belonging}
              onChange={(e) => setBelonging(e.target.value)}
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
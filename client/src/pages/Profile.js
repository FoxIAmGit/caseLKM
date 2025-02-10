import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import photo from "../image/лого_юзер.png";
import "../components/css/Profile.css";

export default function Profile() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Container className="profile-container">
      <h1 className="profile-title">Профиль</h1>
      <Row className="profile-row">
        <Col>
          <Card className="profile-card">
            <Card.Body>
              <Card.Title align="center">Личная информация</Card.Title>
              <Card.Text>
                <Row className="justify-content-between align-items-center">
                  <Col md={4}>
                    <img
                      src={photo}
                      alt="Пользователь"
                      className="profile-photo"
                    />
                  </Col>
                  <Col md={8} align="center">
                    <h2>Фамилия</h2>
                    <h2>Имя</h2>
                    <h2>Отчество</h2>
                    <p>Студент 3-ого курса</p>
                  </Col>
                </Row>
              </Card.Text>
            </Card.Body>

            <Button variant="outline-success" onClick={handleShow}>
              Изменить
            </Button>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Данные для входа</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Control
                      type="email"
                      placeholder="Введите email"
                      autoFocus
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formPhone">
                    <Form.Control type="text" placeholder="Введите номер" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Control
                      type="password"
                      placeholder="Введите пароль"
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Отменить
                </Button>
                <Button variant="primary" onClick={handleClose}>
                  Сохранить
                </Button>
              </Modal.Footer>
            </Modal>
          </Card>
        </Col>
        <Col>
          <Card className="profile-card">
            <Card.Body>
              <Card.Title align="center">Информация об обучении</Card.Title>
              <Card.Text align="center">
                <p>
                  <strong>Студенческий билет:</strong>
                </p>
                <p>12345</p>
                <p>
                  <strong>Факультет:</strong>
                </p>
                <p>Факультет информационных технологий</p>
                <p>
                  <strong>Специальность:</strong>
                </p>
                <p>Программная инженерия</p>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Card className="profile-card">
        <Card.Body>
          <Card.Title align="center">Контактная информация</Card.Title>
          <Card.Text>
            <Row className="pl-5 pr-5 justify-content-between align-items-center">
              <p>
                <strong>Email:</strong> support@university.edu
              </p>
              <p>
                <strong>Номер телефона:</strong> 8 (999) 123-45-67
              </p>
            </Row>
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}

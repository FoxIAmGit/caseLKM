import React, { useContext, useEffect, useState } from "react";
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
import { addResumeUser, fetchUser, updateUser } from "../http/authAPI";
import { Context } from "..";

export default function Profile() {
  const { user } = useContext(Context);
  const [stud, setStudent] = useState({});
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [email, setEmail] = useState(user._user.email || "");
  const [phone, setPhone] = useState(user._user.phone || "");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUser();
        setStudent(data);
      } catch (e) {
        alert("Ошибка при получении данных: " + e.message);
      }
    };
    fetchData();
  }, []);

  const handleUploadResume = async () => {
    if (resumeFile) {
      try {
        await addResumeUser(resumeFile);
        alert("Резюме успешно загружено!");
        setShowResumeModal(false);
        setResumeFile(null);
      } catch (error) {
        alert("Ошибка при загрузке резюме: " + error.message);
      }
    } else {
      alert("Пожалуйста, выберите файл.");
    }
  };

  const handleUpdateProfile = async () => {
    try {
      await updateUser(email, phone, password);
      alert("Данные обновлены!");
      setShowUploadModal(false);
    } catch (error) {
      alert("Ошибка при загрузке резюме: " + error.message);
    }
  };

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
                    {user._user && user._user.name ? (
                      user._user.name
                        .split(" ")
                        .map((name, index) => <h2 key={index}>{name}</h2>)
                    ) : (
                      <h2>Имя пользователя не указано</h2>
                    )}
                  </Col>
                </Row>
              </Card.Text>
            </Card.Body>
            <Button
              variant="outline-success"
              onClick={() => setShowUploadModal(true)}
            >
              Изменить
            </Button>

            <Modal
              show={showUploadModal}
              onHide={() => setShowUploadModal(false)}
            >
              <Modal.Header closeButton>
                <Modal.Title>Редактировать профиль</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group controlId="formPhone">
                    <Form.Label>Телефон</Form.Label>
                    <Form.Control
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group controlId="formPassword">
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => setShowUploadModal(false)}
                >
                  Закрыть
                </Button>
                <Button variant="primary" onClick={handleUpdateProfile}>
                  Сохранить изменения
                </Button>
              </Modal.Footer>
            </Modal>
          </Card>
        </Col>
        <Col>
          {user._user && user._user.role === "student" ? (
            <Card className="profile-card">
              <Card.Body>
                <Card.Title align="center">Сведения о движении</Card.Title>
                <Card.Text align="center">
                  <Row className="mb-3 d-flex justify-content-between align-items-center">
                    <Col md={4}>
                      <strong>Студенческий билет:</strong>
                    </Col>
                    <Col md={8}>{stud.id || "Не указан"}</Col>
                  </Row>
                  <Row className="mb-3 d-flex justify-content-between align-items-center">
                    <Col md={4}>
                      <strong>Факультет:</strong>
                    </Col>
                    <Col md={8}>
                      {stud.group?.faculty?.full_name || "Факультет не указан"}
                    </Col>
                  </Row>
                  <Row className="d-flex justify-content-between align-items-center">
                    <Col md={4}>
                      <strong>Специальность:</strong>
                    </Col>
                    <Col md={8}>
                      {stud.group?.name || "Специальность не указана"}
                    </Col>
                  </Row>
                </Card.Text>
              </Card.Body>
              <Button
                variant="outline-success"
                onClick={() => setShowResumeModal(true)}
              >
                {stud.resume ? "Обновить резюме" : "Добавить резюме"}
              </Button>

              <Modal
                show={showResumeModal}
                onHide={() => setShowResumeModal(false)}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Загрузить резюме</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group controlId="formFile">
                      <Form.Label>Выберите файл резюме</Form.Label>
                      <Form.Control
                        className="p-1"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => {
                          if (e.target.files && e.target.files.length > 0) {
                            setResumeFile(e.target.files[0]);
                          } else {
                            alert("Пожалуйста, выберите файл.");
                          }
                        }}
                      />
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={() => setShowResumeModal(false)}
                  >
                    Отменить
                  </Button>
                  <Button variant="primary" onClick={handleUploadResume}>
                    Загрузить
                  </Button>
                </Modal.Footer>
              </Modal>
            </Card>
          ) : (
            <Card className="profile-card">
              <Card.Body>
                <Card.Title align="center">Сведения о движении</Card.Title>
                <Card.Text align="center">
                  <Row className="mb-3 d-flex justify-content-between align-items-center">
                    <Col md={4}>
                      <strong>Факультет:</strong>
                    </Col>
                    <Col md={8}>
                      {stud.departments?.length > 0
                        ? stud.departments[0]?.faculty?.full_name ||
                          "Факультет не указан"
                        : "Факультет не указан"}
                    </Col>
                  </Row>
                  <Row className="d-flex justify-content-between align-items-center">
                    <Col md={4}>
                      <strong>Кафедра:</strong>
                    </Col>
                    <Col md={8}>
                      {stud.departments?.length > 0
                        ? stud.departments[0]?.name || "Кафедра не указана"
                        : "Кафедра не указана"}
                    </Col>
                  </Row>
                </Card.Text>
              </Card.Body>
            </Card>
          )}
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

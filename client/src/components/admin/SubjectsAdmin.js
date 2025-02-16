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
import { createSubject, fetchSubject } from "../../http/adminAPI";

export default function CreateSubjectModal() {
  const [subjects, setSubjects] = useState([]);
  const [name, setName] = useState("");
  const [typeExam, setTypeExam] = useState("");
  const [dateExam, setDateExam] = useState("");
  const [semester, setSemester] = useState("");
  const [hours, setHours] = useState("");
  const [fullName, setFullName] = useState("");
  const [cipher, setCipher] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const getVacancy = async () => {
      try {
        const data = await fetchSubject();
        setSubjects(data);
      } catch (err) {
        alert(err.response?.data?.message || "Ошибка при загрузке групп");
      } finally {
        setLoading(false);
      }
    };

    getVacancy();
  }, []);

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
    } catch (e) {
      alert(
        e.response ? e.response.data.message : "Ошибка при добавлении предмета",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mb-3 p-1 justify-content-between">
      <h3 className="mb-3">Добавить новый предмет</h3>
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
          <Form.Label>ФИО преподавателя</Form.Label>
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
        <Button
          className="mb-3"
          variant="primary"
          onClick={handleSave}
          disabled={loading}
        >
          Сохранить
          {loading && <Spinner animation="border" size="sm" />}
        </Button>
      </Form>

      {subjects.map((subItem) => (
        <Card
          key={subItem.id}
          data-id={subItem.id}
          className="mb-3 justify-content-between"
        >
          <Card.Body className="ml-3 justify-content-between">
            <Row className="mb-3">
              <h2>{subItem.name}</h2>
            </Row>
            <Row className="mb-3">
              <Col md={4}>
                <i>{subItem.type_exam}</i>
                <i>{` ${subItem.date_exam.split("T")[0]}`}</i>
              </Col>
              <Col md={4}>{`${subItem.hours} часов`}</Col>
            </Row>
            <Row>
              <Col>
                <b>{subItem.teacher.user.full_name}</b>
              </Col>
              <Col>
                <b>{subItem.group.cipher}</b>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
}

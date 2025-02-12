// IPR.js
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Nav, Row } from "react-bootstrap";
import Calendar from "../components/Calendar";
import { fetchTasks, createTask, updateTask, deleteTask } from "../http/authAPI"; 

export default function Ipr() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    id: null,
    start_date: "",
    end_date: "",
    title: "",
    descript: "",
    status: "false",
  });
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  useEffect(() => {
    fetchTasksData();
  }, [selectedDate]); // Загружаем задачи при изменении выбранной даты

  const fetchTasksData = async () => {
    try {
      const data = await fetchTasks(selectedDate); // Используем функцию для получения задач для выбранной даты.
      setTasks(data);
    } catch (error) {
      console.error("Ошибка при получении задач:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (newTask.id) {
        await updateTask(newTask);
      } else {
        await createTask(newTask);
      }
      fetchTasksData(); // Обновление списка задач
      resetNewTask();
    } catch (error) {
      console.error("Ошибка при отправке задачи:", error);
    }
  };

  const resetNewTask = () => {
    setNewTask({
      id: null,
      start_date: "",
      end_date: "",
      title: "",
      descript: "",
      status: "false",
    });
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      fetchTasksData(); // Обновление списка задач после удаления
    } catch (error) {
      console.error("Ошибка при удалении задачи:", error);
    }
  };

  const handleEdit = (task) => {
    setNewTask(task);
  };

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Индивидуальный план развития</h1>
      <Row className="mb-4">
        <Col md={6}>
          <Calendar onSelectDate={setSelectedDate} />
        </Col>
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>Дата начала</Form.Label>
                  <Form.Control
                    type="date"
                    className="form-control mb-3"
                    name="start_date"
                    value={newTask.start_date}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Дата окончания</Form.Label>
                  <Form.Control
                    type="date"
                    className="form-control mb-3"
                    name="end_date"
                    value={newTask.end_date}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Название задачи</Form.Label>
                  <Form.Control
                    type="text"
                    className="form-control mb-3"
                    name="title"
                    value={newTask.title}
                    onChange={handleChange}
                    placeholder="Введите название задачи"
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Описание задачи</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    className="mb-3"
                    name="descript"
                    value={newTask.descript}
                    onChange={handleChange}
                    placeholder="Введите описание задачи"
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100">
                  {newTask.id ? "Редактировать задачу" : "Создать задачу"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <h3 className="mb-1 mt-3 text-center" style={{ fontWeight: "bold" }}>
        Мои цели на {selectedDate}
      </h3>

      {tasks.length === 0 ? (
        <Card className="mb-3">
          <Card.Body>
            <div className="text-center">Нет активных задач на этот день.</div>
          </Card.Body>
        </Card>
      ) : (
        tasks.map((task) => (
          <Card key={task.id} className="mb-3">
            <Card.Body>
              <Row className="d-flex justify-content-center align-items-center">
                <Col>
                  <h2 className="fw-bold mb-3">{task.title}</h2>
                </Col>
                <Col>
                  <div className="text-muted mb-3">
                    {task.start_date.split("T")[0]} - {task.end_date.split("T")[0]}
                  </div>
                </Col>
                <Col md={3} className="d-flex justify-content-between align-items-center">
                  <Button variant="danger" onClick={() => handleDelete(task.id)}>
                    Удалить
                  </Button>
                  <Button
                    variant="warning"
                    onClick={() => handleEdit(task)}
                    className="ms-2"
                  >
                    Редактировать
                  </Button>
                </Col>
              </Row>
              <Row className="d-flex justify-content-center align-items-center">
                <Col>
                  <div>{task.descript}</div>
                </Col>
                
              </Row>
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  );
}
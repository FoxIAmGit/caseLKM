import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Container,
  DropdownButton,
  Form,
  Modal,
  Dropdown,
} from "react-bootstrap";
import { semesterData } from "../utils/consts";
import { createMaterials, fetchSubjects } from "../http/authAPI";
import { Context } from "..";

const typeWorkStudent = [
  { id: 1, type: "Отчет" },
  { id: 2, type: "Практика" },
  { id: 3, type: "Лабораторная работа" },
  { id: 4, type: "Кейс" },
];

const typeWorkTeacher = [
  { id: 1, type: "Лекции" },
  { id: 2, type: "Презентация" },
  { id: 3, type: "Практики" },
  { id: 4, type: "Лабораторные работы" },
];

export default function AddMaterial() {
  const { user } = useContext(Context);
  const [show, setShow] = useState(false);
  const [semester, setSemester] = useState("Семестр");
  const [type, setType] = useState("Тип работы");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const nameSubject = await fetchSubjects();
        setSubjects(nameSubject);
      } catch (error) {
        alert("Ошибка при получении данных:", error);
      }
    };

    fetchData();
  }, []);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file || !selectedSubject) {
      console.error("Файл или предмет не выбраны.");
      return;
    }

    const materialData = new FormData();
    materialData.append("title", event.target.title.value);
    materialData.append("type_work", type);
    materialData.append("descript", description);
    materialData.append("semester", semester);
    materialData.append("subjectId", selectedSubject.id);
    materialData.append("file", file);

    try {
      await createMaterials(materialData);
      handleClose();
    } catch (error) {
      console.error("Ошибка при создании материала:", error);
    }
  };

  return (
    <Container className="materials-container">
      <Button variant="primary" onClick={handleShow}>
        Добавить материал
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Загрузить новый материал</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="title" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Введите название"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                as="textarea"
                placeholder="Описание"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Семестр</Form.Label>
              <DropdownButton
                title={semester}
                onSelect={(eventKey) => setSemester(eventKey)}
              >
                {semesterData.map((field, index) => (
                  <Dropdown.Item key={index} eventKey={`${field.num}`}>
                    {`${field.num} семестр`}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </Form.Group>

            <Form.Group>
              <Form.Label>Тип работы</Form.Label>
              <DropdownButton
                title={type}
                onSelect={(eventKey) => setType(eventKey)}
              >
                {(user._user.role === "student"
                  ? typeWorkStudent
                  : typeWorkTeacher
                ).map((field) => (
                  <Dropdown.Item key={field.id} eventKey={field.type}>
                    {field.type}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </Form.Group>

            <Form.Group>
              <Form.Label>Предмет</Form.Label>
              <DropdownButton
                title={
                  selectedSubject ? selectedSubject.name : "Выберите предмет"
                }
                onSelect={(eventKey) => {
                  const subject = subjects.find((sub) => sub.name === eventKey);
                  setSelectedSubject(subject);
                }}
              >
                {Array.isArray(subjects) &&
                  subjects.map((field) => (
                    <Dropdown.Item key={field.id} eventKey={field.name}>
                      {field.name}
                    </Dropdown.Item>
                  ))}
              </DropdownButton>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Файл</Form.Label>
              <Form.Control
                className="p-1"
                type="file"
                onChange={handleFileChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Загрузить
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

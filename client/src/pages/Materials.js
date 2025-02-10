import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Form,
  Modal,
  Nav,
  Row,
} from "react-bootstrap";
import {
  semesterData,
  //subjectsData,
  typeWorkData,
} from "../utils/consts";
import "../components/css/Materials.css";
import { fetchMaterials, fetchMaterialsForStudent, fetchMaterialsForTeacher, createMaterials, fetchSubjects } from "../http/authAPI";

export default function Materials() {
  const [show, setShow] = useState(false);

  const [semester, setSemester] = useState("Семестр");
  const [type, setType] = useState("Тип работы");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null); // для хранения файла

  const [subject, setSubject] = useState([]); 
  const [materials, setMaterials] = useState([]); // для хранения всех материалов
  const [studentMaterials, setStudentWork] = useState([]); // для хранения всех материалов
  const [teacherMaterials, setTeacherWork] = useState([]); // для хранения всех материалов
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mineMaterial = await fetchMaterials();
        setMaterials(mineMaterial || []);

        const forStudent = await fetchMaterialsForStudent();
        setStudentWork(forStudent);

        const forTeacher = await fetchMaterialsForTeacher();
        setTeacherWork(forTeacher);

        const nameSubject = await fetchSubjects();
        setSubject(nameSubject);
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
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

    if (!file || !subject) {
      console.error("Файл или предмет не выбраны.");
      return;
    }

    const materialData = new FormData();
    materialData.append("title", event.target.title.value);
    materialData.append("type_work", type);
    materialData.append("descript", description);
    materialData.append("semester", semester);
    materialData.append("subjectId", subject.id); // Предполагается, что id есть у предмета
    materialData.append("file", file);
    console.log(materialData)
    try {
      const newMaterial = await createMaterials(materialData);
      setMaterials((prevMaterials) => [...prevMaterials, newMaterial]); // Обновляем список материалов
      handleClose(); // Закрываем модальное окно
    } catch (error) {
      console.error("Ошибка при создании материала:", error);
    }
  };

  return (
    <Container className="materials-container">
      <h1 className="header-title">Учебные материалы</h1>
      <Nav>
        <Nav.Item>
          <Nav.Link href="#" onClick={handleShow}>Загрузить материал</Nav.Link>
        </Nav.Item>
      </Nav>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Загрузить новый материал</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="title">
              <Form.Label>Название материала</Form.Label>
              <Form.Control type="text" placeholder="Введите название" required />
            </Form.Group>

            <Form.Group>
              <Form.Label>Описание</Form.Label>
              <Form.Control 
                as="textarea" 
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
                  <Dropdown.Item key={index} eventKey={`${field.num} семестр`}>
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
                {typeWorkData.map((field, index) => (
                  <Dropdown.Item key={index} eventKey={field.type}>
                    {field.type}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </Form.Group>

            <Form.Group>
              <Form.Label>Предмет</Form.Label>
              <DropdownButton
                title={"Предмет"}
                onSelect={(eventKey) => setSubject(eventKey)}>
                {subject.map((field) => (
                  <Dropdown.Item key={field.id} eventKey={field.name}>
                    {field.name}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </Form.Group>

            <Form.Group>
              <Form.Label>Файл</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} required />
            </Form.Group>

            <Button variant="primary" type="submit">Загрузить</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Закрыть</Button>
        </Modal.Footer>
      </Modal>

      {materials.map((field, index) => (
        <Card.Body key={index} className="material-item">
          <Row>
            <Col className="material-subject">{field.subject}</Col>
            <Col className="material-type">{field.type_work}</Col>
          </Row>
          <Row>
            <Col className="material-file">{field.title_file}</Col>
            <Col className="material-description">{field.descript}</Col>
          </Row>
        </Card.Body>
      ))}
    </Container>
  );
}
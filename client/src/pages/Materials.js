import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  Col,
  Container,
  Nav,
  Row,
} from "react-bootstrap";
import { fetchMaterials, fetchMaterialsForStudent, fetchMaterialsForTeacher } from "../http/authAPI";
import { Context } from "../index";
import AddMaterial from "../components/AddMaterial"
import "../components/css/Materials.css";

const MaterialItem = ({ field }) => (
  <Card.Body className="material-item">
    <Row>
      <Col className="material-subject">{field.subject.name}</Col>
    </Row>
    <Row>
      <Col md={5} className="material-file">{field.title_file}</Col>
      <Col md={3}>{field.type_work}</Col>
      <Col md={2} className="material-date">{field.createdAt.slice(0,10)}</Col>
      <Col>
        <a href={field.title_file} download={field.title_file} className="btn btn-primary">
          Скачать
        </a>
      </Col>
    </Row> 
    <Row className="material-description">{field.descript}</Row>
  </Card.Body>
);

export default function Materials() {
  const { user } = useContext(Context);

  const [materials, setMaterials] = useState([]);
  const [forMineMaterials, setForMineMaterials] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allMaterials = await fetchMaterials();
        setMaterials(allMaterials || []);
        console.log(allMaterials)
        const mineMaterials = user._user.role === "student" 
          ? await fetchMaterialsForStudent() 
          : await fetchMaterialsForTeacher();
        
        setForMineMaterials(mineMaterials);
      } catch (e) {
        alert("Ошибка при получении данных: " + e.message);
      }
    };

    fetchData();
  }, [user]);

  return (
    <Container className="materials-container">
      <h1 className="header-title">Учебные материалы</h1>
      <Nav variant="tabs" className="align-items-center">
        <Nav.Item>
          <Nav.Link className={currentCategory === "all" ? "active" : ""} onClick={() => setCurrentCategory("all")}>
            Мои материалы
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className={currentCategory === "mine" ? "active" : ""} onClick={() => setCurrentCategory("mine")}>
            Материалы для меня 
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <AddMaterial />
        </Nav.Item>
      </Nav>

      <div>
        {(currentCategory === "all" ? materials : forMineMaterials).map((field, index) => (
          <MaterialItem key={index} field={field} />
        ))}
      </div>

    </Container>
  );
}
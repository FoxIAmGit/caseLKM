import React, { useState } from "react";
import { Button, Card, Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import { vacanciesData } from "../utils/consts";
import "../components/css/Practic.css";

export default function Practic() {
  const [key, setKey] = useState("home");

  return (
    <Container className="practic-container">
      <h1 className="practic-title">Практика</h1>

      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="home" title="Все" />
        <Tab eventKey="profile" title="Отправленные" />
      </Tabs>

      <Row>
        {vacanciesData.map((field, index) => (
          <Col key={index} md={4} className="practic-col">
            <Card className="practic-card">
              <Card.Body>
                <h5 className="practic-job">{field.job}</h5>
                <p className="practic-company">
                  <strong>Компания:</strong> {field.company}
                </p>
                <p className="practic-location">
                  <strong>Локация:</strong> {field.location}
                </p>
                <p className="practic-duration">
                  <strong>Длительность:</strong> {field.duration}
                </p>
                <p className="practic-description">
                  <strong>Описание:</strong> {field.descript}
                </p>
                <Button variant="outline-success" className="practic-button">
                  Отправить заявку
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

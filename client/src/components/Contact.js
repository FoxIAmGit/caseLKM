import React from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import phone from "../image/лого_телефон.png";
import email from "../image/лого_почта.png";
import point from "../image/лого_поинт.png";

export default function Contact() {
  return (
    <Container>
        <Card className="p-4 shadow-sm">
            <Card.Title className="text-center">
              Контактная информация
            </Card.Title>
            <Card.Text>
              <Row className="mb-3 align-items-center">
                <Col xs={1} className="pr-0">
                  <img src={phone} alt="phone" style={{ width: "30px" }} />
                </Col>
                <Col xs={11}>
                  <p className="mb-0 ml-3">8 (999) 123-45-67</p>
                </Col>
              </Row>
              <Row className="mb-3 align-items-center">
                <Col xs={1} className="pr-0">
                  <img src={email} alt="email" style={{ width: "30px" }} />
                </Col>
                <Col xs={11}>
                  <p className="mb-0 ml-3">support@university.edu</p>
                </Col>
              </Row>
              <Row className="mb-3 align-items-center">
                <Col xs={1} className="pr-0">
                  <img src={point} alt="address" style={{ width: "30px" }} />
                </Col>
                <Col xs={11}>
                  <p className="mb-0 ml-3">Г. Уфа, ул. Космонавтов, д. 1</p>
                </Col>
              </Row>
            </Card.Text>
          </Card>
    </Container>
  )
}

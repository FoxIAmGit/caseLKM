import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import bgImage from "../image/фон_УГНТУ.png";

const Zero = () => {
  return (
    <div
      style={{
        height: window.innerHeight - 54,
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        padding: "20px",
        textAlign: "center",
        backdropFilter: "blur(5px)",
      }}
    >
      <Container
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <h1 className="mb-3">
          Уфимский Государственный Технический Нефтяной Университет
        </h1>
        <p>
          УГНТУ является одним из ведущих университетов в России,
          специализирующихся на подготовке кадров для нефтяной и газовой
          промышленности. Мы предлагаем широкий спектр программ и курсов,
          которые обеспечивают студентов необходимыми знаниями и навыками для
          успешной карьеры. Студенты имеют доступ к высококлассному оборудованию
          и современным лабораториям.
        </p>
        <p>
          Наша цель - предоставить современное образование в сочетании с
          практическими навыками.
        </p>
        <p>
          УГНТУ активно сотрудничает с крупными компаниями, предоставляя
          студентам возможность стажировок и трудоустройства.
        </p>
        <h1 className="mt-4 mb-3">Контактная информация</h1>
        <Row>
          <Col>
            <p>Телефон: +7 (347) 233-33-33</p>
          </Col>
          <Col>
            <p>Email: info@ugntu.ru</p>
          </Col>
          <Col>
            <p>Адрес: Уфа, ул. Выползова, 5.</p>
          </Col>
        </Row>

        <p className="mt-3">Для регистрации: Свяжитесь с нами по телефону.</p>
      </Container>
    </div>
  );
};

export default Zero;

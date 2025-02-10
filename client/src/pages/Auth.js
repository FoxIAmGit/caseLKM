import React, { useContext, useState } from "react";
import { Container, Form, Card, Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { NavLink, useNavigate } from "react-router-dom";
import { Context } from "../index";
import { MAIN, ZERO } from "../utils/consts";
import { loginApi } from "../http/userAPI";
import bging from "../image/фон_УГНТУ.png";

const Auth = observer(() => {
  const { user } = useContext(Context);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const click = async () => {
    loginApi(login, password)
      .then((data) => {
        if (data) {
          user.setUser(data.user);
          user.setIsAuth(true);
        }
      })
      .then(() => navigate(MAIN))
      .catch((e) => {
        alert(e.response ? e.response.data.message : "Ошибка при входе");
      });

    console.log(user);
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{
        height: window.innerHeight - 54,
        backgroundImage: `url(${bging})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: "450px",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          borderRadius: "35px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        }}
        className="p-5"
      >
        <h2 className="m-auto text-center" style={{ color: "#007bff" }}>
          Вход в систему
        </h2>
        <Form className="d-flex flex-column">
          <Form.Control
            className="mt-3 shadow-sm p-3 mb-3 bg-white rounded"
            placeholder="Email или номер телефона"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            style={{ borderRadius: "25px" }}
          />
          <Form.Control
            className="mt-2 shadow-sm p-3 mb-4 bg-white rounded"
            placeholder="Пароль"
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            style={{ borderRadius: "25px" }}
          />
          <Button
            onClick={click}
            style={{ borderRadius: "25px" }}
            className="mb-2 col-12 btn btn-primary btn-lg"
          >
            Войти
          </Button>
          <div className="text-center">
            Нет аккаунта? <NavLink to={ZERO}>Читай здесь!</NavLink>
          </div>
        </Form>
      </Card>
    </Container>
  );
});

export default Auth;

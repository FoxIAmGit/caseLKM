import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Nav,
  Navbar,
  Button,
  Container,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";

import { Context } from "../index";
import { LOGIN_ROUTE, menuItemsStudent, menuItemsTeacher } from "../utils/consts";
import { logOutAPI } from "../http/userAPI";

const NavBar = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  const logOut = () => {
    user.setUser({});
    user.setIsAuth(false);
    logOutAPI();
  };

  return (
    <Navbar bg="primary" data-bs-theme="dark">
      <Container>
        <NavLink style={{ color: "white" }} to={"https://ugntu.ru/"}>
          Узнай больше об опорном вузе России!
        </NavLink>
        <Nav className="ml-auto">
          {!user.isAuth ? (
            <Button
              variant={"outline-light"}
              onClick={() => navigate(LOGIN_ROUTE)}
            >
              Войти
            </Button>
          ) : (
            <DropdownButton
    title="Меню"
    drop="down"
    align="end"
    id="dropdown-menu-align-end"
>
    {user._user.role === "student" ? (
        menuItemsStudent.map((item) => (
            <Dropdown.Item
                key={item.eventKey}
                eventKey={item.eventKey}
                onClick={() => navigate(item.path)}
            >
                {item.label}
            </Dropdown.Item>
        ))
    ) : (
        menuItemsTeacher.map((item) => (
            <Dropdown.Item
                key={item.eventKey}
                eventKey={item.eventKey}
                onClick={() => navigate(item.path)}
            >
                {item.label}
            </Dropdown.Item>
        ))
    )}
              <Dropdown.Divider />
              <Dropdown.Item
                as={Button}
                variant="outline-danger"
                eventKey="0"
                onClick={logOut}
              >
                Выйти
              </Dropdown.Item>
            </DropdownButton>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
});

export default NavBar;

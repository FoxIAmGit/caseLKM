import { useState } from "react";
import { observer } from "mobx-react-lite";
import { Col, Container, ListGroup, Row } from "react-bootstrap";

import FacultyAdmin from "../components/admin/FacultyAdmin";
import DepartmentsAdmin from "../components/admin/DepartmentsAdmin";
import GroupsAdmin from "../components/admin/GroupsAdmin";

import JobsAdmin from "../components/admin/JobsAdmin";
import VacanciesAdmin from "../components/admin/VacanciesAdmin";
import SubjectsAdmin from "../components/admin/SubjectsAdmin";
import ScheduleAdmin from "../components/admin/ScheduleAdmin";
import Registration from "../components/admin/Registration";

import CreateScheduleModal from "../components/admin/ScheduleAdmin";
import CreateUserModal from "../components/admin/Registration";

const Admin = observer(() => {
  const [selectedCategory, setSelectedCategory] = useState("Факультеты");
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);

  const componentsMap = {
    Факультеты: FacultyAdmin,
    Кафедры: DepartmentsAdmin,
    Группы: GroupsAdmin,
    Должность: JobsAdmin,
    Вакансии: VacanciesAdmin,
    Предметы: SubjectsAdmin,
    Расписание: ScheduleAdmin,
    Пользователь: Registration,
  };

  const CurrentComponent = componentsMap[selectedCategory];

  const handleModalOpen = (category) => {
    switch (category) {
      case "Расписание":
        setShowScheduleModal(true);
        break;
      case "Пользователь":
        setShowUserModal(true);
        break;
      default:
        break;
    }
  };

  return (
    <Container>
      <Row className="mt-3 justify-content-between">
        <Col md={3}>
          <ListGroup>
            {Object.keys(componentsMap).map((category) => (
              <ListGroup.Item
                key={category}
                active={selectedCategory === category}
                onClick={() => {
                  setSelectedCategory(category);
                  if (
                    [
                      "Должность",
                      "Вакансии",
                      "Предметы",
                      "Расписание",
                      "Пользователь",
                    ].includes(category)
                  ) {
                    handleModalOpen(category);
                  }
                }}
                style={{ cursor: "pointer" }}
              >
                {category}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col md={9}>
          <CurrentComponent />
        </Col>
      </Row>

      <CreateScheduleModal
        show={showScheduleModal}
        onHide={() => setShowScheduleModal(false)}
      />
      <CreateUserModal
        show={showUserModal}
        onHide={() => setShowUserModal(false)}
      />
    </Container>
  );
});

export default Admin;

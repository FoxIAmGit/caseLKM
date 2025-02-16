import { useContext, useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Row,
  Spinner,
  Form,
} from "react-bootstrap";
import { Context } from "../..";
import { fetchGroup, createGroup } from "../../http/adminAPI";

export default function GroupsAdmin() {
  const { group } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const [newGroupCipher, setNewGroupCipher] = useState("");
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupStartYear, setNewGroupStartYear] = useState("");
  const [newGroupTotalSem, setNewGroupTotalSem] = useState("");
  const [newGroupFaculty, setNewGroupFaculty] = useState("");
  const [addLoading, setAddLoading] = useState(false);

  useEffect(() => {
    const getGroups = async () => {
      try {
        const groups = await fetchGroup();
        groups.forEach((element) => {
          group.addGroup(element);
        });
      } catch (err) {
        alert(err.response?.data?.message || "Ошибка при загрузке групп");
      } finally {
        setLoading(false);
      }
    };

    getGroups();
  }, [group]);

  const addGroup = async () => {
    if (
      newGroupCipher.trim() &&
      newGroupName.trim() &&
      newGroupStartYear.trim() &&
      newGroupTotalSem.trim() &&
      newGroupFaculty.trim()
    ) {
      setAddLoading(true);
      try {
        const newGroup = await createGroup(
          newGroupCipher,
          newGroupName,
          newGroupStartYear,
          newGroupTotalSem,
          newGroupFaculty,
        );
        setNewGroupCipher("");
        setNewGroupName("");
        setNewGroupStartYear("");
        setNewGroupTotalSem("");
        setNewGroupFaculty("");
      } catch (err) {
        alert(err.response?.data?.message || "Ошибка при создании группы");
      } finally {
        setAddLoading(false);
      }
    } else {
      alert("Пожалуйста, заполните все поля");
    }
  };

  if (loading) {
    return <Spinner animation="border" />;
  }

  return (
    <Container className="mb-3 p-1 justify-content-between">
      <h3 className="mb-3">Добавить новую группу</h3>
      <Form inline style={{ marginBottom: "20px" }}>
        <Form.Control
          type="text"
          placeholder="Шифр группы"
          value={newGroupCipher}
          onChange={(e) => setNewGroupCipher(e.target.value)}
          className="mr-2 mb-3"
        />
        <Form.Control
          type="text"
          placeholder="Полное название группы"
          value={newGroupName}
          onChange={(e) => setNewGroupName(e.target.value)}
          className="mr-2 mb-3"
        />
        <Form.Control
          type="text"
          placeholder="Год начала"
          value={newGroupStartYear}
          onChange={(e) => setNewGroupStartYear(e.target.value)}
          className="mr-2 mb-3"
        />
        <Form.Control
          type="text"
          placeholder="Количество семестров"
          value={newGroupTotalSem}
          onChange={(e) => setNewGroupTotalSem(e.target.value)}
          className="mr-2 mb-3"
        />
        <Form.Control
          type="text"
          placeholder="Факультет"
          value={newGroupFaculty}
          onChange={(e) => setNewGroupFaculty(e.target.value)}
          className="mr-2 mb-3"
        />
        <Button variant="primary" onClick={addGroup} disabled={addLoading}>
          {addLoading ? "Добавление..." : "Добавить"}
        </Button>
      </Form>

      {group.groups.map((grpItem) => (
        <Card
          key={grpItem.id}
          data-id={grpItem.id}
          className="mb-3 justify-content-between"
        >
          <Card.Body className="ml-3 justify-content-between">
            <Row className="mb-3">
              <h2>{grpItem.faculty.full_name}</h2>
            </Row>
            <Row>
              <Col>
                <Row className="mb-3">
                  <strong>{grpItem.cipher}</strong>
                </Row>
                <Row>{grpItem.name}</Row>
              </Col>
              <Col className="pl-5">
                <Row className="mb-3">
                  <strong>{grpItem.start_year}</strong>
                </Row>
                <Row>
                  <i>{`${grpItem.total_sem} семестров`}</i>
                </Row>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
}

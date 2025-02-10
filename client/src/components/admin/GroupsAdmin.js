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
        console.log(group);
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
          newGroupFaculty,
          newGroupName,
          newGroupStartYear,
          newGroupTotalSem,
        );
        group.addGroup(newGroup);
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
    <Container>
      <h3>Добавить новую группу</h3>
      <Form inline style={{ marginBottom: "20px" }}>
        <Form.Control
          type="text"
          placeholder="Шифр группы"
          value={newGroupCipher}
          onChange={(e) => setNewGroupCipher(e.target.value)}
          className="mr-2"
        />
        <Form.Control
          type="text"
          placeholder="Полное название группы"
          value={newGroupName}
          onChange={(e) => setNewGroupName(e.target.value)}
          className="mr-2"
        />
        <Form.Control
          type="text"
          placeholder="Год начала"
          value={newGroupStartYear}
          onChange={(e) => setNewGroupStartYear(e.target.value)}
          className="mr-2"
        />
        <Form.Control
          type="text"
          placeholder="Количество семестров"
          value={newGroupTotalSem}
          onChange={(e) => setNewGroupTotalSem(e.target.value)}
          className="mr-2"
        />
        <Form.Control
          type="text"
          placeholder="Факультет"
          value={newGroupFaculty}
          onChange={(e) => setNewGroupFaculty(e.target.value)}
          className="mr-2"
        />
        <Button variant="primary" onClick={addGroup} disabled={addLoading}>
          {addLoading ? "Добавление..." : "Добавить"}
        </Button>
      </Form>

      {group.groups.map((grpItem) => (
        <Card key={grpItem.id} data-id={grpItem.id} className="mb-3">
          <Row>{grpItem.faculty.full_name}</Row>
          <Row>
            <Col>
              <Row>{grpItem.cipher}</Row>
              <Row>{grpItem.name}</Row>
            </Col>
            <Col>
              <Row>{grpItem.start_year}</Row>
              <Row>{grpItem.total_sem}</Row>
            </Col>
          </Row>
        </Card>
      ))}
    </Container>
  );
}

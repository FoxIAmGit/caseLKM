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
import UpdaterDept from "./UpdaterDept";
import { fetchDept, createDept } from "../../http/adminAPI";

export default function DepartmentsAdmin() {
  const [selectedDeptId, setSelectedDeptId] = useState(null);
  const { dept } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);

  const [newDeptCipher, setNewDeptCipher] = useState("");
  const [newDeptName, setNewDeptName] = useState("");
  const [addLoading, setAddLoading] = useState(false);

  const handleShow = (depId) => {
    setSelectedDeptId(depId);
    setShow(true);
  };

  useEffect(() => {
    const getDepts = async () => {
      try {
        const depts = await fetchDept();
        depts.forEach((element) => {
          dept.addDept(element);
        });
        console.log(depts);
      } catch (err) {
        alert(err.response?.data?.message || "Ошибка при загрузке факультетов");
      } finally {
        setLoading(false);
      }
    };

    getDepts();
  }, [dept]);

  const addDept = async () => {
    if (newDeptCipher.trim() && newDeptName.trim()) {
      setAddLoading(true);
      try {
        const newDep = await createDept(newDeptCipher, newDeptName);
        dept.addDept(newDep);
        setNewDeptCipher("");
        setNewDeptName("");
      } catch (err) {
        alert(err.response?.data?.message || "Ошибка при создании факультета");
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
      <h3>Добавить новый факультет</h3>
      <Form inline style={{ marginBottom: "20px" }}>
        <Form.Control
          type="text"
          placeholder="Шифр факультета"
          value={newDeptCipher}
          onChange={(e) => setNewDeptCipher(e.target.value)}
          className="mr-2"
        />
        <Form.Control
          type="text"
          placeholder="Полное название факультета"
          value={newDeptName}
          onChange={(e) => setNewDeptName(e.target.value)}
          className="mr-2"
        />
        <Button variant="primary" onClick={addDept} disabled={addLoading}>
          {addLoading ? "Добавление..." : "Добавить"}
        </Button>
      </Form>

      {dept.depts.map((dep) => (
        <Card key={dep.id} data-id={dep.id} className="mb-3">
          <Row>
            <Col>
              <Row>{dep.fac_cipher}</Row>
              <Row>{dep.name}</Row>
            </Col>
            <Col>
              <Row>{dep.teach_name}</Row>
              <Row>
                <Button
                  variant="outline-success"
                  onClick={() => handleShow(dep.id)}
                >
                  Изменить
                  <UpdaterDept
                    show={show}
                    onHide={() => setShow(false)}
                    id={selectedDeptId}
                  />
                </Button>
              </Row>
            </Col>
          </Row>
        </Card>
      ))}
    </Container>
  );
}

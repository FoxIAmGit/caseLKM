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
import UpdaterFaculty from "./UpdaterFaculty";
import { fetchFaculty, createFaculty } from "../../http/adminAPI";

export default function FacultyAdmin() {
  const [selectedFacultyId, setSelectedFacultyId] = useState(null);
  const { faculty } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);

  const [newFacultyCipher, setNewFacultyCipher] = useState("");
  const [newFacultyName, setNewFacultyName] = useState("");
  const [addLoading, setAddLoading] = useState(false);

  const handleShow = (facId) => {
    setSelectedFacultyId(facId);
    setShow(true);
    console.log("facId: " + facId);
  };

  useEffect(() => {
    const getFaculties = async () => {
      try {
        const faculties = await fetchFaculty();
        faculties.forEach((element) => {
          faculty.addFaculty(element);
        });
        console.log(faculties);
        
      } catch (err) {
        alert(err.response?.data?.message || "Ошибка при загрузке факультетов");
      } finally {
        setLoading(false);
      }
    };

    getFaculties();
  }, [faculty]);

  const addFaculty = async () => {
    if (newFacultyCipher.trim() && newFacultyName.trim()) {
      setAddLoading(true);
      try {
        const newFac = await createFaculty(newFacultyCipher, newFacultyName);
        faculty.addFaculty(newFac);
        setNewFacultyCipher("");
        setNewFacultyName("");
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
    <Container className="mb-3 p-1 justify-content-between">
      <h3 className="mb-3">Добавить новый факультет</h3>
      <Form inline style={{ marginBottom: "20px" }}>
        <Form.Control
          type="text" 
          placeholder="Шифр факультета"
          value={newFacultyCipher}
          onChange={(e) => setNewFacultyCipher(e.target.value)}
          className="mr-2 mb-3"
        />
        <Form.Control
          type="text"
          placeholder="Полное название факультета"
          value={newFacultyName}
          onChange={(e) => setNewFacultyName(e.target.value)}
          className="mr-2 mb-3"
        />
        <Button variant="primary" onClick={addFaculty} disabled={addLoading}>
          {addLoading ? "Добавление..." : "Добавить"}
        </Button>
      </Form>

      {faculty.faculties.map((fac) => (
        <Card key={fac.id} data-id={fac.id} className="mb-3 justify-content-between">
          <Card.Body className="ml-3 justify-content-between">
          <Row> 
            <Col>
              <Row className="mb-3"><h2>{fac.cipher}</h2></Row>
              <Row>{fac.full_name}</Row>
            </Col>
            <Col>
              <Row className="mb-3"><strong>{fac.teach_names}</strong></Row>
              <Row>
                <Button
                  variant="outline-success"
                  onClick={() => handleShow(fac.id)}
                >
                  Изменить
                  <UpdaterFaculty
                    show={show}
                    onHide={() => setShow(false)}
                    id={selectedFacultyId}
                  />
                </Button>
              </Row>
            </Col>
          </Row>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
}

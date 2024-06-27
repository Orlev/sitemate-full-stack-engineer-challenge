import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, ListGroup, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    const [issues, setIssues] = useState([]);
    const [issue, setIssue] = useState({ id: '', title: '', description: '' });
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:3001/issues')
            .then(response => setIssues(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setIssue(prevIssue => ({
            ...prevIssue,
            [name]: value
        }));
    };

    const handleCreate = () => {
        axios.post('http://localhost:3001/issues', issue)
            .then(response => setIssues([...issues, response.data]))
            .catch(error => console.error(error));
        setIssue({ id: '', title: '', description: '' });
    };

    const handleUpdate = (id) => {
        axios.put(`http://localhost:3001/issues/${id}`, issue)
            .then(response => setIssues(issues.map(issue => issue.id === id ? response.data : issue)))
            .catch(error => console.error(error));
        setIssue({ id: '', title: '', description: '' });
        setEditMode(false);
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3001/issues/${id}`)
            .then(() => setIssues(issues.filter(issue => issue.id !== id)))
            .catch(error => console.error(error));
    };

    const handleEdit = (issue) => {
        setIssue(issue);
        setEditMode(true);
    };

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md="8">
                    <h1 className="text-center mt-5">Issue Tracker</h1>
                    <Card className="mt-3">
                        <Card.Body>
                            <Form>
                                <Form.Group controlId="formId">
                                    <Form.Label>ID</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="id"
                                        placeholder="Enter ID"
                                        value={issue.id}
                                        onChange={handleChange}
                                        disabled={editMode}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formTitle" className="mt-3">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="title"
                                        placeholder="Enter Title"
                                        value={issue.title}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formDescription" className="mt-3">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        name="description"
                                        placeholder="Enter Description"
                                        value={issue.description}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Button
                                    className="mt-3"
                                    variant={editMode ? "warning" : "primary"}
                                    onClick={editMode ? () => handleUpdate(issue.id) : handleCreate}
                                >
                                    {editMode ? "Update Issue" : "Create Issue"}
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>

                    <h2 className="text-center mt-5">Issues</h2>
                    <ListGroup className="mt-3">
                        {issues.map(issue => (
                            <ListGroup.Item key={issue.id} className="d-flex justify-content-between align-items-center">
                                <div>
                                    <strong>{issue.title}</strong>: {issue.description}
                                </div>
                                <div>
                                    <Button variant="info" className="me-2" onClick={() => handleEdit(issue)}>Edit</Button>
                                    <Button variant="danger" onClick={() => handleDelete(issue.id)}>Delete</Button>
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
};

export default App;

import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';

const TaskForm = ({ show, onHide, onSave, taskToEdit }) => {
  const initialFormState = { title: '', description: '', priority: 'medium', dueDate: '' };
  const [task, setTask] = useState(initialFormState);
  const [error, setError] = useState('');

  useEffect(() => {
    if (taskToEdit) {
      setTask({ ...taskToEdit, dueDate: new Date(taskToEdit.dueDate).toISOString().split('T')[0] });
    } else {
      setTask(initialFormState);
    }
    setError('');
  }, [taskToEdit, show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.title || !task.description || !task.dueDate) {
      setError('All fields are required.');
      return;
    }
    onSave(task);
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton><Modal.Title>{taskToEdit ? 'Edit Task' : 'Add New Task'}</Modal.Title></Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" name="title" value={task.title} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} name="description" value={task.description} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Priority</Form.Label>
            <Form.Select name="priority" value={task.priority} onChange={handleChange}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Due Date</Form.Label>
            <Form.Control type="date" name="dueDate" value={task.dueDate} onChange={handleChange} required />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>Cancel</Button>
          <Button variant="primary" type="submit">Save Task</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default TaskForm;
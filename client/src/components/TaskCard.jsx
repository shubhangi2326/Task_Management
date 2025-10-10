import React from 'react';
import { Card, Badge, Button, Form } from 'react-bootstrap';

const TaskCard = ({ task, onEdit, onDelete, onStatusChange }) => {
  const priorityVariant = {
    high: 'danger',
    medium: 'warning',
    low: 'success',
  };

  const priorityText = {
    high: 'High',
    medium: 'Medium',
    low: 'Low',
  };

  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'completed';

  return (
    <Card className={`h-100 shadow-sm task-card ${isOverdue ? 'border-danger' : ''}`}>
      <Card.Body className="d-flex flex-column">
    
        <div className="d-flex justify-content-between align-items-start mb-2">
          <Card.Title className="mb-0 fw-bold">{task.title}</Card.Title>
          <Badge pill bg={priorityVariant[task.priority]} text={task.priority === 'medium' ? 'dark' : 'white'}>
            {priorityText[task.priority]}
          </Badge>
        </div>

        <Card.Text className="text-muted flex-grow-1">
          {task.description}
        </Card.Text>

       
        <div className="mt-auto">
          <p className="mb-2">
            <small className={isOverdue ? 'text-danger fw-bold' : 'text-muted'}>
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </small>
          </p>
          <div className="d-flex justify-content-between align-items-center">
            <Form.Select
              size="sm"
              className="status-select"
              value={task.status}
              onChange={(e) => onStatusChange(task._id, e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </Form.Select>
            <div className="d-flex">
             <Button variant="outline-primary" size="sm" className="me-2" onClick={() => onEdit(task)}>✏️</Button>
              <Button variant="outline-danger" size="sm" onClick={() => onDelete(task._id)}>🗑️</Button>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default TaskCard;
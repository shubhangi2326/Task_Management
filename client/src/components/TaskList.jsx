import React from 'react';
import { Row, Col } from 'react-bootstrap';
import TaskCard from './TaskCard.jsx';

const TaskList = ({ tasks, onEdit, onDelete, onStatusChange }) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center p-5 mt-4 border rounded bg-light">
        <h4>No tasks found!</h4>
        <p className="text-muted">Try adding a new task or changing your filters.</p>
      </div>
    );
  }
  return (
    <Row>
      {tasks.map((task) => (
        <Col key={task._id} sm={12} md={6} lg={4} className="mb-4 d-flex align-items-stretch">
          <TaskCard
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
            onStatusChange={onStatusChange}
          />
        </Col>
      ))}
    </Row>
  );
};

export default TaskList;
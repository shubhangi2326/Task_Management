import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';

const TaskFilter = ({ filters, setFilters }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Row className="mb-4 p-3 bg-white border rounded shadow-sm">
      <Col md={4} className="mb-2 mb-md-0">
        <Form.Control type="text" name="search" placeholder="Search by title..." value={filters.search} onChange={handleInputChange} />
      </Col>
      <Col md={3} sm={6} className="mb-2 mb-md-0">
        <Form.Select name="status" value={filters.status} onChange={handleInputChange}>
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </Form.Select>
      </Col>
      <Col md={3} sm={6} className="mb-2 mb-md-0">
        <Form.Select name="priority" value={filters.priority} onChange={handleInputChange}>
          <option value="">All Priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </Form.Select>
      </Col>
      <Col md={2}>
        <Form.Select name="sort" value={filters.sort} onChange={handleInputChange}>
          <option value="newest">Newest First</option>
          <option value="dueDate">By Due Date</option>
        </Form.Select>
      </Col>
    </Row>
  );
};

export default TaskFilter;
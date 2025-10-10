import React, { useState, useEffect, useMemo } from 'react';
import { Container, Button, Alert, Spinner, Toast, ToastContainer } from 'react-bootstrap';
import TaskList from './components/TaskList.jsx';
import TaskForm from './components/TaskForm.jsx';
import TaskFilter from './components/TaskFilter.jsx';
import * as api from './services/api.js';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [filters, setFilters] = useState({ search: '', status: '', priority: '', sort: 'newest' });

  useEffect(() => { loadTasks(); }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const res = await api.getAllTasks();
      setTasks(res.data.data);
      setError('');
    } catch (err) {
      setError('Failed to load tasks. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleShowModal = (task = null) => {
    setTaskToEdit(task);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setTaskToEdit(null);
  };

  const handleSaveTask = async (taskData) => {
    try {
      if (taskData._id) {
        await api.updateTask(taskData._id, taskData);
        setToastMessage('Task updated successfully!');
      } else {
        await api.createTask(taskData);
        setToastMessage('Task created successfully!');
      }
      setShowToast(true);
      loadTasks();
      handleCloseModal();
    } catch (err) { setError('Failed to save task.'); }
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await api.deleteTask(id);
        setToastMessage('Task deleted successfully!');
        setShowToast(true);
        loadTasks();
      } catch (err) { setError('Failed to delete task.'); }
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await api.updateTaskStatus(id, status);
      setToastMessage('Task status updated!');
      setShowToast(true);
      loadTasks();
    } catch (err) { setError('Failed to update status.'); }
  };

  const filteredAndSortedTasks = useMemo(() => {
    return tasks
      .filter(task =>
        task.title.toLowerCase().includes(filters.search.toLowerCase()) &&
        (filters.status ? task.status === filters.status : true) &&
        (filters.priority ? task.priority === filters.priority : true)
      )
      .sort((a, b) => {
        if (filters.sort === 'dueDate') return new Date(a.dueDate) - new Date(b.dueDate);
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
  }, [tasks, filters]);

  return (
    <>
      <ToastContainer position="top-end" className="p-3">
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide bg="success">
          <Toast.Header><strong className="me-auto">Success</strong></Toast.Header>
          <Toast.Body className="text-white">{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
      <Container className="py-4">
        <header className="pb-3 mb-4 border-bottom">
          <h1 className="d-flex align-items-center text-dark text-decoration-none">📝 Task Manager</h1>
        </header>
        <Button onClick={() => handleShowModal()} className="mb-4 w-100">Add New Task</Button>
        {error && <Alert variant="danger">{error}</Alert>}
        <TaskFilter filters={filters} setFilters={setFilters} />
        {loading ? (
          <div className="text-center p-5"><Spinner animation="border" /></div>
        ) : (
          <TaskList tasks={filteredAndSortedTasks} onEdit={handleShowModal} onDelete={handleDeleteTask} onStatusChange={handleStatusChange} />
        )}
        <TaskForm show={showModal} onHide={handleCloseModal} onSave={handleSaveTask} taskToEdit={taskToEdit} />
      </Container>
    </>
  );
}

export default App;
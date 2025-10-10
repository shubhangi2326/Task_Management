const express = require('express');
const router = express.Router();
const { getAllTasks, createTask, getTaskById, updateTask, deleteTask, updateTaskStatus } = require('../controllers/taskController');
const { validateTask, validateStatus } = require('../middleware/validation');

router.route('/').get(getAllTasks).post(validateTask, createTask);
router.route('/:id').get(getTaskById).put(validateTask, updateTask).delete(deleteTask);
router.patch('/:id/status', validateStatus, updateTaskStatus);

module.exports = router;
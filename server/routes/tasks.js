// server/routes/tasks.js (YAHI FINAL CODE HAI)

import express from 'express';
import { getAllTasks, createTask, getTaskById, updateTask, deleteTask, updateTaskStatus } from '../controllers/taskController.js';
import { validateTask, validateStatus } from '../middleware/validation.js';

const router = express.Router();

router.route('/').get(getAllTasks).post(validateTask, createTask);
router.route('/:id').get(getTaskById).put(validateTask, updateTask).delete(deleteTask);
router.patch('/:id/status', validateStatus, updateTaskStatus);

export default router;
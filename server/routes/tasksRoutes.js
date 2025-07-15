const express = require('express');
const router = express.Router();
const { createTask, getMyTasks, getAllTasks, updateTask, deleteTask} = require('../controllers/taskController');
const { protect, authorize } = require('../middleware/auth');

router.post('/', protect, createTask);
router.get('/me', protect, getMyTasks);
router.get('/all', protect, authorize(["admin"]), getAllTasks);
router.put('/:id', protect, updateTask);
router.delete('/:id', protect, deleteTask);

module.exports = router;
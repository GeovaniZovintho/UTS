const express = require('express');
const taskController = require('../controllers/taskcontroller');
const { authMiddleware, validateTask } = require('../middleware/authmiddleware');

const router = express.Router();

router.use(authMiddleware);

router.post('/tasks',validateTask, taskController.createTask);
router.get('/tasks', taskController.getTasks);
router.put('/tasks/:id', taskController.updateTask);
router.delete('/tasks/:id', taskController.deleteTask);

module.exports = router;
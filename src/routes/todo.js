const express = require('express');
const {
  findAllDataTodo, createDataTodo, updateDataTodo, deleteDataTodo,
  findOneDataTodo,
} = require('../controllers/todo');
const authCheck = require('../middleware/authCheck');
const { validateTodoList } = require('../validator/todo/CreateTodo');

const router = express.Router();

router.get('/todos', authCheck, findAllDataTodo);
router.get('/todos/:id', authCheck, findOneDataTodo);
router.post('/todos', authCheck, validateTodoList, createDataTodo);
router.put('/todos/:id', authCheck, updateDataTodo);
router.delete('/todos/:id', authCheck, deleteDataTodo);

module.exports = router;
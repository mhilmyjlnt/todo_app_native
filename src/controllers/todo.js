const asyncHandler = require('express-async-handler');
const {
  createTodo, findAllTodo, updateTodo, deleteTodo,
  findOneTodo,
} = require('../services/todo');

const createDataTodo = asyncHandler(async (req, res) => {
  const { id } = req.user;
  console.log(req.body, 'property');
  const todo = await createTodo(req.body, id);
  res.status(201).json({
    status: 'success',
    message: 'Todo created',
    data: todo,
  });
});

const findAllDataTodo = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const todo = await findAllTodo(id);
  console.log(todo, 'todo');
  res.status(200).json({
    status: 'success',
    message: 'Todos found',
    data: todo,
  });
});

const findOneDataTodo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const todo = await findOneTodo(id);
  res.status(200).json({
    status: 'success',
    message: `Todo found with id ${id}`,
    data: todo,
  });
});

const updateDataTodo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const todo = await updateTodo(id, req.body);

  res.status(200).json({
    status: 'success',
    message: `Todo updated with id ${id}`,
    data: todo,
  });
});

const deleteDataTodo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await deleteTodo(id);
  res.status(200).json({
    status: 'success',
    message: `Todo deleted with id ${id}`,
  });
});

module.exports = {
  createDataTodo,
  findAllDataTodo,
  findOneDataTodo,
  updateDataTodo,
  deleteDataTodo,
};
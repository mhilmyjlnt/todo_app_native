const NotFoundError = require('../exeptions/NotFoundError');
const { TodoList } = require('../models');

const findAllTodo = async (userId) => {
  const todo = await TodoList.findAll({ where: { userId } });
  return todo;
};

const findOneTodo = async (id) => {
  const todo = await TodoList.findOne({ where: { id } });
  return todo;
};

const createTodo = async (todo, userId) => {
  const newTodo = await TodoList.create({ ...todo, userId });
  return newTodo;
};

const updateTodo = async (id, todo) => {
  const existingTodo = await TodoList.findOne({ where: { id } });

  if (!existingTodo) {
    throw new NotFoundError('Todo not found');
  }

  const updatedTodo = await existingTodo.update(todo);
  return updatedTodo;
};

const deleteTodo = async (id) => {
  const existingTodo = await TodoList.findOne({ where: { id } });

  if (!existingTodo) {
    throw new NotFoundError('Todo not found');
  }

  await existingTodo.destroy();
};

module.exports = {
  findAllTodo,
  findOneTodo,
  createTodo,
  updateTodo,
  deleteTodo,
};
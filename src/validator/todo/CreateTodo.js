const { body, validationResult } = require('express-validator');
const InvariantError = require('../../exeptions/InvariantError');

exports.validateTodoList = [
  body('task')
    .notEmpty()
    .withMessage('Task needs to be filled'),
  body('completed')
    .isBoolean()
    .withMessage('Completed must be a boolean value'),
  body('class')
    .notEmpty()
    .withMessage('Class needs to be filled'),

  (req, res, next) => {
    const errors = validationResult(req);
    console.log(errors, 'error');
    if (!errors.isEmpty()) {
      throw new InvariantError(errors.array()[0].msg);
    }
    next();
  },
];
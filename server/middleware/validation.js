const { body, validationResult } = require('express-validator');

const validateTask = [
  body('title')
    .notEmpty().withMessage('Title is required')
    .isString().withMessage('Title must be a string')
    .trim()
    .isLength({ max: 100 }).withMessage('Title cannot be more than 100 characters'),
  body('description')
    .notEmpty().withMessage('Description is required')
    .isString().withMessage('Description must be a string')
    .trim()
    .isLength({ max: 500 }).withMessage('Description cannot be more than 500 characters'),
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high']).withMessage('Invalid priority value'),
  body('dueDate')
    .notEmpty().withMessage('Due date is required')
    .isISO8601().withMessage('Due date must be a valid date')
    .toDate(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

const validateStatus = [
    body('status')
        .notEmpty().withMessage('Status is required')
        .isIn(['pending', 'in-progress', 'completed']).withMessage('Invalid status value'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = { validateTask, validateStatus };
import { body, validationResult } from 'express-validator';

export const validateTask = [
  body('title')
    .notEmpty().withMessage('Title is required')
    .trim(),
  body('description')
    .notEmpty().withMessage('Description is required')
    .trim(),
  body('dueDate')
    .notEmpty().withMessage('Due date is required')
    .isISO8601().withMessage('Due date must be a valid date'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

export const validateStatus = [
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
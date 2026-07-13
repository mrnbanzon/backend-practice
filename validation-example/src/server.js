import express from 'express';
import { body, validationResult } from 'express-validator';

const app = express();

app.use(express.json());

const createValidationStack = [
  body('username').isLength({ min: 3 }).withMessage('username must be atleast 3 characters long'),
  body('email').isEmail().withMessage('invalid email'),
  body('password').isLength({ min: 8 }).withMessage('password must be atleast 8 characters long')
];

app.post('/register', createValidationStack, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(`Errors in request: ${JSON.stringify(req.body)}`);
    return res.status(422).json({ errors: errors.array() });
  }

  // create user
  console.log(`Creating user...: ${JSON.stringify(req.body)}`);

  res.status(201).json({ ok: true });
})

app.listen(3000, () => {
  console.log('validation example server listening on 3000');
});
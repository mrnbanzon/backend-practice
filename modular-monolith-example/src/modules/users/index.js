import { Router } from 'express';

const router = Router();

router.route('/')
  .post((req, res) => {
    // Handle user creation
    res.send('User created');
  })

router.route('/:id')
  .get((req, res) => {
    // Handle user retrieval
    res.send(`User with ID ${req.params.id} retrieved`);
  })
  .put((req, res) => {
    // Handle user update
    res.send(`User with ID ${req.params.id} updated`);
  })
  .delete((req, res) => {
    // Handle user deletion
    res.send(`User with ID ${req.params.id} deleted`);
  })

export default router;
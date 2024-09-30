import type { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { ApplicationError } from '../errors/errors';
import userController from '../controllers/UserController';

const userRoutes = (app: any) => {
  app.post('/api/users/login', async (req: Request, res: Response) => {
    const username = req.body.username;
    const password = req.body.password;
    const user = await userController.getUserByUsername(username);

    try {
      if (await bcrypt.compare(password, user.password)) {
        res.send('Successfully logged in.')
      } else {
        res.send('Not allowed.')
      }
    } catch (e: any) {
      res.status(500).send();
    }
  });
  
  app.get('/api/users', async (req: Request, res: Response) => {
    const users = await userController.getUsers();
    res.send(users);    
  });
  
  app.post('/api/users', async (req: Request, res: Response) => {
    try {
      await userController.createUser(req.body);
      res.sendStatus(201);
    } catch (e: any) {
      res.status(500).send(e);
    }
  });

  app.put('/api/users/:id', async (req: Request, res: Response) => {
    const id = req.params.id
    
    try {
      await userController.updateUser(id, req.body);
      res.sendStatus(200)
    } catch (e: any) {
      if (e instanceof ApplicationError) {
        if (e.name === 'NOT_FOUND_ERROR') {
          res.status(404).send();
        }
      } 

      res.sendStatus(500);
    }
  });

  app.delete('/api/users/:id', async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      await userController.deleteUser(id);

      res.status(204).send();
    } catch (e: any) {
      if (e instanceof ApplicationError) {
        if (e.name === 'NOT_FOUND_ERROR') {
          res.status(404).send();
        }
      } 
      res.sendStatus(500);
    }
  });

  return app;
};

export default userRoutes;
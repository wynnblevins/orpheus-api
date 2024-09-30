import type { Request, Response } from 'express';
import { ApplicationError } from '../errors/errors';
import userController from '../controllers/UserController';

const userRoutes = (app: any) => {
  app.get('/api/users', async (req: Request, res: Response) => {
    const users = await userController.getUsers();
    res.send(users);    
  });
  
  app.get('/api/users/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    const userForID = await userController.getUserByID(id);

    if (!userForID) {
      res.status(404).send({ 
        error: `User with ID ${id} not found.` 
      });
    } else {
      res.send(userForID);
    }
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
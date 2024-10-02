import type { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ApplicationError } from '../errors/errors';
import userController from '../controllers/UserController';

const userRoutes = (app: any) => {
  app.post('/login', async (req: Request, res: Response) => {
    const user = await userController.getUserByUsername(req.body.username);
    
    const { username, password } = req.body;
    // Retrieve the stored hash from the database or file
    // Here, we'll use a hardcoded hash for demonstration purposes
    const storedHash = user.dataValues.password;
  
    bcrypt.compare(password, storedHash, (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Internal server error' });
      } else if (result) {
        const user = { name: username }
        // @ts-ignore
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
        res.status(200).json({ 
          message: 'Login successful',
          accessToken: accessToken
        });
      } else {
        res.status(401).json({ error: 'Invalid username or password' });
      }
    });
  
  });

  app.post('/users', async (req: Request, res: Response) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const user  = { 
        username: req.body.username, 
        password: hashedPassword
      };
      await userController.createUser(user);
      
      res.sendStatus(201);
    } catch (e: any) {
      res.status(500).send();
    }
  });

  return app;
};

export default userRoutes;
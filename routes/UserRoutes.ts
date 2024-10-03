import type { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ApplicationError } from '../errors/errors';
import userController from '../controllers/UserController';
import { generateAccessToken } from '../services/AuthenticationService';

// todo: move refresh tokens to db
let refreshTokens: any[] = [];

const userRoutes = (app: any) => {
  app.post('/login', async (req: Request, res: Response) => {
    const user = await userController.getUserByUsername(req.body.username);
    
    const { username, password } = req.body;
    const storedHash = user.dataValues.password;
  
    bcrypt.compare(password, storedHash, (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Internal server error' });
      } else if (result) {
        const user = { name: username }

        const accessToken = generateAccessToken(user);
        const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET as string);

        // todo: write refresh tokens to db
        refreshTokens.push(refreshToken);
        
        res.status(200).json({ 
          accessToken: accessToken,
          refreshToken: refreshToken,
        });
      } else {
        res.status(401).json({ error: 'Invalid username or password' });
      }
    });
  });

  app.delete('/logout', async (req: Request, res: Response) => {
    // todo: delete the refresh token from the DB
    refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
    res.sendStatus(204);
  });
  
  app.post('/token', async (req: Request, res: Response) => {
    const refreshToken = req.body.token;
    
    if (!refreshToken) {
      return res.sendStatus(401);
    }

    // todo: query refresh tokens to see if we have a record of this token
    if (!refreshTokens.includes(refreshToken)) {
      res.sendStatus(403);
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string, (err: any, user: any) => {
      if (err) return res.sendStatus(403);
      const accessToken = generateAccessToken({ name: user.name });
      res.json({ accessToken: accessToken });
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
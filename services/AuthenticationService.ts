import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import userService from './UserService';

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader?.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, async (err, user) => {
    if (err) return res.sendStatus(403);

    // @ts-ignore
    const fullUser = await userService.getUserByUsername(user?.username)

    // @ts-ignore
    req.user = fullUser;

    next();
  });
};

export default authenticateToken;
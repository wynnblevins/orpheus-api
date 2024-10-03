
import type { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import db from "../models";
import { Playlist } from "../controllers/PlaylistController";
import userController, { User } from "../controllers/UserController";

const authenticateToken = (req: Request, res: Response, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) 
    return res.sendStatus(401);

  // @ts-ignore
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
    if (err) return res.send(403);
  
    // @ts-ignore
    const currentUser = await userController.getUserByUsername(user?.name);
    
    // @ts-ignore
    req.user = currentUser;
    
    next();
  });
}

export default authenticateToken;
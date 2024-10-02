
import type { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import db from "../models";
import { Playlist } from "../controllers/PlaylistController";
import { User } from "../controllers/UserController";

const authenticateToken = (req: Request, res: Response, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) 
    return res.sendStatus(401);

  // @ts-ignore
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.send(403);
    // @ts-ignore
    req.user = user
    next();
  });
}

export default authenticateToken;
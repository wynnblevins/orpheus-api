const songsController = require('../controllers/SongController');
import type { Request, Response } from 'express';

const songRoutes = (app: any) => {
  app.get('/api/songs', (req: Request, res: Response) => {
    res.send(songsController.getSongs());
  });
  
  return app;
};

export default songRoutes;
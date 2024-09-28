const playlistController = require('../controllers/PlaylistController');
import type { Request, Response } from 'express';

const playlistRoutes = (app: any) => {  
  app.get('/api/playlists', (req: Request, res: Response) => {
    const allPlaylists = playlistController.getPlaylists();
    res.send(allPlaylists);
  });
  
  return app;
};

export default playlistRoutes;
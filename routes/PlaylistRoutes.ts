import type { Request, Response } from 'express';
import { ApplicationError } from '../errors/errors';
import playlistController from '../controllers/PlaylistController';
import authenticateToken from '../services/AuthenticationService';

const playlistRoutes = (app: any) => {
  app.get('/api/playlists', authenticateToken, async (req: Request, res: Response) => {
    // @ts-ignore
    const user = req.user;
    const playlists = await playlistController.getPlaylists(user);
    res.status(200).send(playlists);    
  });
  
  app.get('/api/playlists/:id', authenticateToken, async (req: Request, res: Response) => {
    const id = req.params.id;
    const playlistForID = await playlistController.getPlaylistByID(id);

    if (!playlistForID) {
      res.status(404).send({ 
        error: `Playlist with ID ${id} not found.` 
      });
    } else {
      res.status(200).send(playlistForID);
    }
  });

  app.post('/api/playlists', authenticateToken, async (req: Request, res: Response) => {
    try {
      const newPlaylist = await playlistController.createPlaylist(req.body);
      res.status(201).send(newPlaylist);
    } catch (e: any) {
      res.status(500).send(e);
    }
  });

  app.put('/api/playlists/:id', authenticateToken, async (req: Request, res: Response) => {
    const id = req.params.id
    
    try {
      await playlistController.updatePlaylist(id, req.body);
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

  app.delete('/api/playlists/:id', authenticateToken, async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      await playlistController.deletePlaylist(id);

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

export default playlistRoutes;
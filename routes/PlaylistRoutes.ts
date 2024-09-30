import type { Request, Response } from 'express';
import { ApplicationError } from '../errors/errors';
import playlistController from '../controllers/PlaylistController';

const playlistRoutes = (app: any) => {
  app.get('/api/playlists', async (req: Request, res: Response) => {
    const playlists = await playlistController.getPlaylists();
    res.send(playlists);    
  });
  
  app.get('/api/playlists/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    const playlistForID = await playlistController.getPlaylistByID(id);

    if (!playlistForID) {
      res.status(404).send({ 
        error: `Playlist with ID ${id} not found.` 
      });
    } else {
      res.send(playlistForID);
    }
  });

  app.post('/api/playlists', async (req: Request, res: Response) => {
    try {
      await playlistController.createPlaylist(req.body);
      res.sendStatus(201);
    } catch (e: any) {
      
      
      res.status(500).send(e);
    }
  });

  app.put('/api/playlists/:id', async (req: Request, res: Response) => {
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

  app.delete('/api/playlists/:id', async (req: Request, res: Response) => {
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
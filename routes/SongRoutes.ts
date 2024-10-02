import type { Request, Response } from 'express';
import songController from '../controllers/SongController';
import { ApplicationError } from '../errors/errors';
import authenticateToken from '../services/AuthenticationService';

const songRoutes = (app: any) => {
  app.get('/api/songs', authenticateToken, async (req: Request, res: Response) => {
    const songs = await songController.getSongs();
    res.send(songs);    
  });
  
  app.get('/api/songs/:id', authenticateToken, async (req: Request, res: Response) => {
    const id = req.params.id;
    const songForID = await songController.getSongByID(id);

    if (!songForID) {
      res.status(404).send({ 
        error: `Song with ID ${id} not found.` 
      });
    } else {
      res.send(songForID);
    }
  });

  app.post('/api/songs', authenticateToken, async (req: Request, res: Response) => {
    try {
      const result = await songController.createSong(req.body);
      res.status(201).send(result);
    } catch (e: any) {
      res.status(500).send(e);
    }
  });

  app.put('/api/songs/:id', authenticateToken, async (req: Request, res: Response) => {
    const id = req.params.id
    
    try {
      await songController.updateSong(id, req.body);
      res.sendStatus(200)
    } catch (e: any) {
      if (e instanceof ApplicationError) {
        if (e.name === 'NOT_FOUND_ERROR') {
          res.status(404).send();
        }
      } else {
        res.sendStatus(500);
      }
    }
  });

  app.delete('/api/songs/:id', authenticateToken, async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      await songController.deleteSong(id);

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

export default songRoutes;
import type { Request, Response } from 'express';
import songController from '../controllers/SongController';
import { ApplicationError } from '../errors/errors';

const songRoutes = (app: any) => {
  app.get('/api/songs', async (req: Request, res: Response) => {
    const songs = await songController.getSongs();
    res.send(songs);    
  });
  
  app.get('/api/songs/:id', async (req: Request, res: Response) => {
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

  app.post('/api/songs', async (req: Request, res: Response) => {
    try {
      await songController.createSong(req.body);
    } catch (e: any) {
      res.status(500).send(e);
    }

    res.sendStatus(201);
  });

  app.put('/api/songs/:id', async (req: Request, res: Response) => {
    const id = req.params.id
    
    try {
      await songController.updateSong(id, req.body);
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

  app.delete('/api/songs/:id', async (req: Request, res: Response) => {
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
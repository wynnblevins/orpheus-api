const userController = require('../controllers/UserController');
import type { Request, Response } from 'express';

module.exports = (app: any) => {  
  app.get('/api/users', function(req: Request, res: Response){
    const allUsers = userController.getArtists();
    res.send(allUsers);
  });
  
  return app;
};
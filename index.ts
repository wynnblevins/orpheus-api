import express from 'express';
import db from './models';
import artistRoutes from './routes/PlaylistRoutes';
import songRoutes from './routes/SongRoutes';
import playlistRoutes from './routes/PlaylistRoutes';

const port = process.env.PORT || 3000;

db.sequelize.sync().then(() => {
  let app = express();
  app.use(express.json())  
  
  app = artistRoutes(app);
  app = songRoutes(app);
  app = playlistRoutes(app);

  app.listen(port, () => {
    console.log(`App listening on port ${port}`)
  })
})
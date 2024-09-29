
import db from "../models";
import { Song } from "../controllers/SongController";

const songService = {
  getSongs: async () => {
    const songs = await db.Song.findAll({});
    return songs;
  },

  getSongByID: async (id: string) => {
    const song = await db.Song.findOne({ 
      where: {
        id: id
      }
    });
    return song;
  },

  createSong: async (song: Song) => {
    try {
      await db.Song.create({
        ...song
      });
    } catch (e: any) {
      throw new Error(
        'Error encountered while inserting song record.'
      );
    }
  },

  updateSong: async (id: string, updatedSong: Song) => {    
    var values = { 
      ...updatedSong
    };
    var selector = { 
      where: {
        id: id        
      }
    };
    await db.Song.update(values, selector);
  },

  deleteSong: async (id: string) => {
    await db.Song.destroy({
      where: { 
        id: id  
      }
    });
  }
};

export default songService;
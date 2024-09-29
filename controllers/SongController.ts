// const songService = require('../services/SongService');
import { ApplicationError } from '../errors/errors';
import songService from '../services/SongService';

export interface Song {
  id: string,
  name: string,
}

const songController = {
  getSongs: async () => {
    const songs = await songService.getSongs();
    return songs;
  },

  getSongByID: async (id: string) => {
    const song = await songService.getSongByID(id);
    return song;
  },

  createSong: async (song: Song) => {
    return await songService.createSong(song);
  },

  updateSong: async (id: string, updatedSong: Song) => {
    const song = await songService.getSongByID(id);

    if (song) {
      return await songService.updateSong(id, updatedSong);
    }
    
    throw new ApplicationError({ 
      name: 'NOT_FOUND_ERROR', 
      message: `Song for id ${id} not found.`
    });
  },

  deleteSong: async (id: string) => {
    const song = await songService.getSongByID(id);

    if (song) {
      return await songService.deleteSong(song.id);
    } 

    throw new ApplicationError({ 
      name: 'NOT_FOUND_ERROR', 
      message: `Song for id ${id} not found.`
    });
  },
}

export default songController;
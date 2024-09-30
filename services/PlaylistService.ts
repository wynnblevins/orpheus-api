
import db from "../models";
import { Playlist } from "../controllers/PlaylistController";

const playlistService = {
  getPlaylists: async () => {
    const playlists = await db.Playlist.findAll({});
    return playlists;
  },

  getPlaylistByID: async (id: string) => {
    const playlist = await db.Song.findOne({ 
      where: {
        id: id
      }
    });
    return playlist;
  },

  createPlaylist: async (playlist: Playlist) => {
    try {
      await db.Playlist.create({
        ...playlist
      });
    } catch (e: any) {
      throw new Error(
        'Error encountered while inserting playlist record.'
      );
    }
  },

  updatePlaylist: async (id: string, updatedPlaylist: Playlist) => {    
    var values = { 
      ...updatedPlaylist
    };
    var selector = { 
      where: {
        id: id        
      }
    };
    await db.Playlist.update(values, selector);
  },

  deletePlaylist: async (id: string) => {
    await db.Playlist.destroy({
      where: { 
        id: id  
      }
    });
  }
};

export default playlistService;
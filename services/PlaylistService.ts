
import db from "../models";
import { Playlist } from "../controllers/PlaylistController";
import { User } from "../controllers/UserController";

const playlistService = {
  getPlaylists: async (user: User) => {
    const playlists = await db.Playlist.findAll({
      where: {
        UserId: user.id
      }
    });
    
    return playlists;
  },

  getPlaylistByID: async (id: string) => {
    const playlist = await db.Playlist.findOne({ 
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
      return playlist;
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
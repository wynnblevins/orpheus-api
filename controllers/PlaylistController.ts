import { ApplicationError } from "../errors/errors";
import playlistService from "../services/PlaylistService";
import { User } from "./UserController";

export interface Playlist {
  id: string,
  name: string,
  username: string
}

const playlistController = {
  getPlaylists: async (user: User) => {
    const playlists = await playlistService.getPlaylists(user);
    return playlists;
  },

  getPlaylistByID: async (id: string) => {
    const playlist = await playlistService.getPlaylistByID(id);
    return playlist;
  },

  createPlaylist: async (playlist: Playlist) => {
    return await playlistService.createPlaylist(playlist);
  },

  updatePlaylist: async (id: string, updatedPlaylist: Playlist) => {
    const playlist = await playlistService.getPlaylistByID(id);

    if (playlist) {
      return await playlistService.updatePlaylist(id, updatedPlaylist);
    }
    
    throw new ApplicationError({ 
      name: 'NOT_FOUND_ERROR', 
      message: `Playlist for id ${id} not found.`
    });
  },

  deletePlaylist: async (id: string) => {
    const playlist = await playlistService.getPlaylistByID(id);

    if (playlist) {
      return await playlistService.deletePlaylist(playlist.id);
    } 

    throw new ApplicationError({ 
      name: 'NOT_FOUND_ERROR', 
      message: `Playlist for id ${id} not found.`
    });
  },
}

export default playlistController;
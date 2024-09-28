const playlistService = require('../services/PlaylistService');

module.exports = {
  getPlaylists: () => {
    return playlistService.getPlaylists(); 
  }
}
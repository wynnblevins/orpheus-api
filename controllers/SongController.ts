const songService = require('../services/SongService');

module.exports = {
  getSongs: () => {
    return songService.getSongs();
  }
}
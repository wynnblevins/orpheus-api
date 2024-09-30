'use strict';

import { UUIDV4 } from "sequelize";
const {
  Model
} = require('sequelize');
const { Playlist } = require('./playlist');

export interface Song {
  id: string,
  name: string,
  playlistId: string,
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Song extends Model<Song> {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      Song.belongsTo(models.Playlist);
    }
  };
  Song.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: DataTypes.STRING,
    PlaylistId: {
      type: DataTypes.UUID,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Song',
  });
  return Song;
};
'use strict';

import {
  Model, UUIDV4
} from 'sequelize';

export interface PlaylistAttributes {
  id: string;
  name: string;
  UserId: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Playlist extends Model<PlaylistAttributes> 
  implements PlaylistAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: string;
    name!: string;
    UserId!: string;
    static associate(models: any) {
      Playlist.belongsTo(models.User);
      Playlist.hasMany(models.Song);
    }
  };
  Playlist.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    UserId: {
      type: DataTypes.UUID,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Playlist',
  });
  return Playlist;
};
import { ApplicationError } from '../errors/errors';
import userService from '../services/UserService';

export interface User {
  id: string,
  username: string,
  password: string
}

const userController = {
  getUsers: async () => {
    const users = await userService.getUsers();
    return users;
  },

  getUserByID: async (id: string) => {
    const users = await userService.getUserByID(id);
    return users;
  },

  getUserByUsername: async (username: string) => {
    const user = await userService.getUserByUsername(username);
    return user;
  },

  createUser: async (user: User) => {
    return await userService.createUser(user);
  },

  updateUser: async (id: string, updatedUser: User) => {
    const user = await userService.getUserByID(id);

    if (user) {
      return await userService.updateUser(id, updatedUser);
    }
    
    throw new ApplicationError({ 
      name: 'NOT_FOUND_ERROR', 
      message: `User for id ${id} not found.`
    });
  },

  deleteUser: async (id: string) => {
    const user = await userService.getUserByID(id);

    if (user) {
      return await userService.deleteUser(user.id);
    } 

    throw new ApplicationError({ 
      name: 'NOT_FOUND_ERROR', 
      message: `User for id ${id} not found.`
    });
  },
}

export default userController;

import db from "../models";
import { User } from "../controllers/UserController";

const userService = {
  getUsers: async () => {
    const users = await db.User.findAll({});
    return users;
  },

  getUserByID: async (id: string) => {
    const user = await db.User.findOne({ 
      where: {
        id: id
      }
    });
    return user;
  },

  createUser: async (user: User) => {
    try {
      await db.User.create({
        ...user
      });
    } catch (e: any) {
      throw new Error(
        'Error encountered while inserting user record.'
      );
    }
  },

  updateUser: async (id: string, updatedUser: User) => {    
    var values = { 
      ...updatedUser
    };
    var selector = { 
      where: {
        id: id        
      }
    };
    await db.User.update(values, selector);
  },

  deleteUser: async (id: string) => {
    await db.User.destroy({
      where: { 
        id: id  
      }
    });
  }
};

export default userService;
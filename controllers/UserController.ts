const userService = require('../services/UserService');

module.exports = {
  getUsers: () => {
    return userService.getUsers(); 
  }
};
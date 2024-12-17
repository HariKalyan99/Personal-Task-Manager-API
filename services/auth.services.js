const user = require("../db/models/user");

class Auth {
  userSignup = async (body) => {
    try {
      const newUser = await user.create({
        ...body,
      });
      return newUser;
    } catch (error) {
      throw error;
    }
  };

  userLogin = async (email) => {
    try {
      const result = await user.findOne({ where: { email } });
      return result;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = Auth;
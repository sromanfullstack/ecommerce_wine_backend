const bcrypt = require("bcryptjs");

const encryptPassword = (password) => {
  try {
    let encryptedPassword = bcrypt.hashSync(password);
    return encryptedPassword;
  } catch (error) {
    throw error;
  }
};

const comparePassword = (password1, password2) => {
  try {
    const compare =  bcrypt.compareSync(password1, password2);
    return compare;
  } catch (error) {
    throw error;
  }
};

const getToken = (Authorization) => {
  try {
    const token = Authorization.split("Bearer ")[1];
    return token;
  } catch (error) {
    throw { code: 401, message: "token not found" };
  }
};

module.exports = {
  encryptPassword,
  comparePassword,
  getToken
};

const db = require('../connection');
const Sequelize = require('sequelize');
const defaultTheme = 1;

const UserModel = db.define('users', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  oAuthUserId: {
    type: Sequelize.INTEGER
  },
  oAuthProvider: {
    type: Sequelize.STRING(32)
  },
  email: {
    type: Sequelize.STRING(64),
    unique: true,
    validate: {
      isEmail: true
    }
  },
  username: {
    type: Sequelize.STRING(64),
    unique: true
  },
  password: {
    type: Sequelize.STRING(64)
  },
  theme: {
    type: Sequelize.INTEGER(4)
  },
  name: {
    type: Sequelize.STRING(64)
  },
  handle: {
    type: Sequelize.STRING(32),
    unique: true
  },
  avatarUrl: {
    type: Sequelize.STRING(64)
  },
  description: {
    type: Sequelize.STRING(256)
  }
});

let User = {model: UserModel};

User.create = ({oAuthUserId, oAuthProvider, email, username, password, name, handle, avatarUrl, description}) => {
  if (oAuthUserId && oAuthProvider) {
    if (username) {
      return new Promise((resolve, reject) => {
        reject('Cannot create oAuth account with local username');
      });
    }
    if (password) {
      return new Promise((resolve, reject) => {
        reject('Cannot create oAuth account with local password');
      });
    }
  } else if (email && username && password) {
    if (oAuthUserId) {
      return new Promise((resolve, reject) => {
        reject('Cannot create local auth account with oAuth ID');
      });
    }
    if (oAuthProvider) {
      return new Promise((resolve, reject) => {
        reject('Cannot create local auth account with oAuth provider');
      });
    }
  } else {
    return new Promise((resolve, reject) => {
      reject('Cannot create account without neither oAuth nor local auth credentials');
    });
  }
  return User.model.create({
    oAuthUserId,
    oAuthProvider,
    email,
    username,
    password,
    theme: defaultTheme,
    name,
    handle,
    avatarUrl,
    description
  });
};
User.update = (userId, {theme, }) => {};
User.getByEmail = () => {};
User.getByName = () => {};
User.getById = () => {};

module.exports = User;
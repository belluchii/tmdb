const db = require("../db");
const bcrypt = require("bcrypt");
const DataTypes = require("sequelize");

class User extends DataTypes.Model {
  encryptedPW = (password, salt) => bcrypt.hash(password, salt);
  validatePassword = (password) => {
    return bcrypt
      .hash(password, this.salt)
      .then((hash) => hash === this.password);
  };
}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    favs: { type: DataTypes.ARRAY(DataTypes.INTEGER), defaultValue: [] },
    salt: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: db,
    modelName: "user",
  }
);
User.addHook("beforeCreate", (user) => {
  user.salt = bcrypt.genSaltSync(8);
  return user
    .encryptedPW(user.password, user.salt)
    .then((hash) => (user.password = hash));
});

module.exports = User;

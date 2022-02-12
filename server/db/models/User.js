const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = db.define("user", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
    set(val) {
      this.setDataValue("email", val.toLowerCase());
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // avinodeUserName: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  // },
  // avinodePassword: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  // },
  // flightListProUserName: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  // },
  // flightListProPassword: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  // },
});

module.exports = User;

User.prototype.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

User.prototype.generateToken = function () {
  return JWT.sign({ id: this.id }, process.env.JWT_SECRET, {});
};

User.authenticate = async function ({ email, password }) {
  email = email.toLowerCase();
  const user = await User.findOne({
    where: { email },
  });
  if (!user || !(await user.validPassword(password))) {
    const err = new Error("Invalid email or password");
    err.status = 401;
    throw err;
  }
  return user.generateToken();
};

User.findByToken = async function (token) {
  try {
    const { id } = JWT.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (err) {
    const error = new Error("Invalid token");
    error.status = 401;
    throw error;
  }
};

//hooks

const hashPassword = async user => {
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
};

User.beforeCreate(hashPassword);
User.beforeUpdate(hashPassword);
User.beforeBulkCreate(users => {
  Promise.all(users.map(hashPassword));
});

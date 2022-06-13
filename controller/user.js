const Validator = require('fastest-validator');
const { user } = require('../models');
const valid = new Validator();

let userID;

//Function Tambah User
exports.addUser = async (req, res) => {
  const schema = {
    username: 'string',
    email: 'string',
    password: 'string',
  };

  const validate = valid.validate(req.body, schema);

  if (validate.length) {
    return res.status(400).json(validate);
  }

  const username = await user.create(req.body);
  res.json(username);
};

//Function Update User [with PUT]
exports.replaceData = async (req, res) => {
  const id = req.params.id;
  userID = await user.findByPk(id);

  if (!userID) {
    return res.json({ message: 'User Not Found!' });
  }

  const schema = {
    username: 'string|optional',
    email: 'string|optional',
    password: 'string|optional',
  };

  const validate = valid.validate(req.body, schema);

  if (validate.length) {
    return res.status(400).json(validate);
  }

  userID = await userID.update(req.body);
  res.json(userID);
};

//Function Show All User
exports.showUser = async (req, res) => {
  userID = await user.findAll();
  return res.json(userID);
};

//Function Show User by ID
exports.showUserByID = async (req, res) => {
  const id = req.params.id;
  const userID = await user.findByPk(id);
  return res.json(userID || {});
};

exports.deleteUser = async (req, res) => {
  const id = req.params.id;
  userID = await user.findByPk(id);

  if (!userID) {
    return res.json({ message: 'User Not Found!' });
  }

  await userID.destroy();

  res.json({ message: 'User was Deleted!' });
};

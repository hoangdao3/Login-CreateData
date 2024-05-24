const db = require('../models/index');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const hashPassword = (password) => {
  return crypto.createHash('sha256').update(password).digest('hex').toString();
};

const registerUser = async (req, res) => {
    try {
    const { username, password } = req.body;
    const userExists = await db.User.findOne({
      where: { username }
    });
    const tex = hashPassword(password)
    console.log(tex);
    if (userExists) {
      return res.status(400).send('Username already exists, please use another one');
    }
    await db.User.create({
      username,
      password: tex, 
    });
    return res.status(200).send('Registration successful');
  } catch (err) {
    console.error('Error in registering user:', err);
    return res.status(500).send('Error in registering user');
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await db.User.findOne({
      where: { username }
    });
    if (!user) {
      return res.status(400).send({
        "result" : "failed"
      });
    }

    const hashedPassword = hashPassword(password);
    console.log(password);
    console.log(hashedPassword)
    if (user.password != hashedPassword) {
      return res.status(400).send({"result" : "failed"});
      
    }

    await user.update({
      loggedIn: 1,
      loggedAt: new Date()
    });

    const token = jwt.sign({ userId: user.userId }, 'secret_key', { expiresIn: '1h' });
    return res.status(200).send({ "result": 'success', token });
  } catch (err) {
    console.error('Error in logging in user:', err);
    return res.status(500).send('Error in logging in user');
  }
};

module.exports = { registerUser, loginUser };

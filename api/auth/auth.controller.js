const User = require('../models/user.model');

exports.login = (req, res) => {
  res.send('login');
};

exports.register = (req, res) => {
  const { email, password } = req.body;
  const user = new User({
    email,
    password
  });

  User.find({ email: user.email })
    .then(duplicateUsers => {
      if (duplicateUsers.length > 0) {
        return res.status(500).json({
          message: 'Email is already in use'
        });
      } else {
        return user.save();
      }
    })
    .then(response => {
      res.status(200).json({
        message: 'User successfully added',
        user: response
      });
    })
    .catch(e => {
      console.log(e);
    });
};

exports.logout = (req, res) => {
  res.send('logout');
};

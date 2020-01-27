const User = require('../user/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
  const { email, password } = req.body;

  User.find({ email }, '_id email password')
    .then(response => {
      const user = response[0];
      if (!user) {
        return res
          .status(400)
          .json({ message: 'Email/Password is not recognized' });
      }

      bcrypt.compare(password, user.password, (err, result) => {
        if (err !== null || !result) {
          return res
            .status(400)
            .json({ message: 'Email/Password is not recognized' });
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWTSECRET, {
          expiresIn: '1d'
        });

        res.status(200).json({
          message: 'Succefully Logged In',
          user: {
            _id: user._id,
            email: user.email,
            token
          }
        });
      });
    })
    .catch(e => {
      res.status(500).json({
        message: 'Oh no! Something went wrong!',
        error: e
      });
    });
};

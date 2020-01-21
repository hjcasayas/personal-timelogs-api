const User = require('./user.model');
const bcrypt = require('bcryptjs');
const sanitizeHTML = require('sanitize-html');

exports.register = (req, res) => {
  const { email, password, confirmPassword } = req.body;

  User.find({ email: email.trim() })
    .then(async duplicateUsers => {
      if (duplicateUsers.length > 0) {
        return res.status(500).json({
          message: 'Email is already in use'
        });
      }

      if (password !== confirmPassword) {
        return res.status(500).json({
          message: 'Passwords does not much'
        });
      }

      bcrypt.genSalt(10, (err, salt) => {
        if (err !== null) {
          return res.status(500).json({
            message: 'Oh no! Something went wrong.'
          });
        }

        bcrypt.hash(password, salt, (err, hash) => {
          if (err !== null) {
            return res.status(500).json({
              message: 'Oh no! Something went wrong.'
            });
          }

          const user = new User({
            email: sanitizeHTML(email.trim()),
            password: hash
          });

          user
            .save()
            .then(response => {
              res.status(200).json({
                message: 'User successfully added',
                user: {
                  _id: response._id,
                  email: response.email
                }
              });
            })
            .catch(e => {
              res.status(500).json({
                message: 'Oh no! Something went wrong.',
                error: e
              });
            });
        });
      });
    })
    .catch(e => {
      res.status(500).json({
        message: 'Oh no! Something went wrong.',
        error: e
      });
    });
};

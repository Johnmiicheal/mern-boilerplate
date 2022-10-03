/* eslint-disable camelcase */
const express = require('express');
const { User } = require('../database/schemas');

const router   = express.Router();

module.exports = router;

router.post('/checkuser', (req, res) => {
  const email = req.body.email.toLowerCase();
  const admin_name = req.body.admin_name.toLowerCase();

  User.find({ email, admin_name }, (err, users) => {
    if (err) {
      res.status(400).send({ message: 'Check User failed', err, email });
    }
    if (users && users[0]) {
      res.send({ available: false, message: 'User exists', admin_name });
    } else {
      res.send({ available: true, message: 'User available', admin_name });
    }
  });
});

/* eslint-disable camelcase */
const express = require('express');
const { User } = require('../database/schemas');

const router   = express.Router();

module.exports = router;

router.post('/checkuser', (req, res) => {
  const email = req.body.email.toLowerCase();
  const adminName = req.body.adminName.toLowerCase();

  User.find({ email }, (err, users) => {
    if (err) {
      res.status(400).send({ message: 'Check User failed', err, email });
    }
    if (users && users[0]) {
      res.send({ available: false, message: 'User exists', adminName, email });
    } else {
      res.send({ available: true, message: 'User available', adminName, email });
    }
  });
});

router.post('/checknumber', (req, res) => {
  const phoneNumber = req.body.phoneNumber.toLowerCase();

  User.find({ phoneNumber }, (err, users) => {
    if (err) {
      res.status(400).send({ message: 'Check Number failed', err, phoneNumber });
    }
    if (users && users[0]) {
      res.send({ available: false, message: 'Phone Number exists', phoneNumber });
    } else {
      res.send({ available: true, message: 'Phone Number available', phoneNumber });
    }
  });
});

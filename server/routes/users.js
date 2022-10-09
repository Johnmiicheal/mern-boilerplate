/* eslint-disable camelcase */
const express = require('express');
const { User } = require('../database/schemas');

const router   = express.Router();

module.exports = router;

router.post('/checkuser', (req, res) => {
  const adminName = typeof req.body.email === 'string' ? req.body.email.toLowerCase() : req.body.email;
  User.find({ adminName }, (err, users) => {
    if (err) {
      res.status(400).send({ message: 'Check User failed', err, adminName });
    }
    if (users && users[0]) {
      res.send({ available: false, message: 'User exists', adminName });
    } else {
      res.send({ available: true, message: 'User available', adminName });
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

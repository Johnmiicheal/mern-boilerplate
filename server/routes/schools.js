const express = require('express');
const { requireAuth } = require('./middleware');
const { School } = require('../database/schemas');

const router   = express.Router();

module.exports = router;

router.get('/', requireAuth, (req, res) => {
  School.find({ user: req.user.id }, { __v: 0, user: 0 }, (err, schools) => {
    if (err) {
      res.status(400).send({ message: 'Get schools failed', err });
    } else {
      res.send({ message: 'schools retrieved successfully', schools });
    }
  });
});

router.post('/', requireAuth, (req, res) => {
  req.body.user = req.user.id;

  const newSchool = School(req.body);

  newSchool.save((err, savedSchool) => {
    if (err) {
      res.status(400).send({ message: 'Create school failed', err });
    } else {
      res.send({ message: 'school created successfully', school: savedSchool });
    }
  });
});

router.put('/complete', requireAuth, (req, res) => {
  School.findById(req.body.id, { __v: 0, user: 0 }, (err, school) => {
    if (err) {
      res.status(400).send({ message: 'Toggle school failed', err });
    } else {
      school.completed = !school.completed;
      school.save((err, savedschool) => {
        if (err) {
          res.status(400).send({ message: 'Toggle school failed', err });
        } else {
          res.send({ message: 'Toggled complete school successfully', school: savedschool });
        }
      });
    }
  });
});

router.put('/', requireAuth, (req, res) => {
  School.findById(req.body.id, { __v: 0, user: 0 }, (err, school) => {
    if (err) {
      res.status(400).send({ message: 'Update school failed', err });
    } else {
      school.text = req.body.text;
      school.updated_at = Date.now();
      school.save((err, savedschool) => {
        if (err) {
          res.status(400).send({ message: 'Update school failed', err });
        } else {
          res.send({ message: 'Updated school successfully', school: savedschool });
        }
      });
    }
  });
});

router.delete('/', requireAuth, (req, res) => {
  School.findByIdAndRemove(req.body.id, err => {
    if (err) {
      res.status(400).send({ message: 'Delete school failed', err });
    } else {
      res.send({ message: 'school successfully delete' });
    }
  });
});

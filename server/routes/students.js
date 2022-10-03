const express = require('express');
const { requireAuth } = require('./middleware');
const { Student } = require('../database/schemas');

const router   = express.Router();

module.exports = router;

router.get('/', requireAuth, (req, res) => {
  Student.find({ user: req.user.id }, { __v: 0, user: 0 }, (err, students) => {
    if (err) {
      res.status(400).send({ message: 'Get Students failed', err });
    } else {
      res.send({ message: 'Students retrieved successfully', students });
    }
  });
});

router.post('/', requireAuth, (req, res) => {
  req.body.user = req.user.id;

  const newStudent = Student(req.body);

  newStudent.save((err, savedStudent) => {
    if (err) {
      res.status(400).send({ message: 'Create student failed', err });
    } else {
      res.send({ message: 'student created successfully', student: savedStudent });
    }
  });
});

router.put('/complete', requireAuth, (req, res) => {
  Student.findById(req.body.id, { __v: 0, user: 0 }, (err, student) => {
    if (err) {
      res.status(400).send({ message: 'Toggle student failed', err });
    } else {
      student.completed = !student.completed;
      student.save((err, savedStudent) => {
        if (err) {
          res.status(400).send({ message: 'Toggle student failed', err });
        } else {
          res.send({ message: 'Toggled complete student successfully', student: savedStudent });
        }
      });
    }
  });
});

router.put('/', requireAuth, (req, res) => {
  Student.findById(req.body.id, { __v: 0, user: 0 }, (err, student) => {
    if (err) {
      res.status(400).send({ message: 'Update student failed', err });
    } else {
      student.text = req.body.text;
      student.updated_at = Date.now();
      student.save((err, savedStudent) => {
        if (err) {
          res.status(400).send({ message: 'Update student failed', err });
        } else {
          res.send({ message: 'Updated student successfully', student: savedStudent });
        }
      });
    }
  });
});

router.delete('/', requireAuth, (req, res) => {
  Student.findByIdAndRemove(req.body.id, err => {
    if (err) {
      res.status(400).send({ message: 'Delete student failed', err });
    } else {
      res.send({ message: 'student successfully delete' });
    }
  });
});

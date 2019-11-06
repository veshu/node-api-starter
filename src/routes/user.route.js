const express = require('express');
const validate = require('express-validation');
const controller = require('../controllers/user.controller');
const {
  listUsers,
  createUser,
} = require('../validations/user.validation');

const router = express.Router();

router
  .route('/')
  .get(validate(listUsers), controller.search)
  .post(validate(createUser), controller.create);

module.exports = router;

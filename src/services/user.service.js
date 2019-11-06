// const { omit } = require('lodash');
const User = require('../models/user.model');
const errors = require('../common/APIError');

/**
 * Create new user
 * @public
 */
exports.create = async (data) => {
  if (User.count({
    email: data.email,
  })) {
    throw errors.ValidationError([{
      field: 'email',
      location: 'body',
      messages: ['"email" already exists'],
    }]);
  }
  const user = new User(data);
  const savedUser = await user.save();
  return savedUser.transform();
};

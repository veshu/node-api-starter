const Joi = require('joi');

module.exports = {

  listUsers: {
    query: {
      page: Joi.number().min(1).default(1),
      perPage: Joi.number().min(1).max(100).default(10),
      handle: Joi.string(),
    },
  },

  createUser: {
    body: {
      handle: Joi.string().required(),
    },
  },
};

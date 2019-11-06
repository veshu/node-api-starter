const passport = require('passport');
const User = require('../models/user.model');
const errors = require('../common/APIError');

const ADMIN = 'admin';
const LOGGED_USER = '_loggedUser';


const handleJWT = (req, res, next) => async (err, user, info) => {
  const error = err || info;
  const logIn = Promise.promisify(req.logIn);
  const apiError = errors.UnauthorizedError;
  try {
    if (error || !user) throw error;
    await logIn(user, { session: false });
  } catch (e) {
    return next(apiError);
  }

  req.user = user;

  return next();
};

exports.ADMIN = ADMIN;
exports.LOGGED_USER = LOGGED_USER;

exports.authorize = (roles = User.roles) => (req, res, next) => passport.authenticate(
  'jwt', { session: false },
  handleJWT(req, res, next, roles),
)(req, res, next);

exports.oAuth = (service) => passport.authenticate(service, { session: false });

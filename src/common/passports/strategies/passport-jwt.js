/**
 * Register JWT passport strategy.
 */
const config = require('config');
const jwt = require('jsonwebtoken');
const BearerStrategy = require('passport-http-bearer');

const {
  UnauthorizedError,
} = require('../../APIError');


/**
 * Export jwt passport strategy
 * @param passport the passport
 */
module.exports = (passport) => {
  passport.use(
    'jwt',
    new BearerStrategy((token, done) => {
      jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
        if (err) {
          done(UnauthorizedError);
        } else if (decoded) {
          done(null, decoded);
        } else {
          done(null, false);
        }
      });
    }),
  );
};

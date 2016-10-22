/**
 * notLoggedIn
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = function(req, res, next) {

  // User is allowed
  if (!req.session.user) {
    return next();
  }

  if(req.session.admin) return res.redirect('/list')
  return res.redirect('/form');
};

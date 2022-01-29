// middware to redirect the user to login if not logged in
// its passed to to where authentication is required
const reqAuth = (req, res, next) => {
    if (!req.session.isLoggedIn) {
      res.redirect('/signin');
    } else {
      next();
    }
};
module.exports = reqAuth;
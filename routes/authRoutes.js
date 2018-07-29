const passport = require('passport');

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      // Not sure why double equals works
      // Really hacky!
      if (req.user._id == '5b5d085560cd313ab45be5a9') {
        console.log(req.user);
        res.redirect(`/nonprofit_dashboard`);
      } else {
        res.redirect(`/user_dashboard`);
      }
    }
  );

  app.get('/auth/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/api/current_user', (req, res) => {
    console.log(req.user, 'CURRENT_USER');
    res.send(req.user);
  });
};

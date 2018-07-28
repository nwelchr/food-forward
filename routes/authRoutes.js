const passport = require('passport')

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  )

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      console.log('opwjefpojwefpojwepofjwe')
      console.log(req.user)
      if (req.user.googleId === '117028808660169665117') {
        return res.redirect('/non_profit_dashboard')
      }
      res.redirect('/blogs')
    }
  )

  app.get('/auth/logout', (req, res) => {
    req.logout()
    res.redirect('/')
  })

  app.get('/api/current_user', (req, res) => {
    res.send(req.user)
  })
}

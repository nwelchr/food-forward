const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const keys = require('../config/keys')

const User = mongoose.model('User')
const Nonprofit = mongoose.model('Nonprofit')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user)
  })
})

passport.use(
  new GoogleStrategy(
    {
      callbackURL: '/auth/google/callback',
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // if the person signing in is the admin
        if (profile.id === '117028808660169665117') {
          const existingNonprofit = await Nonprofit.findOne({
            googleId: profile.id
          })
          if (existingNonprofit) return done(null, existingNonprofit)

          const nonprofit = await new Nonprofit({
            googleId: profile.id,
            displayName: profile.displayName,
            neededItems: null
          }).save()

          return done(null, nonprofit)
        }

        const existingUser = await User.findOne({ googleId: profile.id })

        if (existingUser) return done(null, existingUser)

        const user = await new User({
          googleId: profile.id,
          displayName: profile.displayName
        }).save()
        done(null, user)
      } catch (err) {
        done(err, null)
      }
    }
  )
)

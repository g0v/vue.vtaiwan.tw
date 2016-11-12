process.env.VUE_ENV = 'server'

const path = require('path')
const resolve = file => path.resolve(__dirname, file)
const express = require('express')
const favicon = require('serve-favicon')
const render = require('./render')
// passport
const passport = require('passport')
const passportDiscourse = require('passport-discourse').Strategy

const app = express()

app.use('/dist', express.static(resolve('./dist')))
app.use(favicon(resolve('./src/assets/logo.png')))
app.use(require('express-session')({
  secret: process.env.SECRET,
  resave: true,
  saveUninitialized: true,
}))
app.use(passport.initialize())
app.use(passport.session())

passport.use(new passportDiscourse({
  secret: process.env.SECRET,
  discourse_url: 'https://talk.vtaiwan.tw',
  debug: false,
}, function(accessToken, refreshToken, profile, done) {
  done(null, profile)
}))

passport.serializeUser(function(user, done) {
  done(null, user.email);
});

passport.deserializeUser(function(id, done) {
  done(null, id);
});

app.get('/auth/discourse_sso', passport.authenticate('discourse'))
app.get(passportDiscourse.route_callback, passport.authenticate('discourse', {
  successRedirect: '/',
  failureRedirect: '/',
}))


app.get('*', render)

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`server started at localhost:${port}`)
})

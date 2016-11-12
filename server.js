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

app.get('*', render)

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`server started at localhost:${port}`)
})

const express = require('express')
const path = require('path')
const hbs = require('express-handlebars')
const helpers = require('handlebars-helpers')();
const morgan = require('morgan');
const methodOverride = require('method-override')
const userRouter = require('./routes/userRoutes')
const router= require('./routes/routes')
const session = require('express-session')
const flash = require('connect-flash')


const app = express ()

// connect db
require('./database/dbConnect');


//settings handlebars
app.set('views', path.join(__dirname, 'views'))

app.engine('.hbs', hbs({
    helpers,
    defaultLayout: 'main',
    layoutsDir:path.join(app.get('views'),'layouts'),
    partialsDir:path.join(app.get('views'),'partials'),
    extname: '.hbs'
}))

app.set('view engine', '.hbs')

// helpers.registerHelper('trimString', function(passedString) {
//   const theString = passedString.substring(0,2);
//   return new helpers.SafeString(theString)
// });

//middlewares
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'assets')))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))
app.use(session({
    secret: 'secretWord', //palabra secreta 
    cookie: { maxAge: 5000*60   } //tiempo que dura la sesión abieta
  }))
app.use(flash())

//global variables
app.use((req, res, next) => {

    res.locals.user = req.session.userId
    res.locals.email = req.session.userEmail
    res.locals.empty = req.flash('empty')
    res.locals.errorMsg = req.flash('errorMsg')
    res.locals.errorSignup = req.flash('errorSignup')
    res.locals.errorPassword = req.flash('errorPassword')
    next()
  })

  //Routes and controllers
app.use(router)
app.use(userRouter)


//twitter


// listening server

app.listen(3000, ()=>console.log('Listening in port 3000'))
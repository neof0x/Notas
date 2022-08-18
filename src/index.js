const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride =  require('method-override');
const session =  require('express-session');
const flash = require('connect-flash');
const passport = require('passport');


//Initialization
const app = express();
require('./database');
require('./config/passport');



//setings 
app.set('port' , process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views')); //aca le estoy avisando a node donde buscar la carpeta views
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'), //para concatenarlo con cierta carpeta
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs' //para indicar que extension tendran nuestros archivos
}));
app.set('view engine', '.hbs');  //para configurar el motro de las vistas


//Middlewars
app.use(express.urlencoded({extended: false})); //urlencode es para cuando un formular mande datos yo peuda entenderlo
app.use(methodOverride('_method')); //para que nos puedan mandar distitnos metodos incluido put y delete
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());




//Global variables
app.use((req, res, next) =>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});



//Routes
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));


//Static Files
app.use(express.static(path.join(__dirname, 'public')));


//Server is listenning 
app.listen(app.get('port'), ()=> {
    console.log('Server on port', app.get('port'));
})
const express = require('express');
const ehbs = require('express-handlebars');
const session = require('express-session');
const path = require('path');
const socketio = require('socket.io');
const http = require('http');
const mongo = require('mongoose');
//Inicializaciones
const app = express();
const server = http.createServer(app);
const io = socketio.listen(server);

mongo.connect('mongodb://localhost/chat-database', {useNewUrlParser: true})
.then(db => console.log('db is connected'))
.catch(err => console.log(err));

//Settings
require('./public/jscript/sockets')(io);
app.set('port', 3000);
app.set('views', path.join(__dirname, 'views'));

app.engine('.hbs', ehbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));

app.set('view engine' , '.hbs');
//MiddleWares 
app.use(express.urlencoded({extended:false}));
app.use(session({
    secret: 'wolfSkull2019!',
    resave: true,
    saveUninitialized: true
}));

//Routes
app.use(require('./routes/index'));


//Static Files
app.use(express.static(path.join(__dirname, 'public')));

//Server Listening
server.listen(app.get('port'),() => {
    console.log('Server is running on port', app.get('port'));
});
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const { isProduction } = require('./config/keys');
const csurf = require('csurf');
const debug = require('debug');
require('./models/User');
require('./models/Notification')
const {Project, Task} = require('./models/Project');
require('./models/Project');
require('./config/passport');
const passport = require('passport');
// var indexRouter = require('./routes/index');
var usersRouter = require('./routes/api/users');
const csrfRouter = require('./routes/api/csrf');
const projectsRouter = require('./routes/api/projects');
const notificationsRouter = require('./routes/api/notifications');
var app = express();
// const {createClient} = require('redis');
// const { createAdapter } = require('@socket.io/redis-adapter');
// const URL = process.env.UPSTASH_REDIS_URL
// const Client = createClient({url: URL})
// const subClient = Client.duplicate();
const test = "Test"
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: ["http://localhost:3000","https://www.parrotpm.com"]
  }
});
// server.listen(5001);
// io.adapter(createAdapter(Client,subClient))
io.on('connection', socket => {
  console.log(socket.id,'a user connected')
  // socket.emit("message","Connection Made")
  socket.on('join-channel',(room)=>{
    socket.join(room);
  })
  socket.on('disconnect',()=>{
    console.log('disconnecting....')
  });
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());

if (!isProduction) {
    app.use(cors());
  }


app.use(
    csurf({
      cookie: {
        secure: isProduction,
        sameSite: isProduction && "Lax",
        httpOnly: true
      }
    })
  );
app.use((req,res,next)=>{
    req.io = io;
    next();
});
app.use('/api/users', usersRouter);
app.use('/api/csrf', csrfRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/notifications', notificationsRouter);
if (isProduction) {
  const path = require('path');
  // Serve the frontend's index.html file at the root route
  app.get('/', (req, res) => {
    res.cookie('CSRF-TOKEN', req.csrfToken());
    res.sendFile(
      path.resolve(__dirname, '../frontend', 'build', 'index.html')
    );
  });

  // Serve the static assets in the frontend's build folder
  app.use(express.static(path.resolve("../frontend/build")));

  // Serve the frontend's index.html file at all other routes NOT starting with /api
  app.get(/^(?!\/?api).*/, (req, res) => {
    res.cookie('CSRF-TOKEN', req.csrfToken());
    res.sendFile(
      path.resolve(__dirname, '../frontend', 'build', 'index.html')
    );
  });
}

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.statusCode = 404;
    next(err);
  });

  const serverErrorLogger = debug('backend:error');

  // Express custom error handler that will be called whenever a route handler or
  // middleware throws an error or invokes the `next` function with a truthy value
  app.use((err, req, res, next) => {
    serverErrorLogger(err);
    const statusCode = err.statusCode || 500;
    res.status(statusCode);
    res.json({
      message: err.message,
      statusCode,
      errors: err.errors
    })
  });

module.exports = {
  app: app,
  server: server};
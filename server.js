<<<<<<< HEAD
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const methodOverride = require('method-override');
const bcrypt = require('bcryptjs');
const User = require('./models/user'); // Import User model
const Article = require('./models/article'); // Import Article model
const articleRouter = require('./routes/article'); // Import article routes
const authRouter = require('./routes/auth'); // Import authentication routes

const app = express();

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/yourDB")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(express.static("public")); // Serve static files

// Session for authentication
app.use(session({
  secret: 'super-secret-key',
  resave: false,
  saveUninitialized: false
}));

// Middleware to make user available in all views
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// Home Page - Show all articles
app.get('/', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc' });
  res.render('articles/index', { articles });
});

// Protect dashboard & article creation routes
function ensureAuthenticated(req, res, next) {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  next();
}

// Dashboard (Protected)
app.get('/dashboard', ensureAuthenticated, (req, res) => {
  res.send(`<h1>Welcome, ${req.session.user.name}</h1><a href="/logout">Logout</a>`);
});

// Use authentication routes
app.use('/', authRouter);

// Use article routes (with authentication check)
app.use('/articles', ensureAuthenticated, articleRouter);

// Start server
const PORT = process.env.PORT || 5001; // Change 5000 to 5001 or another free port

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
=======
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const methodOverride = require('method-override');
const bcrypt = require('bcryptjs');
const User = require('./models/user'); // Import User model
const Article = require('./models/article'); // Import Article model
const articleRouter = require('./routes/article'); // Import article routes
const authRouter = require('./routes/auth'); // Import authentication routes

const app = express();

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/yourDB")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(express.static("public")); // Serve static files

// Session for authentication
app.use(session({
  secret: 'super-secret-key',
  resave: false,
  saveUninitialized: false
}));

// Middleware to make user available in all views
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// Home Page - Show all articles
app.get('/', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc' });
  res.render('articles/index', { articles });
});

// Protect dashboard & article creation routes
function ensureAuthenticated(req, res, next) {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  next();
}

// Dashboard (Protected)
app.get('/dashboard', ensureAuthenticated, (req, res) => {
  res.send(`<h1>Welcome, ${req.session.user.name}</h1><a href="/logout">Logout</a>`);
});

// Use authentication routes
app.use('/', authRouter);

// Use article routes (with authentication check)
app.use('/articles', ensureAuthenticated, articleRouter);

// Start server
const PORT = process.env.PORT || 5001; // Change 5000 to 5001 or another free port

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
>>>>>>> a289e85c44acd1422578dce0bc18554d79168a29

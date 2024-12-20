const express = require('express');
const passport = require('passport')
const session = require('express-session');
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const dotenv = require('dotenv');
const cors = require('cors');
//TODO: require { obj } for endpoint root route

dotenv.config();

const PORT = process.env.PORT || 5000;

// Create an instance of Express
const app = express();

// Middleware

//We set passport up to use the 'Google Strategy'. Each 'strategy' is an approach
//used for logging into a certain site. The Google Strategy needs an object with the
//client ID, clientSecret, CallbackURL, and an async callback function that will call
//'next' or 'done' once it is finished. The function automatically receives 2 tokens and
//a profile.
passport.use(
  new GoogleStrategy(
    {
      clientID: `${process.env.GOOGLE_CLIENT_ID}`,
      clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
      callbackURL: `${process.env.CALLBACK_URL}`,
    },
    async (accessToken, refreshToken, profile, done) => {
      //Method to create or authenticate use in our DB
      return done(null, profile);
    }
  )
);

//save user info session as a cookie
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

//this sets it up so that each session gets a cookie with a secret key 
app.use(
  session({
    secret: 'your-secret-key',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 },
  })
);

//set up passport
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(express.json());  // Parse the request body
//app.use(express.static()) //TODO:

// Routers




// Root Route
app.get('/', (req, res) => {
  res.send('Welcome to Digi-Cry Backend!');
  //TODO: add endpoint
});

//Log in with google route
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

//Callback route for google to redirect to
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/profile");
  }
);

//Display user profile
app.get("/profile", (req, res) => {
  if (req.isAuthenticated()) {
    res.send(
      `<h1>You loggd in<h1><span>${JSON.stringify(req.user, null, 2)}<span>`
    );
  } else {
    res.redirect("/");
  }
});

//logout the user
app.get("/logoout", (req, res) => {
  req.logout();
  res.redirect("/");
});

// Start Sever
app.listen(PORT, () => {
  console.log(`Listening at: http://127.0.0.1:${PORT}`);
});
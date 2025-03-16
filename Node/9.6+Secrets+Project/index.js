import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy } from "passport-local";
import GoogleStrategy from "passport-google-oauth2";
import session from "express-session";
import env from "dotenv";

const app = express();
const port = 3000;
const saltRounds = 10;
env.config();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    // cookie: {
    //   maxAge: 1000 * 60, //1000ms *60 = 1m
    // },
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(passport.initialize());
app.use(passport.session());

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});
db.connect();

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

app.get("/secrets", async (req, res) => {
  if (req.isAuthenticated()) {
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    console.log("a user is looking for secret😎😎😎");
    console.log(req.user.email);
    try {
      const result = await db.query(
        "SELECT secret FROM users WHERE email = $1",
        [req.user.email]
      );
      const userSecret = result.rows[0].secret;
      if (userSecret) {
        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        console.log("find secrets 😘😘😘");
        res.render("secrets.ejs", { secret: userSecret });
      } else {
        res.render("secrets.ejs", { secret: "no secret😂😂😂😂🤣🤣🤣" });
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    res.redirect("/login");
  }
});
app.get("/submit", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("submit.ejs");
  } else {
    res.redirect("/login");
  }
});

app.post("/submit", async (req, res) => {
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
  console.log("here is a new user  submit secret 🤣🤣🤣");
  console.log(req.user);
  console.log(req.body.secret);
  try {
    await db.query(`UPDATE users SET secret = $1 WHERE email = $2`, [
      req.body.secret,
      req.user.email,
    ]);
    res.redirect("/secrets");
  } catch (error) {
    console.log(error);
  }
});

//TODO: Add a get route for the submit button
//Think about how the logic should work with authentication.

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

app.get(
  "/auth/google/secrets",
  passport.authenticate("google", {
    successRedirect: "/secrets",
    failureRedirect: "/login",
  })
);

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/secrets",
    failureRedirect: "/login",
  })
);

app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (checkResult.rows.length > 0) {
      req.redirect("/login");
    } else {
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err);
        } else {
          const result = await db.query(
            "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
            [email, hash]
          );
          const user = result.rows[0];
          req.login(user, (err) => {
            console.log("success");
            res.redirect("/secrets");
          });
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
});

//TODO: Create the post route for submit.
//Handle the submitted data and add it to the database

passport.use(
  "local",
  new Strategy(async function verify(username, password, cb) {
    try {
      const result = await db.query("SELECT * FROM users WHERE email = $1 ", [
        username,
      ]);
      if (result.rows.length > 0) {
        const user = result.rows[0];
        const storedHashedPassword = user.password;
        bcrypt.compare(password, storedHashedPassword, (err, valid) => {
          if (err) {
            console.error("Error comparing passwords:", err);
            return cb(err);
          } else {
            if (valid) {
              return cb(null, user);
            } else {
              return cb(null, false);
            }
          }
        });
      } else {
        return cb("User not found");
      }
    } catch (err) {
      console.log(err);
    }
  })
);

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/secrets",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    async (accessToken, refreshToken, profile, cb) => {
      console.log("google authentication is finished");
      try {
        // console.log(profile);
        const result = await db.query("SELECT * FROM users WHERE email = $1", [
          profile.email,
        ]);
        if (result.rows.length === 0) {
          const newUser = await db.query(
            "INSERT INTO users (email, password) VALUES ($1, $2)",
            [profile.email, "google"]
          );
          console.log("validate a new user");
          return cb(null, newUser.rows[0]);
        } else {
          console.log("validate a old user");
          return cb(null, result.rows[0]);
        }
      } catch (err) {
        return cb(err);
      }
    }
  )
);
passport.serializeUser((user, cb) => {
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
  console.log("we put a user into session😜😜😜");
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
  console.log("we retrieve a user from session store 😜😜😜");
  cb(null, user);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// ```````````````````````````````````````  about google OAUTH  😒😒😒

// first you have to set all things done inside of your google account
// grab your client ID and secret

// ``````````````set a route to handle google oauth 😎

// app.get(
//   "/auth/google",
//   passport.authenticate("google", {
//     //what thing we want to get from this login

//     scope: ["profile", "email"],
//   })
// );

// `````````````create a google strategy for authentication 😎😎

// set info to help strategy to do oauth
// passport.use(
//   "google",
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       // callBackURL this one doesnt work!!! name must be following
//       callbackURL: "http://localhost:3000/auth/google/secrets",
//       userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
//     },
//     //when we come to here, that means google already authenticate the user!!!!!!😎😎😎
//     //and wen can select info we need and cb function wo need to do subsequently
//     async (accessTocken, refreshTocken, profile, cb) => {

// ````````````` finish oauth
// finally  we pass the user back then finish authentication
//

// `````````we can use these now
// passport.authenticate("google", {
//   //what thing we want to get from this login

//   scope: ["profile", "email"],
// })
// req.isAuthenticated()

//```````````````` last for session

//config

// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//       maxAge: 1000 * 60, //1000ms *60 = 1m
//     },
//   })
// );

// store and retrieve

// passport.serializeUser((user, cb) => {
//   console.log("we put a user into session😜😜😜");
//   cb(null, user);
// });

// passport.deserializeUser((user, cb) => {
//   console.log("we retrieve a user from session store 😜😜😜");
//   cb(null, user);
// });

import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";
import session from "express-session"; //create a new session to store user login session
import passport from "passport";
import { Strategy } from "passport-local"; // local strategy
//````
const app = express();
const port = 3000;
const saltRounds = 10;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
//```````````````````
//configure your session at first 😁😁😁 !!!
app.use(
  session({
    secret: "iamvengeance",
    //whether forces to save you session in the database, if not, reset server will lose the session🤣🤣
    resave: false,
    //save unacive session😎😎
    saveUninitialized: true,
  })
);
//passport has to be followed just rgith after session initialisation
//assign coockie
app.use(passport.initialize());
app.use(passport.session());
//``````````````````````````
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "Authentication",
  password: "wusheng123",
  port: 5432,
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

app.get("/secrets", (req, res) => {
  //req.isAuthenticated() check whether user is in the current / login session.
  if (req.isAuthenticated()) {
    console.log("we authenticate a user😘😘😘");
    console.log(req.user);
    res.render("secrets.ejs");
  } else {
    res.redirect("/login");
  }
});

app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (checkResult.rows.length > 0) {
      res.send("Email already exists. Try logging in.");
    } else {
      //hashing the password and saving it in the database
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          return cb(err);
        } else {
          console.log("Hashed Password:", hash);
          //!!!!!!!😎😎😎when we insert user to db for registeration
          //we also user a login session / authentication
          const result = await db.query(
            "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING * ",
            [email, hash]
          );
          const user = result.rows[0];
          console.log("insert a new user ❤️❤️❤️");
          console.log(user);
          req.login(user, (err) => {
            console.log("7878");
            console.log(err);
            res.redirect("/secrets");
          });
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
});

//set passport to handle this route, will trigger following strategy
app.post(
  "/login",
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!! here to decide whether user login successfully😎🤣🤣
  passport.authenticate("local", {
    //if authenticate user successfully 😎
    successRedirect: "/secrets",
    failureRedirect: "login",
  })
);

//validate user, whether in our database
// automatically handle the req form /login route
passport.use(
  // !!!!!!!!! for this cb function, 3 parameter, error and user are required 😒😒😒😒
  //error: report if error
  //user: info of user, if not valid set it to false
  //info: such as, {"cant find this user"}
  new Strategy(async function verify(username, password, cb) {
    console.log("here is a user coming");
    console.log(username);
    try {
      const result = await db.query("SELECT * FROM users WHERE email = $1", [
        username,
      ]);
      if (result.rows.length > 0) {
        console.log("found this user😎😎😎");
        const user = result.rows[0];
        const storedHashedPassword = user.password;
        bcrypt.compare(password, storedHashedPassword, (err, result) => {
          if (err) {
            console.error("Error comparing passwords:", err);
          } else {
            if (result) {
              console.log("validate hash 👌👌👌");
              // no err / detail of user
              return cb(null, user);
              res.render("secrets.ejs");
            } else {
              //false means user in not anthenticated
              return cb(null, false);
            }
          }
        });
      } else {
        return cb("user not found");
      }
    } catch (err) {
      return cb(err);
    }
  })
);

//Purpose: When a user is authenticated,
// Passport saves some information about the user into the session (by default, usually the user.id).
passport.serializeUser((user, cb) => {
  console.log("we put a user into session😜😜😜");
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  console.log("we retrieve a user from session store 😜😜😜");
  cb(null, user);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

//```````````````````````````````` everything you need to know

// for best understanding, we have to build a flow chart 😎😎😎

// For session assignment 😎😎😎
// we need to do following things
// authenticate users -> put them into session -> retrieve them for subsequent req(keeping login)

// Regiteration
// fetch username, pin -> insert into db -> manually give a seesion(req.login) ->
// store session(passport.serializeUser) -> retrieve session (passport.deserializeUser)

// Login
// fetch username, pin -> authentication(passport.authenticate(local) will be invoked then call your passport.use(strategy) to verify user
// if vefify successfully -> passport.authenticate() assgin a session and redirect user ->
// store session(passport.serializeUser) -> retrieve session (passport.deserializeUser) ->keep session

//tips 😁😁😁
//req.login for manually session assignment
// passport.authenticate() for both authentication and session assignment

//``````Concept

//session
// A session represents a period of time during which a user remains logged in and
// doesn't need to authenticate again.

// A session is a way to store data about a user on the server,
// such as whether they are logged in or any user-specific data (e.g., shopping cart contents, preferences).
// This data is stored server-side, often in memory, a database, or a session store like Redis.

//cookie

// A cookie is a small piece of data stored in the user's browser
// that is sent back to the server with every HTTP request.
// Its main purpose is to allow the server to maintain state (or remember information)
// about the user across multiple requests.

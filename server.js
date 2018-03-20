const express = require('express');
const app = express();
const bcrypt = require('bcryptjs');
const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require('connect-mongo')(session);
const Passport = require('./passport');
const CONFIG = require("./config");
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');
const Users = require('./models/sql/sequelize').Users;
const flash = require("connect-flash");


const HELPERS = require("./helpers");



app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
const connection = mongoose.createConnection(`mongodb://${CONFIG.MONGO.HOST}:${CONFIG.MONGO.PORT}/${CONFIG.MONGO.DB_NAME}`, {});
const store = new MongoStore({mongooseConnection: connection});

//Handle sessions
let sessionMiddleware = session({
    resave: true,
    saveUninitialized: false,
    secret: "auth",
    store: store,
    //if maxAge not set, cookie valid for current session only(until browser restart)
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 10      //10 days
    },

});
app.use(sessionMiddleware);
app.use(flash());

//Initialise passport
app.use(Passport.initialize());

//Ensure persistent sessions
app.use(Passport.session());

//Master API Route
app.use("/api",require("./routes/api"));

// SignUp route
app.post("/signup", function (req, res) {

    if (req.user) {
        res.send("loggedIn");
    } else {
        Users.find({
            where: {
                username: req.body.username
            }
        })
            .then((user) => {
                {
                    if (!user) {
                        bcrypt.genSalt(10, function (err, salt) {
                            bcrypt.hash(req.body.password, salt, function (err, hash) {
                                // Store hash in your password DB.
                                Users.create({
                                    username: req.body.username,
                                    password: hash
                                })
                                    .then((user) => {
                                    //login user after signup
                                        req.login(user, (err) => {
                                            if (err) {
                                                console.log(err);
                                            }
                                            else {
                                                //sign up confirmation to clientx
                                                res.send("okay");
                                            }
                                        });
                                    }).catch((err) => {
                                    console.log(err);
                                })
                            })
                        })
                    }
                    else {
                        res.send("taken");
                    }
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

});

//failure redirect of login
//TODO
app.get("/loginfail", (req, res) => {
    if (req.user)
        res.send('okay');
    else
        //console.log("loginmsg:"+req.flash("loginMsg"));
        res.send( req.flash("loginMsg"));
});

// Success login redirects here, send this success info to client
app.get("/users",(req,res)=>{
    res.send("okay");
});

app.get('/auth/google', Passport.authenticate('google', { scope: [
    'https://www.googleapis.com/auth/plus.login',
    'https://www.googleapis.com/auth/plus.profile.emails.read']
}));

app.get( '/auth/google/callback',
    Passport.authenticate( 'google', {
        successRedirect: '/',
        failureRedirect: '/login'
    }));


//Login POST Route
app.post("/login", Passport.authenticate('local', {
    successRedirect: "/users",
    failureRedirect: "/loginfail",
    failureFlash: true
}));

//Logout route
app.get("/logout", (req, res) => {
    req.logout();
    res.send("back");
});

//check login
app.get("/checklogin",(req,res) => {
    if(req.user)
        res.send(true);
    else
        res.send(false);
});

app.post("/feedback",(req,res) => {
    //TODO: feedback
});

app.post("/login2",(req,res) => {
    res.send("kkkk");
    console.log("TOKEN:",req.body.token);
    HELPERS.verify(req.body.token)
        .catch(console.error);

});

//Home page
app.get("/",(req,res)=>{
    res.send("Home page render");
});

//Listen on port
app.listen(CONFIG.SERVER.PORT, function () {
    console.log(`Server running @ http://${CONFIG.SERVER.HOST}:${CONFIG.SERVER.PORT}`);
});

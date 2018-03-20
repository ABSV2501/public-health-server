const express = require('express');
const bcrypt = require('bcryptjs');
const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require('connect-mongo')(session);
const Passport = require('./passport');
const bodyParser = require('body-parser');
const flash = require("connect-flash");

//Databases Import
const models = require("./models/mongo/mongo");
const Users = require('./models/sql/sequelize').Users;

//Miscellaneous stuff
const HELPERS = require("./helpers");
const CONFIG = require("./config");

const app = express();

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

//Home page
app.get("/", (req, res) => {
    res.send("Home page render");
});

//Master API Route
app.use("/api", require("./routes/api/api"));

// SignUp route
app.post("/signup", function (req, res) {
    if (req.user) {
        //Already logged in
        res.redirect("/user/diseasesAround")
    } else {
        //Check if already exists
        Users.find({
            where: {
                username: req.body.username
            }
        })
            .then((user) => {
                    {
                        //User does not exist. Add to DB
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
                                                    //sign up confirmation to client

                                                    res.send("okay");
                                                }
                                            });

                                            //Add entries to mongo
                                            return models.user.create({
                                                name: req.body.name,
                                                email: req.body.email,
                                                phone: req.body.phone,
                                                address: {
                                                    street: req.body.street,
                                                    city: req.body.city,
                                                    state: req.body.state
                                                },
                                                age: req.body.age,
                                                gender: req.body.gender

                                            })
                                        })
                                        .then((user) => {
                                            console.log("Mongo user entry done");
                                            res.redirect("/user/dashboard");
                                        })
                                })
                                    .catch((err) => {
                                        console.log(err);
                                    })
                            })
                        }
                        else {
                            //User Exists
                            res.send("username taken");
                        }
                    }
                }
            )
            .catch((err) => {
                console.log(err);
            })
    }

});

//Login Route
app.post("/login", Passport.authenticate('local', {
    successRedirect: "/user",
    failureRedirect: "/login",
    failureFlash: true
}));

//Logout route
app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/login");
});

app.post("/feedback", (req, res) => {
    //TODO: feedback
});

//Listen on port
app.listen(CONFIG.SERVER.PORT, function () {
    console.log(`Server running @ http://${CONFIG.SERVER.HOST}:${CONFIG.SERVER.PORT}`);
});

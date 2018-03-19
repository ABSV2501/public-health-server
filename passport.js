//Import Passport
const passport = require("passport");
//Import LocalStrategy module
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const bcrypt = require('bcryptjs');
//Import User Model'

const Users = require("./models/sql/sequelize.js").Users;


//Serialize user
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

//De-Serialize User
passport.deserializeUser(function (id, done) {
    Users.findById(id)
        .then((user) => {
            done(null, user);
        })
        .catch((err)=>{
        console.log(err);
        })
});

const googleStrategy = new GoogleStrategy({
        clientID:     "575091130691-ahu4nk8focko0c6v7fck4f2r0u3v23e6.apps.googleusercontent.com",
        clientSecret: "055vtiP-1nROm9pnTQHZplIG",
        callbackURL: "http://localhost:5454/auth/google/callback",
        passReqToCallback   : true
    },
    function(request, accessToken, refreshToken, profile, done) {
        console.log(profile);
        done(err,profile);
    }
);

//Define LocalStrategy
// const localstrategy = new LocalStrategy(
//     {
//         passReqToCallback : true
//     },
//     function (req, username, password, done) {
//         Users.findOne({
//             where: {
//                 username: username
//             }
//         })
//             .then((user) => {
//                 if (user == null) {
//                     //console.log("notFound");
//                     let a=req.flash("loginMsg","notFound");
//                     //console.log(a);
//                     return done(null, false,a );
//                 } else {
//
//                     bcrypt.compare(password, user.password).then((res) => {
//                         // res === true
//                         if (res) {
//
//                             return done(null, user);
//                         }
//                         else {
//                             return done(null, false, req.flash("loginMsg","incorrect"));
//                         }
//
//                     });
//                 }
//             })
//            .catch((err)=>{
//             console.log(err);
//         })
//     }
// );

//User "localstrategy" at "local"
passport.use('local', googleStrategy);

//Expose passport to be used in server.js
module.exports = passport;
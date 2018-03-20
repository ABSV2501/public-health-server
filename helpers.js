const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client("");

module.exports = {

//CheckLoggedIN
    checkLoggedIn: function (req, res, next) {
        if (req.user)
            next();
        else {
            // console.log("Unauthorized Access !");
            res.redirect("/login");
        }
    },
    getDocID: function () {

    },
    verify: async function(token) {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: "575091130691-sio1vj6t19n6ofrao6bjggt694odf18v.apps.googleusercontent.com",  // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];
        console.log(userid,payload);
        // If request specified a G Suite domain:
        //const domain = payload['hd'];
    },
    afterAuth: function () {
        console.log("User auth done. Next step");
    }

};
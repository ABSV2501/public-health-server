const route = require("express").Router();

let Storage = multer.diskStorage({
    destination: './public_html/csv',
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});
let upload = multer({storage: Storage});
route.get("/",(req,res) => {
    res.redirect("/govt.html");
});

route.post('/infrastructure',upload.single('csv'),(req,res)=>{

});
route.post('/rating',upload.single('csv'),(req,res)=>{

});

module.exports = route;
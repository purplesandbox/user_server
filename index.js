require("dotenv").config();
const express = require("express");
const mongoose = require('mongoose');
const { User } = require('./models/Users');
var md5 = require('md5');

const cors = require('cors');

const app= express();
app.use(express.json());
app.use(cors());

const username = process.env.USER_NAME;
const password = process.env.PASSWORD;

mongoose.connect("mongodb+srv://" + username + ":" + password + "@cluster0.fkigrvg.mongodb.net/userDB", {
    useNewUrlParser: true, 
    useUnifiedTopology:true
})
    .then(() => console.log("Connected to DB"))
    .catch(console.error);




// API for getting all the records from the User model of the UserDB


app.get('https://bullet-point-journal-users.onrender.com/users', async (req, res) => { 

    User.find({}, (err, result) => {
        if (err) {
            console.log(err.message);
        } else {
            res.json(result);
        }
    });

});




// API for creating records in the Users collection in the UserDB

app.post('https://bullet-point-journal-users.onrender.com/user/new', (req, res) => {
    const user = new User ({
        fname:  req.body.fname,
        surname: req.body.surname,
        email: req.body.email,
        password: md5(req.body.password),
        confirmpassword: md5(req.body.confirmpassword)
    });
    user.save();
    res.json(user);
    
});




app.listen(process.env.PORT || 3002, () => {
    console.log("Server runs on the port", process.env.PORT);
});

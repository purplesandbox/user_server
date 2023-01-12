const mongoose = require('mongoose');


const UserRegistrationSchema = new mongoose.Schema({

    fname:  String,
    surname: String,
    email: String,
    password: String,
    confirmpassword: String
    
});



const User = mongoose.model("User", UserRegistrationSchema);



module.exports = { User };
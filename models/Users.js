const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    item : String,
    timestamp: {
        type: String,
        default: Date.now()
    }
});

const Item = mongoose.model("Item", ItemSchema);


const UserRegistrationSchema = new mongoose.Schema({

    fname:  String,
    surname: String,
    email: String,
    password: String,
    confirmpassword: String,
    gratitude:  [ItemSchema],
    affirmation: [ItemSchema],
    step: [ItemSchema]
    
});





const User = mongoose.model("User", UserRegistrationSchema);



module.exports = { User, Item };
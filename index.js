require("dotenv").config();
const express = require("express");
const mongoose = require('mongoose');
const { User, Item } = require('./models/Users');
var md5 = require('md5');

const cors = require('cors');

const app= express();
app.use(express.json());
app.use(cors());

const username = process.env.USER_NAME;
const password = process.env.PASSWORD;

mongoose.connect("mongodb+srv://" + username + ":" + password + "@cluster0.fkigrvg.mongodb.net/userAccountsDB", {
    useNewUrlParser: true, 
    useUnifiedTopology:true
})
    .then(() => console.log("Connected to DB"))
    .catch(console.error);




// API for getting all the records from the specific user from the UserAccountsDB




app.get('/users', async (req, res) => { 
    // const result = await User.findOne({email : req.params.email});
    // res.json(result);
    User.find({}, (err, result) => {
        if (err) {
            console.log(err.message);
        } else {
            res.json(result);
        }
    });


});


// API for creating records in the Users collection in the UserAccountsDB

app.post('/user/new', async (req, res) => {
    const newUser = new User ({
         fname:  req.body.fname,
         surname: req.body.surname,
         email: req.body.email,
         password: md5(req.body.password),
         confirmpassword: md5(req.body.confirmpassword)
     });
    newUser.save();
    res.json(newUser);
    
});







// API for getting all gratitudes/affirmations/steps from a specific user's collections of the UserAccountDB

app.get('/gratitudes/:email', async (req, res) => { 

    const result = await User.findOne({email : req.params.email});
    res.json(result.gratitude);

});



app.get('/affirmations/:email', async (req, res) => { 

    const result = await User.findOne({email : req.params.email});
    res.json(result.affirmation);

});

app.get('/steps/:email', async (req, res) => { 

    const result = await User.findOne({email : req.params.email});
    res.json(result.step);

});

// API for adding a new gratitudes/affirmations/steps item for a spacific user's collection


app.put("/gratitude/new/:email", async (req,res) => {
    const result = await User.findOne({email : req.params.email});
    const newItem = new Item({
        item: req.body.item
    });
    result.gratitude = [... result.gratitude, newItem];
    result.save();
    res.json(result.gratitude);
})


app.put("/affirmation/new/:email", async (req,res) => {
    const result = await User.findOne({email : req.params.email});
    const newItem = new Item({
        item: req.body.item
    });
    result.affirmation = [... result.affirmation, newItem];
    result.save();
    res.json(result.affirmation);
})



app.put("/step/new/:email", async (req,res) => {
    const result = await User.findOne({email : req.params.email});
    const newItem = new Item({
        item: req.body.item
    });
    result.step = [... result.step, newItem];
    result.save();
    res.json(result.step);
})


// API for updating gratitudes/affirmations/steps from a specific user's collections of the UserAccountDB

app.put("/gratitude/update/:email/:id", async (req,res) => {
    const result = await User.findOne({email : req.params.email});
    result.gratitude[req.params.id].item = req.body.item;
    result.save();
    res.json(result.gratitude);
})



app.put("/affirmation/update/:email/:id", async (req,res) => {
    const result = await User.findOne({email : req.params.email});
    result.affirmation[req.params.id].item = req.body.item;
    result.save();
    res.json(result.affirmation);
})


app.put("/step/update/:email/:id", async (req,res) => {
    const result = await User.findOne({email : req.params.email});
    result.step[req.params.id].item = req.body.item;
    result.save();
    res.json(result.step);
})


// API for deleting the records from user's collection in the UserAccountDB


app.delete('/gratitude/delete/:email/:id', async (req,res) => {
    const result = await User.findOne({email : req.params.email});
    result.gratitude.splice(req.params.id,1);
    result.save();
    res.json(result.gratitude);

});



app.delete('/affirmation/delete/:email/:id', async (req,res) => {
    const result = await User.findOne({email : req.params.email});
    result.affirmation.splice(req.params.id,1);
    result.save();
    res.json(result.affirmation);

});


app.delete('/step/delete/:email/:id', async (req,res) => {
    const result = await User.findOne({email : req.params.email});
    result.step.splice(req.params.id,1);
    result.save();
    res.json(result.step);

});




app.listen(process.env.PORT || 3002, () => {
    console.log("Server runs on the port", process.env.PORT);
});

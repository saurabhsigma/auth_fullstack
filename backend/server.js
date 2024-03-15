const express = require('express')
const app = express();
const cors = require('cors');
const port = 3000;

app.use(express.json());


const User = require(('./models/User'))

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://saurabh:EvKJuuNxtsxWGxd0@cluster0.e8d2pel.mongodb.net/User')
.then(()=>{
    console.log("connected to database")
})
.catch(()=>{
    console.log("cant connect to the database at the moment")
})



app.use(express.json())
app.use(cors())

app.post('/signup', async (req,res)=>{
    
    // console.log("request send")
    const email = req.body.email;
    const password = req.body.password;
    

    const user = await User.create({ email, password})
    .then(()=>{
        console.log("user added")
        res.send("user added")
    })
    .catch(()=>{
        console.log("error")
    })
    console.log("everything is fine")


})

app.post('/login', async (req,res)=>{

    const email = req.body.email;
    
    console.log("gone to the database")
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }

})

// app.get('')

app.listen(port);
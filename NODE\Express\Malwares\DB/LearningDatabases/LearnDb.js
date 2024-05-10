const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const jwtPassword = "123456";

mongoose.connect(
    "mongodb+srv://aditikumar2224:AK0MongoDB@cluster0.zie5hxe.mongodb.net/New_user_app",
);

const User = mongoose.model("User", {
    name: String,
    username: String,
    pasword: String,
});

const app = express();
app.use(express.json());

async function userExists(username, password) {
    // should check in the database
    const user = await User.findOne({ username: username });
    return user !== null;
}

app.post('/signup', function (req, res) {
    const name = req.body.name;
    const username = req.body.username;
    const password = req.body.password;

    const userDetails = new User({
        name: name,
        username: username,
        password: password
    });
    
    userDetails.save().then(doc => {
        res.send(doc)
    })
        .catch(err => console.log(err))
})


app.post("/signin", async function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    try {
        if (!(await userExists(username, password))) {  
            return res.status(403).json(
                { msg: "User doesn't exist in our database" });
        }

        var token = jwt.sign({ username: username }, jwtPassword);
        return res.json({ token });
    } catch (err) {
        return res.status(403).json({ msg: "Error during user authentication" });
    }
});

app.get("/users", async function (req, res) {
    const token = req.headers.authorization;
    try {
        const decoded = jwt.verify(token, jwtPassword);
        const username = decoded.username;
        // return a list of users other than this username from the database
        const allUsers = await User.find({});
        res.send(allUsers.filter((value) => value.username != username));
   

        // if (data) {
        //     const allUsers = await User.find({});
        //     for (let i = 0; i < allUsers.length; i++) {
        //         if (allUsers[i].username !== data[0].username) {
        //             people.push(allUsers[i]);
        //         }
        //     }
        //     res.status(200).json(people);
        // }

    } catch (err) {
        return res.status(403).json({
            msg: "Invalid token",
        });
    }
});


app.listen(3000);
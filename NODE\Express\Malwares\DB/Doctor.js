const express = require("express");

const app = express();
app.use(express.json());

var users = [{
    name: "John",
    kidneys: [{
        healthy: false
    }],
}]

app.get("/", function (req, res) {
    const johnKidneys = users[0].kidneys;
    const numofKidneys = johnKidneys.length;
    let HealthyKidneys = 0;
    for (let i = 0; i < johnKidneys.length; i++) {
        if (johnKidneys[i].healthy) {
            HealthyKidneys = HealthyKidneys + 1;
        }
    }
    const UnhealthyKidneys = numofKidneys - HealthyKidneys;
    res.json({
        numofKidneys,
        HealthyKidneys,
        UnhealthyKidneys
    })
})
app.post("/", function (req, res) {
    const isHealthy = req.body.isHealthy; //isHealthy is the parameter to be used while entering Post request
    users[0].kidneys.push({
        healthy: isHealthy
    })
    res.json({
        msg: "IsDone!"
    })
})

app.put("/", function (req, res) {
    if (Unhealthykidney()) {
        for (let i = 0; i < users[0].kidneys.length; i++) {
            users[0].kidneys[i].healthy = true;
        }
        res.json({
            msg: "All Kidneys Look Cool!"
        }) //this function is used to respond the user ki ha bhai process hogya hai, warna it shows that the request is hung!

    }
    else {
        res.status(422).json({
            msg: "Bro koi kidney khrab toh karle!"
        })
    }
})

//Removing Unhealthy Kideny
app.delete("/", function (req, res) {
    if (Unhealthykidney()) {
        const newkidney = [];
        for (let i = 0; i < users[0].kidneys.length; i++) {
            if (users[0].kidneys[i].healthy)
                newkidney.push({
                    healthy: true
                })
        }
        users[0].kidneys = newkidney
        res.json({
            msg: "Its Done!"
        })
    }
    else {
        res.status(422).json({
            msg: "Bro koi kidney khrab toh karle!"
        })
    }
});

function Unhealthykidney() {
    let minimumunhealthykidney = false
    for (let i = 0; i < users[0].kidneys.length; i++) {
        if (!users[0].kidneys[i].healthy)
            return true
    }
    return false
}

app.listen(3000);

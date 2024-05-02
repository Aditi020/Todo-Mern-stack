
const express = require("express");

const zod = require("zod");
const app = express();
app.use(express.json());

const schema=zod.array(zod.number());

let requests = 0;
function calculateRequests(req, res, next) {
    requests++;
    console.log(requests);
    next();
}

function userMiddleware(req, res, next) {
    const username = req.headers.username;
    const password = req.headers.password;
    if (!(username == "harkirat" && password == "pass")) (
        res.status(403).json({
            msg: "Incorrect inputs1",
        })
    );
    else
        next();
}

// function kidneyMiddleware(req, res, next) {
//     const kidneyId = req.query.kidneyId;
//     if (kidneyId != 1 && kidneyId != 2) {
//         res.status(403).json({
//             msg: "Incorrect inputs2",
//         })
//     }
//     else
//         next();
// }

app.use(userMiddleware, calculateRequests)

app.get("/health-checkup", function (req, res) { // do something with kidney here

    res.send("Your heart is healthy");

})
app.post("/health-checkup", userMiddleware, function (req, res) {
    const kidneys = req.body.kidneys;
    const response = schema.safeParse(kidneys)
    res.send(response);


    // const kidneyLength = kidneys.length;

    // res.send("you have " + kidneyLength + " kidneys")

})

app.put("/health-checkup", userMiddleware, function (req, res) {

})

app.delete("/health-checkup", userMiddleware, function (req, res) {

});

// global catches=> this is used to show the error prettily instead of that jarring long messaeg
app.use(function (err, req, res, next) {
    // console.error(error); //Log the error for debugging purposes
    res.status(500).send('An internal server error occurred')
});

app.listen(3000);

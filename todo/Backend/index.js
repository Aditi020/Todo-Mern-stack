const { createTodo, updateTodo } = require("./types.js")
const { Todo } = require("./data.js")
const express = require('express')
const bodyParser = require('body-parser')
const app = express();

app.use(express.json());
app.use(bodyParser.json());


app.post('/todo', async function (req, res) {
    //  "const { title, description, completed } = req.body" this is written as below using zod validation in short
    const createPayload = req.body
    const parsePayload = createTodo.safeParse(createPayload)
    if (!(parsePayload.success)) {
        return res.status(411)
            .json({
                message: "You sent the wrong input."
            })
    }
    else
        await Todo.create({
            title: createPayload.title,
            description: createPayload.description,
            completed: false
        })
    res.json({
        msg: "Todo created successfully"
    })
    // put it in mongodb

})

app.get('/todos', async function (req, res) {
    const allTodo = await Todo.find({});
    res.json(
        allTodo
    )

})

app.put('/completed/', async function (req, res) {
    const updatePayload = req.body
    const parsePayload = updateTodo.safeParse(updatePayload)
    if (!(parsePayload.success)) {
        return res.status(411)
            .json({
                message: "You sent the wrong input."
            })
    }
    await Todo.updateOne({ _id: req.body.id },
         { completed: true });

    res.json({
        msg: "Todo marked as completed"
    })
}
);
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
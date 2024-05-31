const mongoose = require("mongoose"); 
mongoose.connect("mongodb+srv://aditikumar2224:AK0MongoDB@cluster0.zie5hxe.mongodb.net/Todo-application")

const todoSchema= mongoose.Schema({
    title:String,
    description:String,
    completed:Boolean,
});

const todo=mongoose.model("Todos", todoSchema)
module.exports= {
    Todo:todo
}
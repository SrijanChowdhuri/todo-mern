// creating Schema
const mongoose = require('mongoose')

const TodoItemSchema = new mongoose.Schema({
    item: {
        type: String,
        required: true
    }
})

// exporting the Schema

module.exports = mongoose.model('todo', TodoItemSchema)
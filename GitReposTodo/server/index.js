

const express =  require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const cors = require('cors')

const app = express()

app.use(express.json())
//Port
const PORT = process.env.PORT || 8080


// Using CORS
app.use(cors())

// Importing the routes

const TodoItemRoute = require('./routes/todoItems')



// Connecting to Mongo.db
mongoose.connect(process.env.DB_CONNECT,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=> console.log("Database connected"))
.catch(err => console.log(err))

app.use('/', TodoItemRoute)


//Adding port and connecting to server
app.listen(PORT, () => console.log('Server connected'))


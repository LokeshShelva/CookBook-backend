require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser");

const app = express()

//Routes import
const route = require('./routes/routes')

app.use(bodyParser.json())

const PORT = process.env.PORT || 3000

mongoose.connect(process.env.MONGODB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    })
    .then(() => console.log("server connected"))
    .catch((err) => console.log(err))

app.use('/', route)

app.listen(PORT, () => console.log("Listening on port " + PORT.toString()))
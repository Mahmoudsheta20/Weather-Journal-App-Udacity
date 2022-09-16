// Setup empty JS object to act as endpoint for all routes
let projectData = {}

// Require Express to run server and routes
const express = require('express')
const bodyParser = require('body-parser')

// Start up an instance of app
const port = 3000
const app = express()
    /* Middleware*/
    //Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Cors for cross origin allowance
const cors = require('cors')
const { default: axios } = require('axios')
app.use(cors())
    // Initialize the main project folder
app.use(express.static('website'))

// Get Post
app.post('/add', (req, res) => {
    projectData['temp'] = req.body.temp
    projectData['date'] = req.body.date
    projectData['feelings'] = req.body.feelings
    res.send(projectData)
})

// Get Route
app.get('/all', (req, res) => {
        res.send(projectData)
    })
    // Setup Server
app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})
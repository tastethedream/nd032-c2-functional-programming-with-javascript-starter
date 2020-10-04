require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const path = require('path')
const { log } = require('console')


const app = express()
const port = 8080

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/', express.static(path.join(__dirname, '../public')))

// your API calls

// Image of the day API call
app.get('/apod', async (req, res) => {
    try {
        console.log(process.env.API_KEY);
        let image = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`)
            .then(res => res.json())
           return res.send({ image })
    } catch (err) {
        console.log('error:', err);

    }
});

// Rover API calls

app.get('/curiosity', async (req, res) => {
    try {
        let response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=2899&api_key=${process.env.API_KEY}`)
        
            .then(res => { return res.json() })

        console.log(`Response curiosity: ${response.photos[0].id}`)

        res.send({ response })
    } catch (err) {
        console.log('error:', err);
    }
});

app.get('/opportunity', async (req, res) => {
    try {
              let response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/opportunity/photos?sol=2899&api_key=${process.env.API_KEY}`)
            .then(res => { return res.json() })

        console.log(`Response opportunity: ${response.photos[0].id}`)

        res.send({ response })
    } catch (err) {
        console.log('error:', err);
    }
});

app.get('/spirit', async (req, res) => {
    try {
        let response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/spirit/photos?sol=2000&api_key=${process.env.API_KEY}`)
            .then(res => { return res.json() })

        console.log(`Response spirit: ${response.photos[0].rover.max_sol}`)
        
        res.send({ response })
    } catch (err) {
        console.log('error:', err);
    }
});


app.listen(port, () => console.log(`You are live on port ${port}!`))
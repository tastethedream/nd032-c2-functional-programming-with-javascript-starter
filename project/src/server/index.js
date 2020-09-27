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

// Mars Rover Image API call

app.get('/rover', async (req, res) => {
    try {
        let roverImage = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=2&api_key=${process.env.API_KEY}`)
            .then(res => res.json())
          return res.send({ roverImage });
          
    } catch (err) {
        console.log('error:', err);
    }
});

// app.get('/rover/:roverName', async (req, res) => {
//     try {
//         let name = req.params['RoverName']
//         console.log(name)
//         let roverImage = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${req.query.RoverName}/latest_photos?api_key=${process.env.API_KEY}`)
//             .then(res => res.json());
     
//        return res.send({ roverImage });
//     } catch (err) {
//         console.log('error:', err);
//     }
// })

// // Mars Rover Manifest API call

// app.get('/info', async (req, res) => {
//     try {
//         let manifest = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${process.env.API_KEY}`)
//             .then(res => res.json())
//             res.send({ manifest })
//     } catch (err) {
//         console.log('error:', err);
//     }
// })


app.listen(port, () => console.log(`You are live on port ${port}!`))
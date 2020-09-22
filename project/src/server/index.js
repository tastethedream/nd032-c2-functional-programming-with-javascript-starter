require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const path = require('path')


const app = express()
const port = 8080

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', express.static(path.join(__dirname, '../public')))

// your API calls

// Image of the day API call
app.get('/apod', async (req, res) => {
    try {
        let image = await fetch(`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY`)
            .then(res => res.json())
            res.send({ image })
    } catch (err) {
        console.log('error:', err);

    }
});

// Mars Rover Image API call

// app.get('/rover', async (req, res) => {
//     try {
//         let roverImage = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=2&api_key=DEMO_KEY`)
//             .then(res => res.json())
//          res.send({ roverImage })
//     } catch (err) {
//         console.log('error:', err);
//     }
// });

app.get('/rover/:roverName', async (req, res) => {
    try {
        let name = req.params['roverName']
        console.log(name)
        let roverImage = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${name}/photos?sol=10&api_key=DEMO_KEY`)
            .then(res => res.json());
        console.log(`index.js rover api call ${roverImage}`);    
        res.send({ roverImage });
    } catch (err) {S
        console.log('error:', err);
    }
})

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
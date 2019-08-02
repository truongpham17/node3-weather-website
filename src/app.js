const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode  = require('./utils/geocode')
const forecast  = require('./utils/forecast')

const app = express()

const port = process.env.PORT || 3000

// define paths for Express config
const viewPath = path.join(__dirname, '../templates/views')
const publicDirectoryPath = path.join(__dirname, '../public')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlerbars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
   res.render('index', {
       title: 'Weather App cute',
       name: 'Truong cute',
       footer: 'this is footer  '
   })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About', 
        name: 'Truong cute',
        footer: 'Truong super cute'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Truong cute',
        title: 'Help',
        name: 'Truong super cute',
        footer: 'This is fucking footer'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

   geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
       if(error) {
           return res.send({error})
       }
       forecast(latitude, longitude, (error, forecastData) => {
           if(error) {
               return res.send({error})
           }
           res.send({
               forecast: forecastData,
               location,
               address: req.query.address
           })
       })

   })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.send('Help article not found')
})

app.get('*', (req, res) => {
    res.send('My 404 page')
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})
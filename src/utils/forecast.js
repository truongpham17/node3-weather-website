const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/3a54ff1b446414185c9eb2d58a6e2c00/${latitude},${longitude}`
    request({ url, json: true }, (error, response) => {
        if(error) {
            callback('Unable to connect to weather service!')
        } else if(response.body.error) {
            callback('Unable to find location')
        } else {
            callback(undefined, response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature + ' degress out. There is a ' + response.body.currently.precipProbability + '% change of rain.')
        }
    })
}

module.exports = forecast;
const axios = require('axios')
const {googleAPI, darkSkyAPI} = require('../env.json')


let getLocation = (address) => {
  return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${googleMapsAPI}`)
  .then(({data}) => {
    let location = data.results[0].formatted_address
    let lat = data.results[0].geometry.location.lat
    let lng = data.results[0].geometry.location.lng
    return {location, lat, lng}
  })
  .catch(err => {
    return "There was an error in your request idiot"
  })
}

let getWeather = ({location, lat, lng}) => {
  return axios.get(`https://api.darksky.net/forecast/${darkSkyAPI}/${lat},${lng}`)
  .then(({data}) => {
    return [location, data.currently.temperature]
  })
  .catch(err => {
    return "There was an error in your request idiot"
  })
}

let getWeatherCommand = (address, command) => {
  return getLocation(address)
  .then(locationObj => {
    return getWeather(locationObj)
  })
  .then(tempData => {
    return `The temperature in ${tempData[0]} is ${command === 'wc' ? `${((tempData[1]-32)*(5/9)).toFixed(2)}˚ Celcius` : `${tempData[1]}˚ Farenheit`}`
  })
} 


module.exports = {
  getWeatherCommand
}

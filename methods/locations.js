const axios = require('axios')
const {googleMapsAPI, darkSkyAPI} = require('../env.json')


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

module.exports = {
  getLocation,
  getWeather
}
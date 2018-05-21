const axios = require('axios') 
const {googleAPI} = require('../env.json')
let getYoutube = (search) => {
  return axios.get(`https://www.googleapis.com/youtube/v3/search?part=${encodeURIComponent(search)}&key=${googleAPI}`)
  .then(({data}) => {
    return data
  })
  .catch(err => console.log(err))
}

module.exports = {
  getYoutube 
}
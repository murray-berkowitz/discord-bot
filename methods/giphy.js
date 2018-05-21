const axios = require('axios')
const {giphyAPI} = require('../env.json')

let getGif = (search) => {
  if(!search.length) {
    return axios.get(`http://api.giphy.com/v1/gifs/random?api_key=${giphyAPI}&rating=pg-13`)
    .then(res => {
      console.log(res)
      if(res.status === 200 && res.data.data.embed_url) {
        return res.data.data.embed_url
      }
      else if(res.status > 200) {
        throw `There was a connection issue with the request`
      }
      else if(!res.data.data.embed_url) {
        throw `Search yielded no results!`
      }
    })
  }
  else {
    return axios.get(`http://api.giphy.com/v1/gifs/search?q=${encodeURIComponent(search)}&rating=pg-13&api_key=${giphyAPI}&limit=10`)
    .then(res => {
      if(res.status === 200 && res.data.data.length) {
        return res.data.data[~~(Math.random() * res.data.data.length)].embed_url
      }
      else if(res.status > 200) {
        throw `There was a connection issue with the request`
      }
      else if(!res.data.data.length) {
        throw `Search yielded no results!`
      }
    })
  }
}

module.exports = {
  getGif
}
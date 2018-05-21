const axios = require('axios')

let getUD = (search) => {
  if(!search.length) {
    return axios.get(`http://api.urbandictionary.com/v0/random`)
    .then(({data}) => {
      return data.list[~~(Math.random()* data.list.length)]
    })
  }
  else {
    return axios.get(`http://api.urbandictionary.com/v0/define?term=${encodeURIComponent(search)}`)
    .then(({data}) => {
      if(!data.list) {
        throw `Sorry, no results found!`
      }
      else {
        return data.list[~~(Math.random()* data.list.length)]
      }
    })
  } 
}

module.exports = {
  getUD
}
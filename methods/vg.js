const {igdbAPI} = require('../env.json')
const igdb = require('igdb-api-node').default
const client = igdb(`${igdbAPI}`)
const axios = require('axios')

let getGame = (game) => {
  return axios({
    method: 'get',
    url: `https://api-endpoint.igdb.com/games/?search=${encodeURIComponent(game)}&fields=*&limit=1`,
    headers: {
      "user-key": igdbAPI,
      "Accept": "application/json"
    }
  })
  .then(response => {
    if(response.data.length == 1) {
      return response.data[0]
    }
    else {
      throw 'Game not found'
    }
  })
  
}

module.exports = {
  getGame
}
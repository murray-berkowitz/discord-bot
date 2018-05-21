const {igdbAPI} = require('../env.json')
const igdb = require('igdb-api-node').default
const client = igdb(`${igdbAPI}`)
const axios = require('axios')


// let getGame = (game) => {
//   return client.games({
//     limit:1,
//     search: encodeURIComponent(game)
//   }, [
//     'name',
//     'cover',
//     'description',
//     'rating',
//     'release_dates',
//     'screenshots',
//     'artworks',
//     'videos',
//     'cover'
//   ])
//   .then(response => JSON.stringify(response.body, undefined, 2))
// }

let getGame = (game) => {
  return axios({
    method: 'get',
    url: `https://api-endpoint.igdb.com/games/?search=${encodeURIComponent(game)}&fields=name,cover,rating,summary,release_dates,screenshots,artworks,videos,cover&limit=1`,
    headers: {
      "user-key": igdbAPI,
      "Accept": "application/json"
    }
  })
  .then(response => {
    // if(response.data.length > 1){
    //   result = data.filter(e => e.name.substring(args.join(' ')))
    //   return result[0]
    // }
    if(response.data.length == 1) {
      console.log('one result')
      return response.data[0]
    }
    else {
      console.log(response.data)
      throw 'Game not found'
    }
  })
}

module.exports = {
  getGame
}
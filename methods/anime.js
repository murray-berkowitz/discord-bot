const axios = require('axios')
const parser = require('xml2json')
const {malPass, malUser} = require('../env.json')

let getAnime = (search) => {
  return axios({
    method: 'get',
    url: `https://myanimelist.net/api/anime/search.xml?q=${encodeURIComponent(search)}`,
    headers: {
      "Accept-Charset": 'utf-8',
      "Accept": "text/xml, text/*",
      "Authorization": `Basic ${Buffer.from(malUser + ':' + malPass).toString('base64')}`
    }
  })
  .then(res => {
    return parser.toJson(res.data, {object:true})
  })
}

module.exports = {
  getAnime
}
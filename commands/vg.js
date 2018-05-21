const {getGame} = require('../methods/vg')

module.exports = {
  name: 'vg',
  aliases: ['videogame', 'game'],
  description: 'Search video game database for a game!',
  args: true,
  execute(message, args, command) {
    getGame(args.join(' '))
    .then(data => {
      message.channel.send(`Game: ${data.name}\n\nSummary:\n${data.summary.split('').length > 1200 ? data.summary.slice(0, 1200) + '...' : data.summary}\n\n https://images.igdb.com/igdb/image/upload/t_cover_big/${data.cover.cloudinary_id}`)
      //console.log(JSON.stringify(data, undefined,2))
    })
    .catch(err => message.channel.send(err))
  }
}

//Artwork: https://images.igdb.com/igdb/image/upload/t_screenshot_huge/${data.artworks[0].cloudinary_id}
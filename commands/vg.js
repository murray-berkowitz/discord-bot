const {getGame} = require('../methods/vg')
const Discord = require('discord.js')

module.exports = {
  name: 'vg',
  aliases: ['videogame', 'game'],
  description: 'Search video game database for a game!',
  args: true,
  execute(message, args, command) {
    getGame(args.join(' '))
    .then(data => {

      // Maybe set data I want to display as their own variables, and if they dont exist display a "not found" text instead ie timeToBeatNormal = data.time_to_beat || "undefined"

      const embed = new Discord.RichEmbed()
      .setColor('#fa9529')
      .setThumbnail(`https://images.igdb.com/igdb/image/upload/t_cover_big/${data.cover.cloudinary_id}`)
      .setImage(`https://images.igdb.com/igdb/image/upload/t_screenshot_huge/${data.screenshots[~~(Math.random() * data.screenshots.length)].cloudinary_id}`)
      .addField(data.name, data.summary.split('').length > 700 ? `${data.summary.slice(0, 700)}[ ...read more](${data.url})\n\n` : `${data.summary}\n\n`, true)
      .addField('Time to Beat', `Normally: ${data.time_to_beat ? `${~~(data.time_to_beat.normally / 3600)}hrs` : 'Undefined' }      Completionist: ${data.time_to_beat ? `${~~(data.time_to_beat.completely / 3600)}hrs` : 'Undefined'}\n`)
      .setTimestamp()
      .setFooter("©IGDB", "https://images-na.ssl-images-amazon.com/images/I/51cz%2Bz-qDBL.png")

      return message.channel.send(embed)
    })
    .catch(err => console.log(err))
  }
}

//Artwork: https://images.igdb.com/igdb/image/upload/t_screenshot_huge/${data.artworks[0].cloudinary_id}
//https://images.igdb.com/igdb/image/upload/t_cover_big/${data.cover.cloudinary_id}
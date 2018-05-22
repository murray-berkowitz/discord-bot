const {getAnime} = require('../methods/anime')

module.exports = {
  name: 'anime',
  description: 'Search for an anime from MAL!',
  aliases: ['mal'],
  args: true,
  execute(message, args, command) {
    getAnime(args.join(' '))
    .then(({anime}) => {
      console.log(anime)
      message.channel.send(`${anime.entry[0].title}\n${anime.entry[0].synopsis} ${anime.entry[0].image}`)
    })
  }
}
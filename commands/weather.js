const locations = require('../methods/locations')

module.exports = {
  name: 'w',
  aliases: ['weather', 'temperature'],
  description: 'Get the weather for a specified location',
  args: true,
  usage: '<address>',
  execute(message, args, command) {
    if(args.length == 0) {
      message.channel.send('You didnt enter any arguments dummy')
    }
    else {
      locations.getWeatherCommand(args.join(' '), this.name)
      .then(weather => message.channel.send(weather))
    }
  }
}
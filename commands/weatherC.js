const locations = require('../methods/locations')

module.exports = {
  name: 'wc',
  description: 'Get the weather (in celcius) for a specified location',
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
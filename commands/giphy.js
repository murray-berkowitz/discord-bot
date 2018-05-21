const {getGif} = require('../methods/giphy')

module.exports = {
  name: 'gif',
  description: 'Grab a gif from GIPHY API',
  args: false,
  usage: '<empty> or <search string>',
  execute(message, args, command) {
    getGif(args.join(' '))
    .then((gif) => {
      message.channel.send(gif)
    })
    .catch(err => {
      message.channel.send(err)
    })
  }
}
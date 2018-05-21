const {getYoutube} = require('../methods/youtube')

module.exports = {
  name: 'youtube',
  aliases: ['yt', 'video'],
  description: 'Search YouTube and play a video!',
  args: true,
  execute(message, args, command) {
    getYoutube(args.join(' '))
    .then(data => {
      console.log(data)
    })
  }
}
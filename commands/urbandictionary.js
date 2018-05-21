const Discord = require('discord.js')
const {getUD} = require('../methods/urbandictionary')


module.exports = {
  name: 'ud',
  description: 'Define a word using the Urban Dictionary API',
  aliases: ['urban', 'urbandictionary'],
  args: false,
  execute(message, args, command) {
    getUD(args.join(' '))
    .then(res => {
      const embed = new Discord.RichEmbed()
      .setColor('#050517')
      .setAuthor('Urban Dictionary', 'https://slack-files2.s3-us-west-2.amazonaws.com/avatars/2018-01-11/297387706245_85899a44216ce1604c93_512.jpg')
      .setDescription('Urban Dictionary is a crowdsourced online dictionary for slang words and phrases, operating under the motto "Define Your World.')
      .addField("Word", res.word.charAt(0).toUpperCase() + res.word.slice(1), true)
      .addField('Definition', res.definition, true)
      .addField('Example(s)', res.example, true)

      message.channel.send(embed)
    })
    .catch(err => message.channel.send(err))
  }
}
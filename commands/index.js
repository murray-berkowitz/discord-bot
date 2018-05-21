const fs = require('fs')
const {prefix, modPrefix} = require('../env.json')

const Discord = require('discord.js')
const client = new Discord.Client()

client.commands = new Discord.Collection();

const commands = fs.readdirSync(__dirname).filter(e => e != 'index.js')

commands.forEach(file => {
  const command = require(`./${file}`)

  client.commands.set(command.name, command)
})



client.on('message', message => {
  if ((!message.content.startsWith(prefix) && !message.content.startsWith(modPrefix)) || message.author.bot) return

  const args = message.content.slice(prefix.length).split(/ +/)
  const commandName = args.shift().toLowerCase()

  const command = client.commands.get(commandName) || client.commands.find(command => command.aliases && command.aliases.includes(commandName))

  if(!command) return

  if(command.args && !args.length) {
    let reply = 'You didnt provide any arguments.'
    if (command.usage) {
      reply += `\n\nUSAGE: ${command.usage}`
    }
    return message.reply(reply)
  }

  message.channel.startTyping()

  try {
    command.execute(message, args, commandName)
  }

  catch(err) {
    console.error(err)
    message.reply('There was an error executing that command')
  }

  message.channel.stopTyping()
  
})

module.exports = {
  client
}
const fs = require('fs')
const path = require('path');
const chalk = require('chalk')

const Discord = require('discord.js')
const client = new Discord.Client()

client.commands = new Discord.Collection();

const {prefix, modPrefix} = require('../env.json')

const commands = fs.readdirSync(__dirname).filter(e => e != 'index.js')

commands.forEach(file => {
  const command = require(`./${file}`)

  client.commands.set(command.name, command)
})



client.on('message', message => {
  if ((!message.content.startsWith(prefix) && !message.content.startsWith(modPrefix)) || message.author.bot) return

  const args = message.content.slice(prefix.length).split(/ +/)
  const commandName = args.shift().toLowerCase();

  if(!client.commands.has(commandName)) return

  const command = client.commands.get(commandName);

  if(command.args && !args.length) {
    return message.reply('You didnt provide any arguments idiot')
  }

  try {
    command.execute(message, args, commandName)
  }

  catch(err) {
    console.error(err)
    message.reply('There was an error executing that command')
  }
  
})

module.exports = {
  client
}
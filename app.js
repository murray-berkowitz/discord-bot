const chalk = require('chalk')

const {client} = require('./commands/')

client.on('ready', () => {
  console.log(chalk.yellow('Ready!'))
})

client.login(require('./env.json').token)


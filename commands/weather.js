const {locations} = require('../methods/index')

module.exports = {
  name: 'w',
  description: 'Get the weather for a specified location',
  args: true,
  execute(message, args, command) {
    if(args.length == 0) {
      message.channel.send('You didnt enter any arguments dummy')
    }
    else {
      locations.getLocation(args.join(' '))
      .then(locationObj => {
        return locations.getWeather(locationObj)
      })
      .then(tempData => message.channel.send(`The temperature in ${tempData[0]} is ${command === 'wc' ? `${((tempData[1]-32)*(5/9)).toFixed(2)}˚ Celcius` : `${tempData[1]}˚ Farenheit`}`))
    }
  }
}
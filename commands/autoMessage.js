const { channelId, messageToSend } = require('../config');

function sendMessage(client) {

  const channel = client.channels.cache.get(channelId);

  if (channel) {

    channel.send(messageToSend)

      .then(() => console.log(`Message sent to channel: ${channelId}`))

      .catch(console.error);

  } else {

    console.error(`Channel with ID ${channelId} not found`);

  }

}

module.exports = {

  name: 'automessage',

  description: 'Sends a scheduled message to a specific channel every 30 minutes. Usage: `<prefix>autoMessage start/stop`',

  execute(channel, message, client, args, snipedMessages, autoMessageInterval, setAutoMessageInterval) {
      
       message.delete().catch(console.error);

    if (args[0] === 'start') {

      if (autoMessageInterval) {

        message.channel.send("Auto message is already running.");

      } else {

        sendMessage(client); // Send the message immediately on command

        const interval = setInterval(() => sendMessage(client), 1800000);

        setAutoMessageInterval(interval);

        message.channel.send("Auto message started.");

      }

    } else if (args[0] === 'stop') {

      if (autoMessageInterval) {

        clearInterval(autoMessageInterval);

        setAutoMessageInterval(null);

        message.channel.send("Auto message stopped.");

      } else {

        message.channel.send("Auto message is not running.");

      }

    } else {

      message.channel.send("Please specify 'start' or 'stop'.");

    }

  }

};
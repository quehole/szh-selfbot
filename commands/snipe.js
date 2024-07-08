module.exports = {

  name: 'snipe',

  description: 'Get the last deleted message in the channel.',

  execute(channel, message, client, args, snipedMessages) {
      
       message.delete().catch(console.error);

    console.log('Sniped Message IDs:', [...snipedMessages.keys()]); // Log the IDs of deleted messages

    const snipedMessage = snipedMessages.get(channel.id);

    if (!snipedMessage || !snipedMessage.author) {

      return message.channel.send('There are no deleted messages to snipe!');

    }

    const authorTag = snipedMessage.author.tag || 'Unknown User';

    message.channel.send(`**${authorTag}:** ${snipedMessage.content}`);

  },

};
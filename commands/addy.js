module.exports = {
    name: 'ltc',
    description: 'Sends LTC wallet address',
    /**
     * Executes the ltcaddress command.
     * 
     * @param {Channel} channel The channel where the command was executed.
     * @param {Message} message The message object for the command.
     * @param {Client} client The client or bot instance.
     * @param {String[]} args The arguments passed with the command.
     */
    execute(channel, message, client, args) {
        
         message.delete().catch(console.error);
        const ltcAddress = 'LcFA8TmFpCyEaFD3UgkncqL7b2E3EQgJJU';

        // Styled message with emojis
        const addressMessage = `**My LTC Wallet Address:**\n\n` +
                               `||${ltcAddress}||`;

        // Send the styled message to the channel
        message.channel.send(addressMessage);
    }
};

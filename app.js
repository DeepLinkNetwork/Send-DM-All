const dotenv = require('dotenv');
const config = require('./config.json');
dotenv.config();

const Discord = require('discord.js');
const figlet = require('figlet');
const colors = require('colors');
const readline = require('readline');
const commando = require(`discord.js-commando`);

const bot = new commando.Client({
    commandPrefix: process.env.PREFIX || config.prefix,
    owner: process.env.OWNER_ID || config.id
});

const cmdsArray = [
    "dmall <message>",
    "dmrole <role> <message>"
];

bot.on("ready", () => {
    clear();
    console.log(`Logged in as ${bot.user.tag}! (${bot.user.id})`);
    console.log('_________________________________________')
    bot.user.setActivity('Working For DarkTangent', { url: "https://github.com/DeepLinkNetwork/Send-DM-All", type: 'PLAYING' })
        .then(presence => console.log(`Activity set to ${presence.game ? presence.game.name : 'none'}`))
        .catch(console.error);
    
});


bot.on("error", (error) => {
    bot.login(process.env.BOT_TOKEN || config.token);
});

process.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection:', error);
});

bot.registry.registerGroup('dms', 'help');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + "/commands");

bot.login(process.env.BOT_TOKEN || config.token);

function clear() {
    console.clear();
    console.log(figlet.textSync("MassDM DeepCode v1.0").green); 
    console.log("\n\n>Mass DM bot for Discord. \n>Sends DMs to selected members of guild.\n>Forked and improved by DeepCode.");
    console.log(`>Type  ${process.env.PREFIX || config.prefix}help  in a chat.\n\n`);
}
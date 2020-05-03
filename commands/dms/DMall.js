const commando = require('discord.js-commando');
const app = require('../../app.js');
const config = require('../../config.json');
const Discord = require('discord.js');
const util = require('util');
const { Client, Permissions } = require('discord.js');

class DMallCommand extends commando.Command {
    constructor(client){
        super(client, {
            name: `dmall`,
            group: 'dms',
            memberName: 'dmall',
            description: 'Sends message provided to all members of the guild.',
            examples: [ `${config.prefix}dmall Hey everyone! This might reach more people than a mass ping...` ],
            clientPermissions: ['ADMINISTRATOR'],
            userPermissions: ['MANAGE_MESSAGES'],
        });
    }

    async run(message, args){
        let dmGuild = message.guild;
        let role = message.mentions.roles.first();
        var msg = message.content;

        try {
            msg = msg.substring(msg.indexOf("dmall") + 5);
        } catch(error) {
            console.log(error);
            return;
        }

        if(!msg || msg.length <= 30) {
            const embed = new Discord.RichEmbed()
                .addField(":x: Failed to send", "Wrong Message Length")
                .addField(":eyes: Listen up! @DeepCode Say's", "Every character past the command will be sent,\nand message length should be greater than 35 Chars.");
            message.channel.send({ embed: embed });
            return;
        }

        let memberarray = dmGuild.members.array();
        let membercount = memberarray.length;
        let botcount = 0;
        let successcount = 0;
        await sleep(1000);
        message.channel.send(`Responding to ${message.author.username} :  Sending message to all ${membercount} members of ${dmGuild.name}.`)
        for (var i = 0; i < membercount; i++) {
            let member = memberarray[i];
            if (member.user.bot) {
                await sleep(2080);
                message.channel.send(`Skipping bot with name ${member.user.username}`)
                botcount++;
                continue
            }
            let timeout = Math.floor((randomIntFromInterval(0.8,1) * Math.random() * (config.wait - 0.01)) * 1000) + 10;
            await sleep(timeout);
            if(i == (membercount-1)) {
                message.channel.send(`Waited ${timeout}ms.\t\\/\tDMing ${member.user.username}`);
            } else {
                message.channel.send(`Waited ${timeout}ms.\t|${i + 1}|\tDMing ${member.user.username}`);
            }
            try {
                await sleep(2030);
                member.send(`${msg} \n\n **__Message Sent By DarkTangent Esports__**`);
                successcount++;
            } catch (error) {
                console.log(`Failed to send DM! ` + error)
            }
            if(i%5 == 0) {
                await sleep(2040);
                message.channel.send(`I have Sent ${successcount} ${(successcount != 1 ? `messages` : `message`)} successfully, ` +
            `${botcount} ${(botcount != 1 ? `bots were` : `bot was`)} skipped. \nTaking Rest For 5 seconds beep beep..`);
               await sleep(5000);
            }
        }
        await sleep(5000);
        message.channel.send(`**DMing Completed** Sent ${successcount} ${(successcount != 1 ? `messages` : `message`)} successfully, ` +
            `${botcount} ${(botcount != 1 ? `bots were` : `bot was`)} skipped.`);
    }
}

function randomIntFromInterval(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = DMallCommand;
const fs = require('fs');
const snekfetch = require('snekfetch');
const Discord = require('discord.js');
if (process.argv[2] && process.argv[2] === '--travis') var config = require('./config-example.json');
else config = require('./data/config.json');

module.exports = bot => {
    /**
     * Server Related Functions
     */

    bot.fetchGuildSize = function() {
        return new Promise(
            resolve => {
                if (bot.shard) {
                    bot.shard.fetchClientValues('guilds.size').then(g => {
                        resolve(g.reduce((prev, val) => prev + val, 0));
                    }).catch(console.error);
                } else {
                    resolve(bot.guilds.size);
                }
            }
        );
    };

    /* Core message processing functions
	 */

    // Implement categories of commands and check this based on those
    bot.enabled = function(command, guild) {
        if (command || guild) {
            return true;
        } else {
            return false;
        }
    };

    bot.permLevel = function(msg) {
        if (msg.author.id === bot.config.owner) {
            return 6;
        } else if (msg.author.id === msg.guild.owner.id) {
            return 5;
        } else if (msg.member.hasPermission('MANAGE_GUILD')) {
            return 4;
        } else if (msg.member.hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) {
            return 3;
        } else if (msg.member.hasPermission('MANAGE_MESSAGES')) {
            return 2;
        }  else {
            return 1;
        }
    };

    bot.processMessage = async function(msg) {

        if (msg.author.bot) return;

        if (msg.content.startsWith(config.prefix))
            try {
                msg.args = msg.content.split(/\s+/g);
                msg.content = msg.content.substring(msg.content.indexOf(' ') + 1, msg.content.length) || null;
                var command = msg.args.shift().slice(config.prefix.length).toLowerCase();
                var cmd = bot.commands.get(command);

                var perms = bot.permLevel(msg);

                if (!cmd) {
                    return;
                } else if (perms === 0) {
                    msg.reply('you are blacklisted from using the bot!');
                } else if (perms < cmd.permission) {
                    msg.reply('you do not have permission to do this!');
                } else if (bot.enabled(cmd)) {
                    bot.logCommand(command, msg.content, msg.author.username, msg.channel.name, msg.guild.name);
                    try {
                        cmd.main(bot, msg);
                    } catch (err) {
                        msg.channel.send('Oh no! We encountered an error:\n```' + err.stack + '```');
                    }
                }
            } catch (err) {
                msg.channel.send('Oh no! We encountered an error:\n```' + err.stack + '```');
                bot.error(err.stack);
            }
    };

    /**
	 * Core bot functions
	 */

    bot.send = function(channel2, text) {
        var color = channel2.guild.me.displayHexColor || '#ffb200';
        channel2.send(new Discord.RichEmbed().setColor(color).setDescription(text)
            .setFooter(bot.user.username, bot.user.avatarURL));
    };

    bot.startGameCycle = function() {
        bot.user.setPresence({
            game: {
                name: bot.config.games[Math.round(Math.random() * (bot.config.games.length - 1))],
                type: 0,
            },
        });
        setInterval(() => {
            bot.user.setPresence({
                game: {
                    name: bot.config.games[Math.round(Math.random() * (bot.config.games.length - 1))],
                    type: 0,
                },
            });
        }, 300000);
    };

    /**
	 * Logging functions
	 */

    bot.logCommand = function(command, args, user, channel2, server) {
        //bot.webhook('Command Executed', `**Command:** ${command}\n**User:** ${user}\n**Arguments:** ${args}\n**Server:** ${server}\n**Channel:** #${channel2}`, '#0000FF');
    };

    bot.error = function(err) {
        if (bot.shard) {
            console.log(this.timestamp() + ' [SHARD ' + bot.shard.id + '] [ERROR] | ' + err.stack);

        } else {
            console.log(this.timestamp() + ' [ERROR] | ' + err.stack);

        }
    };

    bot.debug = function(txt) {
        if (bot.shard) {
            console.log(this.timestamp() + ' [SHARD ' + bot.shard.id + '] [DEBUG] | ' + txt);
        } else {
            console.log(this.timestamp() + ' [DEBUG] | ' + txt);
        }
    };

    bot.warn = function(txt) {
        if (bot.shard) {
            console.log(this.timestamp() + ' [SHARD ' + bot.shard.id + '] [WARN]  | ' + txt);

        } else {
            console.log(this.timestamp() + ' [WARN]  | ' + txt);

        }
    };

    bot.log = function(txt) {
        if (bot.shard) {
            console.log(this.timestamp() + ' [SHARD ' + bot.shard.id + ']  [LOG]  | ' + txt);

        } else {
            console.log(this.timestamp() + '  [LOG]  | ' + txt);

        }
    };

    bot.timestamp = function() {
        var currentTime = new Date(),
            hours = currentTime.getHours(),
            minutes = currentTime.getMinutes(),
            seconds = currentTime.getSeconds();
        if (minutes < 10) { minutes = '0' + minutes; }
        if (seconds < 10) { seconds = '0' + seconds; }
        return '[' + hours + ':' + minutes + ':' + seconds + ']';
    };

    /**
	 * Utility functions for information retrieval
	 */
};

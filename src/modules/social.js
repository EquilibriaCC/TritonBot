const fetch = require('node-fetch');
const Discord = require('discord.js');

module.exports = {
    name: 'social',
    type: 'core',
    usage: 'social',
    permission: 0,
    help: 'List of social links',
    main: async function(bot, msg) {
        const emb = new Discord.RichEmbed()
            .setTitle('Triton Social Networks')
            .setColor('YELLOW')
            .setFooter('Triton Team')
            .setTimestamp();

            emb.addField("Twitter","https://twitter.com/ProjectTriton",false)
              .addField("GitHub","https://github.com/",true)
              .addField("Website","https://xtri.network",false)
              .addField("Discord","https://discord.gg/pS7kjv2",false);

        msg.channel.send(emb);

    },
};

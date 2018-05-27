const Discord = require('discord.js');
exports.run = (bot, member) => {
    let emb = new Discord.RichEmbed()
        .setTitle(`New User`)
        .setColor(`GREEN`)
        .setThumbnail(member.user.displayAvatarURL)
        .addField(member.user.username, `ID: ${member.user.id}`);
    bot.channels.get(`403400041085140993`).send({embed: emb});
};

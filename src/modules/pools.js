const fetch = require('node-fetch');
const Discord = require('discord.js');

module.exports = {
    name: 'pools',
    type: 'core',
    usage: 'pools',
    permission: 1,
    help: 'List of Pools',
    main: async function(bot, msg) {
        const emb = new Discord.RichEmbed()
            .setTitle('Triton Pools')
            .setColor('BLUE')
            .setFooter('Triton Team')
            .setTimestamp();

            emb.addField(":flag_um:","United States",false)
              .addField(" SemiPool","https://webxtri.semipool.com",true)
              .addField(" Smartcoin Pool","https://triton.smartcoinpool.com",false)
              .addField(" Llama & Horse","http://xtri.nbx.llama.horse",false)
              .addField(":flag_fr:","France")
              .addField("LuckyPool","https://xtri.luckypool.io")
              .addField("Hashvault Pro","https://triton.hashvault.pro")
              .addField("MinerCountry + Iridium","https://xtridium.minercountry.com")
              .addField("MinerCountry Non-MM","https://xtri.minercountry.com")
              .addField(":flag_de:","Germany")
              .addField("Hackerknowledge","https://xtri.hackerknowledge.de")
              .addField(":flag_hk:","Hong Kong")
              .addField("CnPool","https://cnpool.cc/xtri");
;
        // emb.addField('\u200b', '**Pools**')
        //     .addField(":flag_um:","(United States)")
        //     .addField("1","[SemiPool](https://webxtri.semipool.com)")
        //     .addField("2","[Smartcoin Pool](https://triton.smartcoinpool.com)")
        //     .addField("3","[Llama & Horse](http://xtri.nbx.llama.horse)")




        msg.channel.send(emb);

    },
};

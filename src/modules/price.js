const fetch = require('node-fetch');
const Discord = require('discord.js');

module.exports = {
    name: 'price',
    type: 'core',
    usage: 'price',
    permission: 1,
    help: 'Fetches price.',
    main: async function(bot, msg) {

       

        const btc_usdd =  await fetch('https://blockchain.info/ticker');
        const btc_usd = await btc_usdd.json();
        const rate = parseFloat(btc_usd.USD.last);

        const trade_ogred = await fetch('https://tradeogre.com/api/v1/ticker/BTC-TRIT');
        const trade_ogre = await trade_ogred.json();

        const emb = new Discord.RichEmbed()
            .setTitle('Triton Prices')
            .setColor('GREEN')
            .setFooter('Triton Team')
            .setTimestamp();

        


        let togre_vol = 0;

        togre_vol += parseFloat(trade_ogre.volume) * rate;

        emb.addField('\u200b', '**TradeOgre**')
            .addField('USD Price', "$"+ (parseFloat(trade_ogre.price) * rate), true)
            .addField('BTC Price', trade_ogre.price + " BTC", true)
            .addField('24hr Volume (BTC only)', "$" + togre_vol.toFixed(2), true)
            .addField('Movement', (((parseFloat(trade_ogre.price) / parseFloat(trade_ogre.initialprice)) * 100) - 100).toFixed(2) + "%", true);

        msg.channel.send(emb);

    },
};

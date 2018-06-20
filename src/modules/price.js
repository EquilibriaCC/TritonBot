const fetch = require('node-fetch');
const Discord = require('discord.js');

module.exports = {
    name: 'price',
    type: 'core',
    usage: 'price',
    permission: 1,
    help: 'Fetches price.',
    main: async function(bot, msg) {

        const altexd = await fetch('https://api.altex.exchange/v1/ticker');
        const altex = await altexd.json();

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

        let altex_vol = 0;

        altex_vol += parseFloat(altex.data.BTC_TRIT.volume) * rate;

        emb.addField('\u200b', '**Altex**')
            .addField('USD Price', "$"+ (parseFloat(altex.data.BTC_TRIT.last) * rate), true)
            .addField('BTC Price', altex.data.BTC_TRIT.last + " BTC", true)
            .addField('XMR Price', altex.data.XMR_TRIT.last + " XMR", true)
            .addField('LTC Price', altex.data.LTC_TRIT.last + " LTC", true)
            .addField('24hr Volume (BTC only)', "$" + altex_vol.toFixed(2), true)
            .addField('Movement', altex.data.BTC_TRIT.change + "%", true);

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

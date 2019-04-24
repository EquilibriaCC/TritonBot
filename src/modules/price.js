const fetch = require('node-fetch');
const Discord = require('discord.js');
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
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

        const trade_ogred = await fetch('https://tradeogre.com/api/v1/ticker/BTC-XTRI');
        const trade_ogre = await trade_ogred.json();

        const triton_emm = await fetch ('https://explorer.xtri.network/api/emission')
        const triton_json = await triton_emm.json();
        var triton_em = 0;
        console.log(triton_json)
        if(triton_json.data.coinbase){
          triton_em = (parseFloat(triton_json.data.coinbase) / 10000).toFixed(4);
        }
        console.log(triton_em);
        const emb = new Discord.RichEmbed()
            .setTitle('Triton Prices')
            .setColor('GREEN')
            .setFooter('Triton Team')
            .setTimestamp();

        let togre_vol = 0;

        togre_vol += parseFloat(trade_ogre.volume) * rate;

        emb.addField('\u200b', '**TradeOgre**')
            .addField('USD Price', "$"+ (parseFloat(trade_ogre.price) * rate).toFixed(4), true)
            .addField('USD Market Cap', "$"+ numberWithCommas(((parseFloat(trade_ogre.price) * rate) * triton_em).toFixed(2)), true)
            .addField('BTC Price', trade_ogre.price + " BTC", true)
            .addField('24hr Volume (BTC only)', "$" + togre_vol.toFixed(2), true)
            .addField('Movement', (((parseFloat(trade_ogre.price) / parseFloat(trade_ogre.initialprice)) * 100) - 100).toFixed(2) + "%", true);

        msg.channel.send(emb);

    },
};

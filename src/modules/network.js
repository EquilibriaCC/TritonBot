const fetch = require('node-fetch');
const Discord = require('discord.js');

module.exports = {
    name: 'network',
    type: 'core',
    usage: 'network',
    permission: 0,
    help: 'Fetches network info.',
    main: async function(bot, msg) {

      var block = 0;
      var txs = 0;
      var diff = 0;
      var hfv = 0;
      var hashrate = 0;
      var tx_pool = 0;
      var supply = 0;
      var supply2 = 0;

    const triton_ni = await fetch ('https://explorer.xtri.network/api/networkinfo')
    const triton_em = await fetch ('https://explorer.xtri.network/api/emission')
    const triton_em_json = await triton_em.json();
    const triton_json = await triton_ni.json();

    if(triton_json.data.status == true){
        block = triton_json.data.height;
        txs = triton_json.data.tx_count;
        diff = triton_json.data.difficulty;
        hfv = triton_json.data.current_hf_version;
        tx_pool = triton_json.data.tx_pool_size;
        hashrate = triton_json.data.hash_rate;
        supply = (parseFloat(triton_em_json.data.coinbase) / 10000).toFixed(0);
        supply2 = (parseFloat(triton_em_json.data.coinbase) / 10000).toFixed(4)
    }
      



      var blockreward = ((84000000.0000 + 10769598.8100) - supply2) >> 20;
        const emb = new Discord.RichEmbed()
            .setTitle('Triton Network Info')
            .setColor('GREEN')
            .setFooter('Triton Team')
            .setTimestamp();

        emb.addField('\u200b', '**Stats**')
            .addField('Block Height:', numberWithCommas(block), true)
            .addField('Supply: ', numberWithCommas(supply) + " XTRI", true)
            .addField('Block Reward: ', "~" + blockreward + " XTRI", true)
            .addField('Transactions: ', numberWithCommas(txs), true)
            .addField("Difficulty: " , getReadableHashRate(diff), true)
            .addField("Hash Rate: " , getReadableHashRate(hashrate) + "/sec", true)
            .addField("Transaction Pool: " , tx_pool, true)
            .addField('Hard Fork Version: ', hfv, true);

        msg.channel.send(emb);

    },
};

function getReadableHashRate(hashrate){
    var i = 0;
    var byteUnits = [' H', ' KH', ' MH', ' GH', ' TH', ' PH' ];
    while (hashrate > 1000){
        hashrate = hashrate / 1000;
        i++;
    }
    return hashrate.toFixed(2) + byteUnits[i];
}
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

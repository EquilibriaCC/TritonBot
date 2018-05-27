module.exports = {
    name: 'ping',
    type: 'core',
    usage: 'ping',
    permission: 1,
    help: 'Tests the bot\'s ping time.',
    main: async function (client, message) {
        message.channel.send('Pong!').then(async sent => {
            const timeDiff = (sent.editedAt || sent.createdAt) - (message.editedAt || message.createdAt);
            const text = `🔂\u2000**RTT**: ${timeDiff} ms\n💟\u2000**Heartbeat**: ${Math.round(client.ping)} ms`;
            await message.reply(`Pong!\n${text}`);
        });},
};

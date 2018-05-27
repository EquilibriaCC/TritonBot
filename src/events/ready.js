exports.run = bot => {
    bot.startGameCycle();


    bot.log(`${bot.user.username} is online and ready to serve in ${bot.channels.size} channels on ${bot.guilds.size} servers!`);

    if (process.argv[2] && process.argv[2] === '--travis') process.exit(0);
};

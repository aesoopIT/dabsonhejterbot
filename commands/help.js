const pagination = require('discord.js-pagination');
const Discord = require('discord.js');

module.exports = {
    name: "help",
    description: "The help command, what do you expect?",

    async run (client, message, args){

        //Sort your commands into categories, and make seperate embeds for each category

        const moderation = new Discord.MessageEmbed()
        .setTitle('Moderation')
        .addField('`.clear`', 'Myjesz Brud')
        .addField('`.calculate`', 'Policz policz, bo na paluszkach nie potrafisz')
        .addField('`.covid`', 'Track the amount of COVID-19 cases')
        .addField('`.weather`', 'Checks weather forecast for provided location')


        .setTimestamp()

        const fun = new Discord.MessageEmbed()
        .setTitle('Fun')
        .addField('`.meme`', 'Meme dobre jest')
        .addField('`.ascii`', 'Jakiś UwU text')
        .addField('`.giveaway`', 'Sprzedajesz dusze')
        .addField('`.avatar`', 'Bo ślepi jesteśmy')
        .addField('`j`', 'Jebiesz DIsa')
        .addField('`komodo`', 'KOMODOHYPE')
        .addField('`damian`', 'Jebiesz damiana')
        .addField('`liga`', 'szatan')
        .addField('`w2`', 'watch2gether')
        .addField('`dziena`', 'spoko byczku')
        .addField('`wuw`', 'spierdalaj')
        .addField('`hej suczki`', 'rararara')

        .setTimestamp()

        const DabsonHejter = new Discord.MessageEmbed()
        .setTitle('Dabson Hejter')
        .addField('`.play`', 'Start muzyczki')
        .addField('`.stop`', 'e')
        .addField('`.skip`', 'e')
        .addField('`.resume`', 'e')
        .addField('`.loop`', 'e')
        .addField('`.queue`', 'e')
        .addField('`.leave`', 'ide')
        .setTimestamp()

        const pages = [
                moderation,
                fun,
                DabsonHejter
        ]

        const emojiList = ["⏪", "⏩"];

        const timeout = '120000';

        pagination(message, pages, emojiList, timeout)
    }
}
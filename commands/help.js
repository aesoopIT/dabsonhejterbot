const pagination = require('discord.js-pagination');
const Discord = require('discord.js');

module.exports = {
    name: "help",
    description: "The help command, what do you expect?",

    async run (client, message, args){

        

        const moderation = new Discord.MessageEmbed()
        .setTitle('Commands with .')
        .addField('`.clear`', 'Myjesz Brud')
        .addField('`.calculate`', 'Policz policz, bo na paluszkach nie potrafisz')
        //.addField('`.covid`', 'Track the amount of COVID-19 cases')
        .addField('`.weather`', 'Checks weather forecast for provided location')
        .addField('`.meme`', 'Meme dobre jest')
        .addField('`.ascii`', 'Jakiś UwU text')
        //.addField('`.giveaway`', 'Sprzedajesz dusze')
        .addField('`.avatar`', 'Bo ślepi jesteśmy')


        .setTimestamp()

        const fun = new Discord.MessageEmbed()
        .setTitle('BEZ KROPKI KURWA NIE DAWAJ KROPI')
        .addField('`j`', 'Jebiesz DIsa')
        .addField('`komodo`', 'KOMODOHYPE')
        .addField('`damian`', 'Jebiesz damiana')
        .addField('`liga`', 'szatan')
        .addField('`w2`', 'watch2gether')
        .addField('`dziena`', 'spoko byczku')
        .addField('`uwu`', 'spierdalaj')
        .addField('`hej suczki`', 'rararara')
        .addField('`kto ty`', 'no')
        .addField('`ty`', 'tak ty')
        .addField('`dawac`', 'wbijac')
        .addField('`mc`', 'mcnota')
        .addField('`urodziny`', '12.01.2021')
        .addField('`sto lat`', 'yez')
        .addField('`władysław`', 'uwusiowo')
        .addField('`widzisz mnie`', 'wiesz co')
        .addField('`powiedz mi fraszke`', 'wiesz co')
        .addField('`;c`', 'smutek')
        .addField('``', '')


        .addField('`kk`', 'sadeg')





        .setTimestamp()

        const DabsonHejter = new Discord.MessageEmbed()
        .setTitle('Dabson Hejter MusicBOT')
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

        const emojiList = ["<:Sadeg:897588207015850054>", "<:biblethump:798295427836936222>"];              // ["⏪", "⏩"];

        const timeout = '120000';

        pagination(message, pages, emojiList, timeout)
    }
}
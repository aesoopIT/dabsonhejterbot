const figlet = require('figlet');

module.exports = {
    name: "ascii",
    description: "Napisz se w ascii",

    async run (client, message, args){
        if(!args[0]) return message.channel.send('No napisz cos deklu');

        msg = args.join(" ");

        figlet.text(msg, function (err, data){
            if(err){
                console.log('No coś poszło nie tak');
                console.dir(err);
            }
            if(data.length > 2000) return message.channel.send('Mniej niż 2000 znaków eeeee')

            message.channel.send('```' + data + '```')
        })
    }
}
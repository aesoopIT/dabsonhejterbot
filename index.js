const Discord = require('discord.js');

const client = new Discord.Client();

const { Client, MessageAttachment } = require('discord.js');

const { token } = require('./config.json');

const { readdirSync, realpathSync } = require('fs');

const { join } = require('path');

const config = require('./config.json');
client.config = config;

const guild = client.guilds.cache.get("389514334943838208");

var firstName = "Dabson";
var lastName = "Hejter";
var komodo = "<:komodohype:798193051792179200>";

// Init discord giveaways
const { GiveawaysManager } = require('discord-giveaways');
const { i } = require('mathjs');
client.giveawaysManager = new GiveawaysManager(client, {
    storage: "/giveaways.json",
    updateCountdownEvery: 5000,
    default: {
        botsCanWin: config.botsCanWin,
        embedColor: config.embedColor,
        embedColorEnd: config.embedColor,
        reaction: config.reaction
    }
});
// We now have a client.giveawaysManager property to manage our giveaways!

client.giveawaysManager.on("giveawayReactionAdded", (giveaway, member, reaction) => {
    console.log(`${member.user.tag} entered giveaway #${giveaway.messageID} (${reaction.emoji.name})`);
});

client.giveawaysManager.on("giveawayReactionRemoved", (giveaway, member, reaction) => {
    console.log(`${member.user.tag} unreact to giveaway #${giveaway.messageID} (${reaction.emoji.name})`);
}); 






client.commands= new Discord.Collection();

const prefix = '.';
//You can change the prefix if you like. It doesn't have to be ! or ;


const commandFiles = readdirSync(join(__dirname, "commands")).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(join(__dirname, "commands", `${file}`));
    client.commands.set(command.name, command);
};


client.on("error", console.error);

client.on('ready', () => {
    console.log('I am ready');

    console.log("Connected as " + client.user.tag);

    client.user.setActivity("Damiana jak sra", {type:"WATCHING"});

    /* client.guilds.cache.forEach((guild) => {
        console.log(guild.name);
        guild.channels.cache.forEach((channel) => {
            console.log(` - ${channel.name} ${channel.type} ${channel.id}`);
        })
}) */

});


client.on("message", async message => {

    if (message.content.toLowerCase().startsWith("komodo")) {       //KOMODO
        message.channel.send("<:komodohype:798193051792179200>");
        message.channel.send("<:komodohype:798193051792179200>");
        message.channel.send("<:komodohype:798193051792179200>");
    } 


    if(message.author.bot) return;
    if(message.channel.type === 'dm') return;

    if(message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/);

        const command = args.shift().toLowerCase();

        if(!client.commands.has(command)) return;


        try {
            client.commands.get(command).run(client, message, args);

        } catch (error){
            console.error(error);
        } 
    }
});

// Jebanie disa
client.on('message', msg => {
    if (msg.content === ('j' + 'J')) {
        msg.reply("JD kurwe");
    } else if (msg.content.toLowerCase().startsWith('liga')) {
        msg.channel.send("@everyone\n\n" + " dawac na lige<:komodohype:798193051792179200>");
    } else if (msg.content === ('damian')) {
        msg.channel.send("Damiana dawaj <:biblethump:798295427836936222>");
    } else if (msg.content === ('w2')) {
        msg.channel.send("https://www.watch2gether.com/rooms/jd-cues1vvoemz4p3twl5?lang=pl");
    } else if (msg.content === ('dziena')) {
        msg.channel.send("spoko byku :sunglasses: :call_me:");
    } else if (msg.content === ('uwu')) {
        msg.channel.send("NO WYPIERDALAJ Z TYM SYFEM");
        const attachment = new MessageAttachment('https://cdn.discordapp.com/attachments/389514334943838210/798307138635563068/2021-01-11_at_22-47-25.png');
        msg.channel.send(attachment);
    } else if (msg.content === ('hej suczki')) {
        msg.channel.send("rararara");
    } else if (msg.content === ('kto ty')) {
        msg.channel.send(firstName + lastName);
    }  
});






// MUSIC BOT
const { executionAsyncResource } = require('async_hooks');
const ytdl = require('ytdl-core');

const { YTSearcher } = require('ytsearcher');

const searcher = new YTSearcher({
    key: "AIzaSyByk4l0UNWOSjKBbDGtkAMztU15Shj8_jU",
    revealed: true
});


const queue = new Map();


client.on("message", async(message) => {

    const serverQueue = queue.get(message.guild.id);

    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const command = args.shift().toLowerCase();

    switch(command){
        case 'play':
            execute(message, serverQueue);
            break;
        case 'stop':
            stop(message, serverQueue);
            break;
        case 'skip':
            skip(message, serverQueue);
            break;
        case 'pause':
            pause(serverQueue);
            break;
        case 'resume':
            resume(serverQueue);
            break;
        case 'loop':
            Loop(args, serverQueue);
            break;
        case 'queue':
            Queue(serverQueue);
            break;
        }

    async function execute(message, serverQueue){
        let vc = message.member.voice.channel;
        if(!vc){
            return message.channel.send("Please join a voice chat first");
        }else{
            let result = await searcher.search(args.join(" "), { type: "video" }) 
            const songInfo = await ytdl.getInfo(result.first.url)

            let song = {
                title: songInfo.videoDetails.title,
                url: songInfo.videoDetails.video_url
            };

            if(!serverQueue){
                const queueConstructor = {
                    txtChannel: message.channel,
                    vChannel: vc,
                    connection: null,
                    songs: [],
                    volume: 10,
                    playing: true,
                    loopone: false,
                    loopall: false
                };
                queue.set(message.guild.id, queueConstructor);

                queueConstructor.songs.push(song);

                try{
                    let connection = await vc.join();
                    queueConstructor.connection = connection;
                    play(message.guild, queueConstructor.songs[0]);
                }catch (err){
                    console.error(err);
                    queue.delete(message.guild.id);
                    return message.channel.send(`Unable to join the voice chat ${err}`)
                }
            }else{
                serverQueue.songs.push(song);
                return message.channel.send(`The song has been added ${song.url}`);
            }
        }
    }
    function play(guild, song){
        const serverQueue = queue.get(guild.id);
        if(!song){
            serverQueue.vChannel.leave();
            queue.delete(guild.id);
            return;
        }
        const dispatcher = serverQueue.connection
            .play(ytdl(song.url))
            .on('finish', () =>{
                if(serverQueue.loopone){  
                    play(guild, serverQueue.songs[0]);
                }
                else if(serverQueue.loopall){
                    serverQueue.songs.push(serverQueue.songs[0])
                    serverQueue.songs.shift()
                }else{
                    serverQueue.songs.shift()
                }
                play(guild, serverQueue.songs[0]);
            })
            serverQueue.txtChannel.send(`***Now playing*** <:komodohype:798193051792179200> ${serverQueue.songs[0].url}`)
    }
    function stop (message, serverQueue){
        if(!message.member.voice.channel)
            return message.channel.send("You need to join the voice chat first!")
        serverQueue.songs = [];
        serverQueue.connection.dispatcher.end();
    }
    function skip (message, serverQueue){
        if(!message.member.voice.channel)
            return message.channel.send("You need to join the voice chat first");
        if(!serverQueue)
            return message.channel.send("There is nothing to skip!");
        serverQueue.connection.dispatcher.end();
    }
    function pause(serverQueue){
        if(!serverQueue.connection)
            return message.channel.send("There is no music currently playing!");
        if(!message.member.voice.channel)
            return message.channel.send("You are not in the voice channel!")
        if(serverQueue.connection.dispatcher.paused)
            return message.channel.send("The song is already paused");
        serverQueue.connection.dispatcher.pause();
        message.channel.send("The song has been paused!");
    }
    function resume(serverQueue){
        if(!serverQueue.connection)
            return message.channel.send("There is no music currently playing!");
        if(!message.member.voice.channel)
            return message.channel.send("You are not in the voice channel!")
        if(serverQueue.connection.dispatcher.resumed)
            return message.channel.send("The song is already playing!");
        serverQueue.connection.dispatcher.resume();
        message.channel.send("The song has been resumed!");
    }
    function Loop(args, serverQueue){
        if(!serverQueue.connection)
            return message.channel.send("There is no music currently playing!");
        if(!message.member.voice.channel)
            return message.channel.send("You are not in the voice channel!")

        switch(args[0]){
           case 'all':
               serverQueue.loopall = !serverQueue.loopall;
               serverQueue.loopone = false;

               if(serverQueue.loopall === true)
                   message.channel.send("Loop all has been turned on!");
               else
                    message.channel.send("Loop all has been truned off!");

               break;
            case 'one':
                serverQueue.loopone = !serverQueue.loopone;
                serverQueue.loopall = false;

                if(serverQueue.loopone === true)
                    message.channel.send("Loop one has been turned on!");
                else
                    message.channel.send("Loop one has been truned off!");
                break;
            case 'off':
                    serverQueue.loopall = false;
                    serverQueue.loopone = false;

                    message.channel.send("Loop has been turned off!");
                break;
            default:
                message.channel.send("Please specify what loop you want. .loop <one/all/off>"); 
        }
    }
    function Queue(serverQueue){
        if(!serverQueue.connection)
            return message.channel.send("There is no music currently playing!");
        if(!message.member.voice.channel)
            return message.channel.send("You are not in the voice channel!")

        let nowPlaying = serverQueue.songs[0];
        let qMsg =  `Now playing: ${nowPlaying.title}\n--------------------------\n`

        for(var i = 1; i < serverQueue.songs.length; i++){
            qMsg += `${i}. ${serverQueue.songs[i].title}\n`
        }

        message.channel.send('```' + qMsg + 'Requested by: ' + message.author.username + '```');
    }
})

client.login(process.env.DB_TOKEN);
const Discord = require('discord.js');

module.exports = {
    name: "valheim",
    description: "pingowansko",

    async run (client, message, args) {

        if (message.content == ('valheim')) {
            message.channel.send("@valheimKOKS\n\n" + "Dawac na Valheima suczki <:peepohappy:980513308950016120>");

        }

    }
}
const { Client, Intents, Permissions, MessageEmbed } = require("discord.js");
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,
    ],
    partials: ["CHANNEL"]
}) 
const { glob } = require('glob');
const { promisify } = require('util');
const globPromise = promisify(glob);
let configurações = require("./configs.json")
client.login(configurações.token)
client.on("ready", () =>{
let dono = client.users.cache.get(configurações.dono_id)
if(!dono) return console.log("Ixi, não conheço meu proprio dono:( Coloque um id valido")

    if(configurações.logs_start.ligado == "on") {



        let canal = client.channels.cache.get(configurações.logs_start.canal_id)

        if(!canal) return console.log("Canal de logs start invalido! Desative o sistema ou coloque um id valido")

        canal.send({content: `fui iniciado!`})
    }
})

client.on('messageCreate', message => {if (message.author.bot) return;if (message.channel.type == 'dm') return;if (!message.content.toLowerCase().startsWith(configurações.prefix.toLowerCase())) return;if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) return;const args = message.content.trim().slice(configurações.prefix.length).split(/ +/g);const command = args.shift().toLowerCase();try {const commandFile = require(`./comandos/${command}.js`);commandFile.run(client, message, args);} catch (err) { console.log(err)}});


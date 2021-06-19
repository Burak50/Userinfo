const Discord = require("discord.js");
const client = new Discord.Client();

config = require("./config.json");
token = (config.token);
prefix = (config.prefix);
channelid = (config.channelID);


client.on("ready", () => {
  console.log("[+] Bot Online.")
});

client.on("message", async(message) => {
  const args = message.content.trim().split(/ +/g);


  if(message.author.bot) return;

    if(message.channel.id === channelid) {
      client.users.fetch(args).then(user => {
        const flags = user.flags.toArray({});

        const Embed = new Discord.MessageEmbed()
            .addField('Name', user.username, true)
            .addField('Discrim', "#"+user.discriminator, true)
            .addField('Erstellt', user.createdAt.toLocaleDateString("de-de"), true)
            .addField('Status', user.bot? 'Ein Bot' : 'Kein Bot', true)
            .addField('Email', user.email? 'Keine Email ist hinterlegt.' : 'Eine Email ist hinterlegt.', true)
            .addField("_ _", "_ _", true)
            .addField('Flags', flags.splice(', '))
            .addField('Email', user.verified ? 'Konto ist nicht verifiziert.' : 'Konto ist verifizeriert.')
            .addField('ID', user.id)

        .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 1024 }))

        client.channels.cache.get(channelid).send(Embed);
    })
  }
});

client.login(token);
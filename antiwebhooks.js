const Discord = require('discord.js');
const client = new Discord.Client();
const chalk = require('chalk');
const fs = require('fs');

client.on('ready', () => {
  console.log(`Statistiques globales : \n\nLe bot a un total de ${client.guilds.cache.size} serveurs.`) 
  console.log(`le bot s'appelle ${client.user.tag}!`);
  console.log(`                                           le bot est ok il est bien en ligne !`);
  console.log(`    | logs du bot |`);
});

client.on('ready' , () => {
    client.user.setActivity(`${client.guilds.cache.size} serveurs | &help `, {type: 'STREAMING', url: 'https://twitch.tv/sohan221145'})
  })
  
client.on('message', message => {
  if(message.content == "&help"){
    const helpEmbed = new Discord.MessageEmbed()
    .setColor('#b40f17')
    .setTitle('liste des commandes disponible')
    .setURL(' https://discord.com/oauth2/authorize?client_id=848896977478484029&scope=bot&permissions=8')
    .setDescription('**Le bot sert a protégé le serveur des raids webhooks. (Il est conseillé de le mettre le plus haut possible pour qu il ne sois pas géné par d autre bot.)**')
    .addField("`antilink`",` \n - Un anti-link est intégré dans le bot si quelqu'un envoi un liens d'invitation de un serveur il sera supprimé automatiquement`)
    .addField("`&botperso`",` \n - Comment faire une demande de bot personnalisé`)
    .addField("`&ping`",` \n - Il répondra pong `)
    .addField("`&vc`",` \n - Pour savoir combien de personnes sont en vocal et le nombre de membres sur votre serveur`)
    .addField("`&serveurs`",` \n - Pour savoir dans combien de serveur est le bot`)
    .addField("`&invite`",` \n - Pour avoir une invitation du bot`)
    .addField("`&la`",` \n - Pour avoir la liste des personnes qui ont la permission administrative`)
    .addField("`&purge`",` \n - Pour recrée un salon`)
    .setTimestamp()
    .setFooter('Créé par Beta#1111', 'https://images-ext-2.discordapp.net/external/ou7elXp1wT2R3_iYXh1OXe_Hitfqy1JQiLjOTkpHBGE/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/848896977478484029/fa6fcbafed7f189127793c410b2418d3.png?width=563&height=563');
      
    message.channel.send(helpEmbed);
  }
});

client.on('message',  message => {
 

  if (message.content === 'discord.gg/') {
    message.delete()

  }

  if (message.content === '.gg/') {
    message.delete()

  }

  if (message.content === '&botperso') {
    message.channel.send(`Toute demande de bot perso devra etre demandé à <@493442263964188681>`)
    console.log(`quelqu un utilise la commande botperso`);
  }

  if (message.content === '&vc') {
    message.channel.send(`Membre en vocal: **${message.guild.members.cache.filter(m => m.voice.channel).size}** (**${message.guild.memberCount} membres**)`)
    console.log(`quelqu un utilise la commande vc`);
  }


  if (message.content === '&purge') {
  if(!message.member.hasPermission("ADMINISTRATOR")) return;
  message.channel.clone({reason: `Purge réclamé par ${message.author.tag} (${message.author.id})`}).then(c => c.setPosition(message.channel.position) && c.send(`:boom: La purge réclamé par ${message.author} a été effectué.`))
  message.channel.delete() 
  };


  if (message.content === '&ping') {
    message.channel.send(`🏓 pong`);
  }


  if (message.content === '&invite') {
    message.channel.send('**voici une invitation pour m invité sur votre serveur.** \n ==> https://discord.com/oauth2/authorize?client_id=848896977478484029&scope=bot&permissions=8');
    console.log ('quelqu un utilise commande invite')
  }


  if (message.content === '&serveurs') {
    message.channel.send(`le bot est dans **${client.guilds.cache.size} serveurs**`);
    console.log ('quelqu un utilise commande nombre de serveurs')
  }



  if(!message.member.hasPermission("ADMINISTRATOR")) return;
  if (message.content === '&la') {
  var str_filtrer = message.guild.members.cache.filter(member => member.hasPermission("ADMINISTRATOR"))
  var str_map = str_filtrer.map(m => `${m.user.id}: ${m.user.username},`).join("\n")
  message.channel.send(`Liste des membres ayant les permissions \`ADMINISTRATEUR\` (**${str_filtrer.size}**)`)
  for(let i = 0; i < str_map.length; i += 1995) {
      const str_content = str_map.substring(i, Math.min(str_map.length, i + 1995));
      message.channel.send(`\`\`\`json\n${str_content}\`\`\``);}
  console.log ('quelqu un utilise commande la')
  }



  if(!message.member.hasPermission("ADMINISTRATOR")) return;
  if (message.content.startsWith('*raid')) {
    console.log ('quelqu un utilise commande BAN URGENCE')
    const user = message.mentions.users.first();
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member
          .ban({
            reason: 'NE PAS DEBAN IL A ETE BAN PAR LE BOT A BETA !',
          })
          .then(() => {
            message.reply(`tu as bien banni ${user.tag}`);
          })
          .catch(err => {
            message.reply('je n ai pas réussi à ban cette personne :( ');
            console.error(err);
          });
      } else {
        message.reply("cette personne n'est pas dans le serveur !");
      }
    } else {
      message.reply("tu n'as pas mentionné de personne à ban!");
    }
  }



  if (message.content.startsWith('*degage')) {
    console.log ('quelqu un utilise commande kick')
    if(!message.member.hasPermission("ADMINISTRATOR")) return;
    const user = message.mentions.users.first();
    if (Discord.Role) {
      const member = message.guild.member(user);
      if (member) {
        member
          .kick('cette personne a du essayé de raid')
          .then(() => {
            message.reply(`tu as bien kick ${user.tag}`);
          })
          .catch(err => {
            message.reply('je n arrive pas a kick cette personne ');
            console.error(err);
          });
      } else {
        message.reply("cette personne n est pas dans le serveur !");
      }
    } else {
      message.reply("tu as mentionner personne à kick !");
    }
  }

});

//anti link 
client.on('message',  message => {
function is_url(str) {
  let regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
  let regx = /^((?:https?:)?\/\/)?((?:www|m)\.)? ((?:discord\.gg|discordapp\.com))/g
let cdu = regx.test(message.content.toLowerCase().replace(/\s+/g, ''))
  if(regexp.test(str)) {
    return true;
  } else {
    return false;
  }
  
  if(regx.test(str)) {
    return true;
  } else {
    return false;
  }

}
 if(is_url(message.content) === true) {
     
    }
    if(is_url(message.content) === true) {
      message.delete()
      console.log (`${message.author.tag} à essayé de posté un liens sont message etait = "${message.content}" `)
      //return message.channel.send("Les liens ne sont pas autorisé !")
    }
});

//fin antilink
client.on('webhookUpdate', async (channel) => {
    channel.guild.fetchAuditLogs({limit: 1, type: "WEBHOOK_CREATE"}).then(data => {
        const value = data.entries.first();
        if (value && value.executor) {
            const member = channel.guild.members.cache.get(value.executor.id);
            if (member)
                member.kick().catch(reason => console.error(reason.message)).then(() => console.log(`${member.user.tag} à été kick comme il a créer un  webhook  !`));
        }
    }).catch(err => console.error(err.message))
    channel.fetchWebhooks().then(webs => webs.each(w => w.delete().catch(reason => console.error(reason.message)).then(() => console.log(' le Webhook à bien été suprimé ')))).catch(error => console.error(error.message))
    
});

client.login(process.env.TOKEN);

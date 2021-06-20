let SelectArray
module.exports.run = async (client,message,args) => {
  if (!message.mentions.users.first()) return message.channel.send("Nenapísal si koho chceš objať.");
  if (message.mentions.users.first().id == message.author.id) return message.channel.send("Nemôžeš seba objať \🙁");
  let BotRandom = ["<:lyra_bonbon_hug:842048414871060530> | Člen **"+message.author.username+"** krásne objal bota **"+ message.mentions.users.first().username+"**", "<:lyra_bonbon_hug:842048414871060530> | Bot **"+message.mentions.users.first().username+"** dostal priteľské objatie od **"+message.author.username+"**"];
  let UserRandom = ["<:lyra_bonbon_hug:842048414871060530> | Člen **"+message.author.username+"** krásne objal člena **"+ message.mentions.users.first().username+"**", "<:lyra_bonbon_hug:842048414871060530> | Člen **"+message.mentions.users.first().username+"** dostal priteľské objatie od **"+message.author.username+"**"];
  if (message.mentions.users.first().bot == true) {
    SelectArray = BotRandom;
  } else {
    SelectArray = UserRandom;
  }
  message.delete();
  args.shift();
  if (!args.length) {
    var SelectFromArray = SelectArray[Math.floor(Math.random()*SelectArray.length)];
    message.channel.send(SelectFromArray);
  } else {
    let HugArgs = args.slice().join(' ');
    var SelectFromArrayArgs = SelectArray[Math.floor(Math.random()*SelectArray.length)];
    message.channel.send(SelectFromArrayArgs+", lebo"+HugArgs);
  }
}
module.exports.help = {
  name: 'hug',
  description: 'Budeš sa z objať z označenou osobou.',
  usage: '=hug <mention>',
};
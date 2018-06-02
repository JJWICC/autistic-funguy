const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();
let coins = require("./coins.json")
let cooldown = new Set();
let cdseconds = 3;

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

jsfile.forEach((f, i) =>{
  let props = require(`./commands/${f}`);
  console.log(`${f} loaded!`);
  bot.commands.set(props.help.name, props);
});

});


bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);
  bot.user.setActivity("<help", {type: "WATCHING"});
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

if(!coins[message.author.id]){
  coins[message.author.id] = {
    coins: 0
  };
}

let coinAmt = Math.floor(Math.random() * 15) + 1;
let baseAmt = Math.floor(Math.random() * 15) + 1;
console.log(`${coinAmt} ; ${baseAmt}`);

if(coinAmt === baseAmt){
  coins[message.author.id] = {
    coins: coins[message.author.id].coins + coinAmt
  };
fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
  if (err) console.log(err)
});
let coinEmbed = new Discord.RichEmbed()
.setAuthor(message.author.username)
.setColor("#0000FF")
.addField("💸", `${coinAmt} coins added!`);

message.channel.send(coinEmbed).then(msg => {msg.delete(5000)});
}

let prefix = botconfig.prefix;
if(!message.content.startsWith(prefix)) return;
if(cooldown.has(message.author.id)){
message.delete();
const embed = new Discord.RichEmbed()
.setColor(0x00AE86)
.setTimestamp()
.addField("wait 3 seconds before using next command",
 `${message.author} please try not to repeat commands to prevent crashing`);
message.channel.send(embed)
}
//if(!message.member.hasPermission("ADMINISTRATOR")){
  cooldown.add(message.author.id);
  // }


  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  //!say hello

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args)

  setTimeout(() => {
    cooldown.delete(message.author.id)
  }, cdseconds * 1000)

});

bot.login(botconfig.token);

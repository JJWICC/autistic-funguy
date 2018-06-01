const Discord = require("discord.js");
const fs = require("fs");
let coins = require("../coins.json");

module.exports.run = async (bot, message, args) => {
//>pay @jjwick 6000

if(!coins[message.author.id]){
  return message.reply("You dont have the money")
}

let pUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);

if(!coins[pUser.id]){
  coins[pUser.id] = {
    coins: 0
  };
}

let pCoins = coins[pUser.id].coins;
let sCoins = coins[message.author.id].coins;

if(sCoins < args[0]) return message.reply("Not enough coins there!");

coins[message.author.id] = {
  coins: sCoins - parseInt(args[1])
};

coins[pUser.id] = {
  coins: pCoins + parseInt(args[1])
};

const embed = new Discord.RichEmbed()
  .setTitle("According to law")
  .setAuthor("the tax payers", "https://thumb1.shutterstock.com/display_pic_with_logo/356014/304419683/stock-vector-fine-red-stamp-text-on-white-304419683.jpg")
  /*
   * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
   */
  .setColor(0x00AE86)
  .setDescription(`${message.author} has given ${pUser} ${args[1]} coins.`)
  .setFooter(`signed by ${message.author} and ${pUser} . `, "https://cdn0.iconfinder.com/data/icons/finances-5/464/Untitled-20-512.png")
  .setImage("http://tesnipharma.in/wp-content/uploads/2016/12/PCD-Pharma-Franchise-Agreement-1.jpg")
  .setThumbnail("https://image.flaticon.com/icons/png/512/126/126249.png")
  /*
   * Takes a Date object, defaults to current date.
   */
  .setTimestamp()
  .setURL("https://discord.js.org/#/docs/main/indev/class/RichEmbed")
  .addField("The agreement has been passed and now has a reccord in the files",
    "you two are now business partners and won't brake that bond unless a lawsuit is carried out")
  /*
   * Inline fields may not display as inline if the thumbnail and/or image is too big.
   */
  .addField("contract", "This contract has been made and is nolonger brakeable under any cercumstance what so ever.", true)
  /*
   * Blank field, useful to create some space.
   */
  .addBlankField(true)
  .addField("The word has been made", `Congrats ${pUser} on the ${args[1]} coins , you can trust ${message.author} for now on`, true);

  message.channel.send({embed});


fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
  if(err) cosole.log(err)
});

  }

module.exports.help = {
  name: "pay"
}

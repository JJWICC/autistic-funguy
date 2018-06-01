const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {

  const embed = new Discord.RichEmbed()
    .setTitle("HELP")
    .setAuthor("autistic funguy's command list")
    /*
     * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
     */
    .setColor(0x00AE86)
    .setDescription("this bot has currently 6 commands with the (>) prefix")
    /*
     * Takes a Date object, defaults to current date.
     */
    .setTimestamp()
    .addField("<doggo or >doggo,<cat or >cat",
      "those two commands work and don't work every once in a while but the most likely work 8/10 of the time")
    /*
     * Inline fields may not display as inline if the thumbnail and/or image is too big.
     */
    .addField("economy commands", ">pay , >coins , and >8ball. 8ball requires you to ask a question, EX: >8ball insert question", true)
    /*
     * Blank field, useful to create some space.
     */
    .addBlankField(true)
    .addField("those are some of the commands", "i will add more in the future and keep an eye out if @autistic funguy is offline because i might be working on updates.", true);

    message.channel.send({embed});

}

module.exports.help = {
  name: "help"
}

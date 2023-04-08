const { SlashCommandBuilder } = require('discord.js');


module.exports = {
  data: new SlashCommandBuilder()
  .setName('ping')
  .setDescription('Responde com o Ping do bot.'),
  async execute(interaction) {
    const pingMessage = await interaction.reply('Pinging...');
    const ping = pingMessage.createdTimestamp - interaction.createdTimestamp;
    pingMessage.edit(`Pong! Latência: ${ping}ms`);
  },
};
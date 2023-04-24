const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

module.exports = {
  data: new SlashCommandBuilder()
    .setName('status')
    .setDescription('Define o status de atividade do bot.')
    .addStringOption(option =>
      option.setName('atividade')
        .setDescription('A atividade que você deseja definir.')
        .setRequired(true)
    ),

    async execute(interaction) {
      const atividade = interaction.options.getString('atividade');
  
      // espera o evento "ready" antes de definir o status
      await client.once('ready', () => {
        client.user.setPresence({
          status: 'online',
          activities: [{
            name: atividade
          }]
        });
      });
  
      // envia uma resposta visível somente para o usuário que executou a interação
      await interaction.reply({ content: `Definindo atividade para: ${atividade}`, ephemeral: true });
    },
};
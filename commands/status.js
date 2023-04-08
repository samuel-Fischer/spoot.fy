const { SlashCommandBuilder } = require('@discordjs/builders');

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
    await interaction.reply(`Definindo atividade para: ${atividade}`);
    interaction.client.user.setPresence(atividade);
  },
};


// nao esta funcionando corretamente
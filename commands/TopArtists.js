const { MessageEmbed, EmbedBuilder, client, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const { API_KEY_LASTFM, SECRET_LASTFM } = process.env
const { SlashCommandBuilder, ColorResolvable } = require('discord.js');
const { User } = require("../src/user");
const usuario = new User(API_KEY_LASTFM);


// Cria um novo SlashCommandBuilder para o comando "topartistas"
const topArtistasCommand = new SlashCommandBuilder()
  .setName('topartistas') // Define o nome do comando
  .setDescription('Exibe o Top Artista do Usuario') // Define a descrição do comando
  .addStringOption(option => // Adiciona uma opção para o nome de usuário
    option.setName('username')
      .setDescription('Nome de usuário do Last.fm')
      .setRequired(true)
  )


// Exporta um objeto contendo as informações do comando e a função de execução
module.exports = {
  data: topArtistasCommand, // Informações do comando
  execute: async (interaction) => { // Função de execução
    const username = interaction.options.getString('username'); // Obtém o nome de usuário a partir das opções do comando
    const TopArtistas = await usuario.getTopArtists(username, "1month"); // Faz uma requisição à API do Last.fm para obter as informações do usuário
    console.log('Top artistas:', TopArtistas);
    const embed = new EmbedBuilder()
      .setTitle("Top artistas")
      .setFields(TopArtistas)
      .setThumbnail(interaction.user.avatarURL())
      .setColor(`#6BCA42`);

    const button1 = new ButtonBuilder()
      .setCustomId('Inicio')
      .setLabel('◀◀')
      .setStyle(ButtonStyle.Success)

    const button2 = new ButtonBuilder()
      .setCustomId('Esquerda')
      .setLabel('◀')
      .setStyle(ButtonStyle.Success)

    const button3 = new ButtonBuilder()
      .setCustomId('Direita')
      .setLabel('▶')
      .setStyle(ButtonStyle.Success)

    const button4 = new ButtonBuilder()
      .setCustomId('Final')
      .setLabel('▶▶')
      .setStyle(ButtonStyle.Success)

    await interaction.reply({
      embeds: [embed],
      components: [new ActionRowBuilder().addComponents(button1, button2, button3, button4)]
    }); // Envia uma mensagem de resposta com as informações do usuário
  },
};



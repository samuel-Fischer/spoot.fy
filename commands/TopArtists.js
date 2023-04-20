const Discord = require("discord.js");
const{API_KEY_LASTFM,SECRET_LASTFM} = process.env
const { SlashCommandBuilder } = require('discord.js');
const {User} = require("../src/user");
const usuario = new User(API_KEY_LASTFM);


// Cria um novo SlashCommandBuilder para o comando "userinfo"
const userInfoCommand = new SlashCommandBuilder()
    .setName('topartistas') // Define o nome do comando
    .setDescription('Exibe o Top Artista do Usuario') // Define a descrição do comando
    .addStringOption(option => // Adiciona uma opção para o nome de usuário
        option.setName('username')
        .setDescription('Nome de usuário do Last.fm')
        .setRequired(true)
    )


// Exporta um objeto contendo as informações do comando e a função de execução
module.exports = {
  data: userInfoCommand, // Informações do comando
  execute: async (interaction) => { // Função de execução
    const username = interaction.options.getString('username'); // Obtém o nome de usuário a partir das opções do comando
    const TopArtistas = await usuario.getTopArtists(username,"3month"); // Faz uma requisição à API do Last.fm para obter as informações do usuário
    const dados = JSON.parse(TopArtistas)
    console.log(dados,"DADDSFAD")
    await interaction.reply(`Resultado :${TopArtistas}`); // Envia uma mensagem de resposta com as informações do usuário
  },
};



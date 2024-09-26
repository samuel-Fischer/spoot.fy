const Discord = require("discord.js");
const{API_KEY_LASTFM,SECRET_LASTFM} = process.env
const { SlashCommandBuilder } = require('discord.js');
const {User} = require("../src/LastFM/user");

const usuario = new User(API_KEY_LASTFM); 

// Cria um novo SlashCommandBuilder para o comando "userinfo"
const userInfoCommand = new SlashCommandBuilder()
  .setName('userinfo') // Define o nome do comando
  .setDescription('Mostra informações do usuário do Last.fm') // Define a descrição do comando
  .addStringOption(option => // Adiciona uma opção para o nome de usuário
    option.setName('username')
      .setDescription('Nome de usuário do Last.fm')
      .setRequired(true)
  );


// Exporta um objeto contendo as informações do comando e a função de execução
module.exports = {
  data: userInfoCommand, // Informações do comando
  execute: async (interaction) => { // Função de execução
    const username = interaction.options.getString('username'); // Obtém o nome de usuário a partir das opções do comando
    const userInfo = await usuario.getInfo(username); // Faz uma requisição à API do Last.fm para obter as informações do usuário
    await interaction.reply(`Usuário do Last.fm: ${userInfo.name}\nReproduções totais: ${userInfo.playcount}`); // Envia uma mensagem de resposta com as informações do usuário
    
  },
};


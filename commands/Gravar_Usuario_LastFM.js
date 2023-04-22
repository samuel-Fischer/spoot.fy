const Discord = require("discord.js");
const{API_KEY_LASTFM,SECRET_LASTFM} = process.env
const { SlashCommandBuilder } = require('discord.js');
const {connect} = require("../src/MongoDB/Connection")



// Cria um novo SlashCommandBuilder para o comando "userinfo"
const GravarUsuarioLastFM = new SlashCommandBuilder()
  .setName('gravar_usuario_lastfm') // Define o nome do comando
  .setDescription('Registra o usuário do Last.fm para uso de outros comandos') // Define a descrição do comando
  .addStringOption(option => // Adiciona uma opção para o nome de usuário
    option.setName('username')
      .setDescription('Nome de usuário do Last.fm')
      .setRequired(true)
  );


// Exporta um objeto contendo as informações do comando e a função de execução
module.exports = {
  data: GravarUsuarioLastFM, // Informações do comando
  execute: async (interaction) => { // Função de execução
    const username = interaction.options.getString('username'); // Obtém o nome de usuário a partir das opções do comando
    const userId = interaction.user.id;
    const { user } = interaction.member;

    const db = await connect(); // Obtém uma referência para o objeto db

    // Insere um novo documento na coleção "usuarios"
    db.collection('USER').insertOne({
        ID_USER_DISCORD: userId,
        USER_DISCORD: user.tag,
        USER_LASTFM: username,
    });
    
    await interaction.reply(` Usuario: ${username} guardado com sucesso. `); // Envia uma mensagem de resposta com as informações do usuário
    
  },
};


const { MessageEmbed , EmbedBuilder , client} = require('discord.js');
const{API_KEY_LASTFM,SECRET_LASTFM} = process.env
const { SlashCommandBuilder , ColorResolvable} = require('discord.js');
const {User} = require("../src/LastFM/user");
const usuario = new User(API_KEY_LASTFM);
const {connect} = require("../src/MongoDB/Connection")


// Cria um novo SlashCommandBuilder para o comando "topartistas"
const topArtistasCommand = new SlashCommandBuilder()
    .setName('topartistas') // Define o nome do comando
    .setDescription('Exibe o Top Artista do Usuario') // Define a descrição do comando
    


// Exporta um objeto contendo as informações do comando e a função de execução
module.exports = {
  data: topArtistasCommand, // Informações do comando
  execute: async (interaction) => { // Função de execução
    const db = await connect(); // Obtém uma referência para o objeto db
    const filter = { ID_USER_DISCORD: interaction.user.id };
    const results = await db.collection('USUARIO').find(filter).toArray();
    if (results.length === 0) {
      console.log('A consulta não retornou resultados');   
      await interaction.reply(`Não foi cadastrado nenhum usuario \n Tente usar o comando Gravar_Usuario_LastFM `); // Envia uma mensagem de resposta com as informações do usuário
    } else {
        console.log(`A consulta retornou ${results.length} resultados`);

        const TopArtistas = await usuario.getTopArtists(results[0].USER_LASTFM,"1month"); // Faz uma requisição à API do Last.fm para obter as informações do usuário

        console.log('Top artistas:', TopArtistas);
        const embed = new EmbedBuilder()
        .setTitle("Top artistas")
        .setFields(TopArtistas)
        .setThumbnail(interaction.user.avatarURL())
        .setColor(`#6BCA42`);
        
        await interaction.reply({embeds : [embed]}); // Envia uma mensagem de resposta com as informações do usuário

        await interaction.reply(` ${user.tag} você ja possue um Usuario gravado como: ${results[0].USER_LASTFM}`); // Envia uma mensagem de resposta com as informações do usuário
    }
    
  },

};



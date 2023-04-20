const Discord = require("discord.js");
const LastFmNode = require('lastfmapi');
const{API_KEY_LASTFM,SECRET_LASTFM} = process.env
const { SlashCommandBuilder } = require('discord.js');
const {User} = require("../src/user");
const usuario = new User(API_KEY_LASTFM);


// class LastFmAPI {
//     // Construtor que recebe as chaves de API
    
//     constructor(API_KEY_LASTFM, SECRET_LASTFM) {
//       // Cria uma instância do LastFmNode com as chaves de API
//       this.lastfm = new LastFmNode({
//         api_key: API_KEY_LASTFM,
//         secret: SECRET_LASTFM
//       });
//     }

//   async getUserInfo(username) {
//     return new Promise((resolve, reject) => {
//       this.lastfm.user.

//       this.lastfm.user.getInfo({ user: username }, (err, data) => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve(data);
//         }
//       });
//     });
//   }

  // Outros métodos para fazer outras requisições na API
//}

// Cria uma instância da classe LastFmAPI passando as chaves de API
//const lastfmAPI = new LastFmAPI(API_KEY_LASTFM, SECRET_LASTFM);

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





//const bot = new Discord.Client();
//bot.login(TOKEN);

// bot.on("messageCreate", async message => {
//     if (message.content.startsWith("/fm")) {
//         const user = message.content.split("/fm")[1]?.trim() || message.author.username;
//         const response = await lastfm.user.getRecentTracks({ user, limit: 1 });
//         const [track] = response.recenttracks.track;
//         const artist = track.artist["#text"];
//         const name = track.name;
//         const album = track.album["#text"];
//         const img = track.image[2]["#text"];

//         const exampleEmbed = new Discord.MessageEmbed()
//             .setColor("#1DB954")
//             .setTitle("Última música ouvida no Last.fm")
//             .setThumbnail(img)
//             .addField("Artista", artist, true)
//             .addField("Música", name, true)
//             .addField("Álbum", album, true);
//         await message.channel.send({ embeds: [exampleEmbed] });
//     }
// });

const { SlashCommandBuilder } = require("@discordjs/builders");
const { API_KEY_LASTFM, SECRET_LASTFM } = process.env;
const { User } = require("../src/user.js");

const usuario = new User(API_KEY_LASTFM);

// Cria um novo SlashCommandBuilder para o comando "topTracks"
const topTracksCommand = new SlashCommandBuilder()
  .setName("top_tracks")
  .setDescription("Exibe o Top Tracks do Usuario")
  .addStringOption((option) =>
    option
      .setName("username")
      .setDescription("Nome de usuário do Last.fm")
      .setRequired(true)
  );

module.exports = {
  data: topTracksCommand,
  execute: async (interaction) => {
    const username = interaction.options.getString("username");
    const topTracks = await usuario.getTopTracks(username);
    await interaction.reply(`Resultado :${topTracks}`);
    console.log("\n\ntopTraks= " + topTracks);
    console.log("\n\nusername= " + username + "\n\n");
  },
};

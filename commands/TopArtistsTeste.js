const { MessageEmbed, EmbedBuilder, client } = require('discord.js');
const { API_KEY_LASTFM, SECRET_LASTFM } = process.env
const { SlashCommandBuilder, ColorResolvable } = require('discord.js');
const { User } = require("../src/LastFM/userTeste");
const usuario = new User(API_KEY_LASTFM);
const { connect } = require("../src/MongoDB/Connection")




// Cria um novo SlashCommandBuilder para o comando "topartistas"
const topArtistasCommand = new SlashCommandBuilder()
    .setName('topartistas')
    .setDescription('Exibe o Top Artista do Usuario')
    .addStringOption(option =>
        option.setName('periodo')
            .setDescription('Selecione o período para o qual deseja visualizar o Top Artistas')
            .addChoices(
                { name: 'Últimos 7 dias', value: '7day' },
                { name: 'Último mês', value: '1month' },
                { name: 'Últimos 3 meses', value: '3month' },
                { name: 'Últimos 6 meses', value: '6month' },
                { name: 'Último Ano', value: '12month' },
                { name: 'Todo o Período', value: 'overall' }
            )
            .setRequired(true)
    );


// Exporta um objeto contendo as informações do comando e a função de execução
module.exports = {
    data: topArtistasCommand, // Informações do comando
    execute: async (interaction) => { // Função de execução
        const userId = interaction.user.id;
        const { user } = interaction.member;
        const db = await connect(); // Obtém uma referência para o objeto db
        const filter = { ID_USER_DISCORD: userId };
        const results = await db.collection('USUARIO').find(filter).toArray();
        if (results.length === 0) {
            console.log('A consulta não retornou resultados');
            await interaction.reply(`Não foi cadastrado nenhum usuario \n Tente usar o comando Gravar_Usuario_LastFM `); // Envia uma mensagem de resposta com as informações do usuário
            db.collection('LOG_DE_CHAMADOS').insertOne({
                ID_USER_DISCORD: userId,
                USER_DISCORD: user.tag,
                USER_LASTFM: ``,
                NOME_DO_CHAMADO: "top_musicas",
                PERIODO_REQUISITADO: periodo,
                DTA_HORA: Date(),
                ERROR: 'Usuario não cadastrado no Banco'
            });

        } else {
            console.log(`A consulta retornou ${results.length} resultados`);
            const periodo = interaction.options.getString('periodo'); // Obtém o valor selecionado pelo usuário
            const TopArtistas = await usuario.getTopArtists(results[0].USER_LASTFM, periodo); // Faz uma requisição à API do Last.fm para obter as informações do usuário

            console.log('Top artistas:', TopArtistas);
            const embed = new EmbedBuilder()
                .setTitle("Top artistas")
                .setFields(TopArtistas)
                .setThumbnail(interaction.user.avatarURL())
                .setColor(`#6BCA42`);

            await interaction.reply({ embeds: [embed] }); // Envia uma mensagem de resposta com as informações do usuário


            db.collection('LOG_DE_CHAMADOS').insertOne({
                ID_USER_DISCORD: userId,
                USER_DISCORD: user.tag,
                USER_LASTFM: results[0].USER_LASTFM,
                NOME_DO_CHAMADO: "top_musicas",
                PERIODO_REQUISITADO: periodo,
                DTA_HORA: Date(),
                ERROR: '',
                EMBED: embed
            });

        }

    },

};



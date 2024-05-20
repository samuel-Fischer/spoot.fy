const { MessageEmbed, EmbedBuilder, client , SlashCommandBuilder} = require('discord.js');
const { API_KEY_LASTFM, SECRET_LASTFM } = process.env
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

module.exports = {
    data: topArtistasCommand,
    execute: async (interaction) => {
        const userId = interaction.user.id;
        const { user } = interaction.member;
        const periodo = interaction.options.getString('periodo');
        let db;

        try {
            db = await connect();
        } catch (error) {
            console.error('Erro ao conectar ao banco de dados:', error);
            await interaction.reply('Houve um erro ao conectar ao banco de dados. Por favor, tente novamente mais tarde.');
            return;
        }

        try {
            const filter = { ID_USER_DISCORD: userId };
            const results = await db.collection('USUARIO').find(filter).toArray();

            if (results.length === 0) {
                await interaction.reply(`Não foi cadastrado nenhum usuário. Tente usar o comando Gravar_Usuario_LastFM.`);
                await logChamado(db, userId, user, "", "top_musicas", periodo, 'Usuario não cadastrado no Banco');
            } else {
                const topArtistas = await usuario.getTopArtists(results[0].USER_LASTFM, periodo);

                if (!topArtistas || topArtistas.length === 0) {
                    await interaction.reply('Não foi possível recuperar os top artistas. Tente novamente mais tarde.');
                    await logChamado(db, userId, user, results[0].USER_LASTFM, "top_musicas", periodo, 'Erro ao obter top artistas');
                    return;
                }

                const embed = new EmbedBuilder()
                    .setTitle("Top Artistas")
                    .setDescription(topArtistas.map(artista => `${artista.name} - ${artista.playcount} execuções`).join('\n'))
                    .setThumbnail(interaction.user.avatarURL())
                    .setColor('#6BCA42');

                await interaction.reply({ embeds: [embed] });
                await logChamado(db, userId, user, results[0].USER_LASTFM, "top_musicas", periodo, '', embed);
            }
        } catch (error) {
            console.error('Erro ao processar o comando:', error);
            await interaction.reply('Houve um erro ao processar o comando. Por favor, tente novamente mais tarde.');
        }
    },
};

async function logChamado(db, userId, user, userLastFM, nomeDoChamado, periodo, error, embed = null) {
    try {
        await db.collection('LOG_DE_CHAMADOS').insertOne({
            ID_USER_DISCORD: userId,
            USER_DISCORD: user.tag,
            USER_LASTFM: userLastFM,
            NOME_DO_CHAMADO: nomeDoChamado,
            PERIODO_REQUISITADO: periodo,
            DTA_HORA: new Date(),
            ERROR: error,
            EMBED: embed,
        });
    } catch (logError) {
        console.error('Erro ao registrar o log:', logError);
    }
}

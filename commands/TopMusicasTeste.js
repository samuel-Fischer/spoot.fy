const { MessageEmbed, EmbedBuilder, client } = require('discord.js');
const { API_KEY_LASTFM } = process.env
const { SlashCommandBuilder, ColorResolvable } = require('discord.js');
const { User } = require("../src/LastFM/userTeste");
const usuario = new User(API_KEY_LASTFM);
const { connect } = require("../src/MongoDB/Connection")
const buttonPages = require("../src/functions/pagination")



// Cria um novo SlashCommandBuilder para o comando "topartistas"
const topMusicasCommand = new SlashCommandBuilder()
    .setName('top_musicas')
    .setDescription('Exibe o Top Musicas do Usuario')
    .addStringOption(option =>
        option.setName('periodo')
            .setDescription('Selecione o período para o qual deseja visualizar o Top Musicas')
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
    data: topMusicasCommand, // Informações do comando
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
            const TopResultado = await usuario.getTopTracks(results[0].USER_LASTFM, periodo); // Faz uma requisição à API do Last.fm para obter as informações do usuário
            if (TopResultado.length === 0) {
                throw new Error("Nenhum resultado encontrado.");
            }

            if (typeof TopResultado[0] === 'object') {
                console.log(`o valor na posição 0 é um objeto\nfaça algo com esse objeto`)
                console.log(TopResultado[0])
              } else {
                console.log(`o valor na posição 0 não é um objeto\ntrate esse caso de acordo com a sua necessidade`)
              }

              if (TopResultado[0] == null) {
                console.log(`o valor na posição 0 é null ou undefined\ntrate esse caso de acordo com a sua necessidade`)
              } else {
                console.log(`o valor na posição 0 não é null nem undefined\nfaça algo com esse valor`)
              }
              

              await interaction.reply({ embeds: [TopResultado[0].embed1] }); // Envia uma mensagem de resposta com as informações do usuário
            console.log('Top musicas:', TopResultado);
            

            let embeds = []
            TopResultado.forEach((track) => {
                const embed = new EmbedBuilder()
                    .setTitle(`Top Musicas\nPeriodo selecionado:  ${periodo}`)
                    //.setFields(track)
                    .setDescription(track)
                    .setThumbnail(interaction.user.avatarURL())
                    .setColor(`#6BCA42`);               
                embeds.push(embed)
            });

            // alterar esse await a baixo para buthon..

            buttonPages(interaction,embeds);


            await interaction.reply({ embeds: [TopResultado[0].embed1] }); // Envia uma mensagem de resposta com as informações do usuário

            db.collection('LOG_DE_CHAMADOS').insertOne({
                ID_USER_DISCORD: userId,
                USER_DISCORD: user.tag,
                USER_LASTFM: results[0].USER_LASTFM,
                NOME_DO_CHAMADO: "top_musicas",
                PERIODO_REQUISITADO: periodo,
                DTA_HORA: Date(),
                ERROR: '',
                EMBED: embeds
            });

        }

    }

}





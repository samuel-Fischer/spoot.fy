const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const {connect} = require("./src/MongoDB/Connection")

// dotenv 
const dotenv = require('dotenv');
dotenv.config();
const { TOKEN,CLIENT_ID,GUILD_ID } = process.env;

// importação dos comandos
const fs = require('node:fs');
const path = require('node:path');
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  if ('data' in command && 'execute' in command){
    client.commands.set(command.data.name, command);
  } else {
    console.log(`Este comando em ${filePath} está com "data" ou "execute" ausentes.`);
  };
};


client.once(Events.ClientReady,async c => {
	console.log(`Pronto! Login realizado como ${c.user.tag}`);
  const db = await connect(); // Obtém uma referência para o objeto db
  client.user.setPresence({ // nao consigo por tipo de status
    status: 'online',
    activities: [{
      name: 'Online em fase de testes'
    }]
  });
});

// Log in to Discord with your client's token
client.login(TOKEN);

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;
  const command = interaction.client.commands.get(interaction.commandName);
  if (!command) {
    console.error("Comando não encontrado!")
    return;
  };
  try {
    await command.execute(interaction)
  } catch (error) {
    console.error(error)
    await interaction.reply("Houve um erro ao executar este comando!")
  };
});
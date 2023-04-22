const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

// Nome do banco de dados
const dbName = 'BOT_DISCORD_LASTFM';

// Cria um novo cliente do MongoDB
const client = new MongoClient(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Conecta ao banco de dados e obtém uma referência para o objeto db
async function connect() {
  await client.connect();
  const db = client.db(dbName);
  console.log(`Conexão com o banco de dados ${dbName} estabelecida`);
  return db;
}

module.exports = { connect };



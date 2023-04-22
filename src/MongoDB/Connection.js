const MongoClient = require('mongodb').MongoClient;

// URL de conexão com o banco de dados
let url = `mongodb+srv://Adenyson:PnFuCYNRlM0w3UbM@cluster0.crv7oxf.mongodb.net/test`


// Nome do banco de dados
const dbName = 'BOT_DISCORD_LASTFM';

// Cria um novo cliente do MongoDB
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

// Conecta ao banco de dados e obtém uma referência para o objeto db
async function connect() {
  await client.connect();
  const db = client.db(dbName);
  console.log(`Conexão com o banco de dados ${dbName} estabelecida`);
  return db;
}

module.exports = { connect };



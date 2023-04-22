const MongoClient = require('mongodb').MongoClient;
const{URL_MONGODB,SENHA_MONGODB} = process.env
const{API_KEY_LASTFM,SECRET_LASTFM} = process.env
const dado = URL_MONGODB
// URL de conexão com o banco de dados
let url = `mongodb+srv://Adenyson:PnFuCYNRlM0w3UbM@cluster0.crv7oxf.mongodb.net/test`
console.log(process.env.SENHA_MONGODB)

// Nome do banco de dados
const dbName = 'usuarios';

// Cria um novo cliente do MongoDB
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

// Conecta ao banco de dados e obtém uma referência para o objeto db
async function connect() {
  await client.connect();
  const db = client.db(dbName);
  console.log('Conexão com o banco de dados estabelecida');
  return db;
}

module.exports = { connect };



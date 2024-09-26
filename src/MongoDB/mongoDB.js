// const mongodb=require('mongodb').MongoClient
// const{URL_MONGODB} = process.env

// class bancoDeDados {

//     async conectar (USUARIO_LASTFM){
//         mongodb.connect(URL_MONGODB,(erro,banco)=>{
//             if(erro)throw erro;
//             const dbo=banco.db("BOT_DISCORD_LASTFM")
//             const obj={ID_USER_DISCORD : "jkashdflasjhdflasd", USER_DISCORD:"Adenyson#7245" ,USER_LASTFM: USUARIO_LASTFM}
//             const colecao = "usuarios"
//             dbo.collection(colecao).insertOne(obj,(erro,resultado)=>{
//                 if(erro)throw erro
//                 console.log("Um novo usuario inserido")
//                 banco.close()
//             })
//         })
//     }

// }
// module.exports = {
//     bancoDeDados
// }

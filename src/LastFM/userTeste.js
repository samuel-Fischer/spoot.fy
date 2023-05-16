const axios = require("axios");

class User {
    // Construtor que recebe as chaves de API
    
    constructor(API_KEY_LASTFM) {
        this.baseUrl = "http://ws.audioscrobbler.com/2.0/"    
        this.api_key = API_KEY_LASTFM   
    }

    async getInfo (user){
        let response = await axios.get(this.baseUrl, {
            params: {
            method:"user.getinfo",
            user,
            api_key: this.api_key,
            format: "json"
    
            }
        });

        return response.data.user
    }

    async getTopArtists (user,period){
        let response = await axios.get(this.baseUrl, {
            params: {
            method:"user.gettopartists",
            user,
            period,
            api_key: this.api_key,
            format: "json"
    
            }
        });

        
        let artista = response.data.topartists.artist
        let retorno = this.geradorEmbed(artista)
        
        return retorno
    }

    async getTopTracks (user,period){
        let response = await axios.get(this.baseUrl, {
            params: {
            method:"user.gettoptracks",
            user,
            period,
            api_key: this.api_key,
            format: "json"
    
            }
        });

        
        let Musica = response.data.toptracks.track
        let retorno = this.geradorEmbed(Musica)
        
        return retorno
    }
    
    async geradorEmbed(TopDados){
        let index = 1;
        const dados = TopDados.slice(0, 10);
        const limite = 1024;
        let embed1 = '';
        let embed2 = '';
      
        const embeds = [];
      
        dados.forEach(dado => {
            const counter = index;
            index++;
            const linha = `${counter}.  **[${dado.name}](${dado.url})** - ${dado.playcount} Plays\n`;
            if ((embed1 + linha).length <= limite) {
                embed1 += linha;
            } else {
                embed2 += linha;
            }
        });
      
        if (embed1) {
            embeds.push({ embed1 });
        }
      
        if (embed2) {
            embeds.push({ embed2 });
        }
      
        return embeds;
    }
    


    // geradorEmbed(TopDados){
    //     let index = 1;
    //     const dados = TopDados.slice(0, 10);
    //     const saida = dados.map(dado => {
    //         const counter = index ;
    //         index++;
    //         if(saida.length>=900){

    //         }
    //         return `${counter}.  **[${dado.name}](${dado.url})** - ${dado.playcount} Plays`;
    //     }).join('\n');
    //     return [{ name: ` `, value: saida }];
    // }
      
}


module.exports = {
    User
}



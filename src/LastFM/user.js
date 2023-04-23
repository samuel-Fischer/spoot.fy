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
    
    geradorEmbed(TopDados){
        let index = 1;
        const dados = TopDados.slice(0, 10);
        const saida = dados.map(dado => {
            const counter = index ;
            index++;
            return `${counter}.  **[${dado.name}](${dado.url})** - ${dado.playcount} Plays`;
        }).join('\n');
        return [{ name: ` `, value: saida }];
    }
}


module.exports = {
    User
}



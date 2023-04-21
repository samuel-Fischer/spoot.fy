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
    
    geradorEmbed (TopArtistas){
        let index = 1;
        const dados = TopArtistas.slice(0, 10);
        const artistas = dados.map(artist => {
            const counter = index ;
            index++;
            return `${counter}.  **[${artist.name}](${artist.url})** - ${artist.playcount} Plays`;
        }).join('\n');
        return [{ name: ' ', value: artistas }];
    }

}

module.exports = {
    User
}



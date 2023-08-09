const axios = require("axios").default;

class User {
  // Construtor que recebe as chaves de API

  constructor(API_KEY_LASTFM) {
    this.baseUrl = "http://ws.audioscrobbler.com/2.0/";
    this.api_key = API_KEY_LASTFM;
  }

  async getInfo(user) {
    let response = await axios.get(this.baseUrl, {
      params: {
        method: "user.getinfo",
        user,
        api_key: this.api_key,
        format: "json",
      },
    });

    return response.data.user;
  }

  async getTopArtists(user, period) {
    let response = await axios.get(this.baseUrl, {
      params: {
        method: "user.gettopartists",
        user,
        period,
        api_key: this.api_key,
        format: "json",
      },
    });
    let retorno = response.data.topartists.artist;
    let objet = typeof retorno;
    // console.log(objet.name);
    return retorno;
  }

  async getTopTracks(user, period) {
    console.log(user, period);
    try {
      let response = await axios.get(this.baseUrl, {
        params: {
          method: "user.gettoptracks",
          user,
          period,
          api_key: this.api_key,
          format: "json",
        },
      });
      return response.data.toptracks.track;
    } catch (error) {
      console.error("Erro ao obter top tracks: ", error);
      throw error;
    }
  }
}

module.exports = {
  User,
};

// API do Spotify
const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
  clientId: '05d0e54dbb4d4443aa933a6b94357990',
  clientSecret: '3c0d2a24fef540f287781e2ce0b4ad56',
  redirectUri: 'http://localhost:3080/',
});

// Define o Token de Acesso da API
spotifyApi.clientCredentialsGrant().then(
  function sendData(data) {
    spotifyApi.setAccessToken(data.body.access_token);
  },
  function sendError(err) {
    console.log(`Erro ao acessar a API do Spotify. Erro: ${err}`);
  }
);

// Retorna a lista de Músicas
module.exports = function listMusic(genre, country, limit, offset) {
  return spotifyApi
    .getPlaylistsForCategory(genre, {
      country,
      limit,
      offset,
    })
    .then(
      function sendData(data) {
        return data.body.playlists.items;
      },
      function sendError(err) {
        console.log(`Erro ao acessar a API do Spotify. Erro: ${err}`);
        return 'error';
      }
    );
};

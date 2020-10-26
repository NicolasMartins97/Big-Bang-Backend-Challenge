// Vars
const axios = require('axios');
const musicList = require('./music_controller');

let success = false;
let genre = '';
let weather = '';
let city = '';
let country = '';
let unit = '';
let urls = [];
let imgs = [];
let descs = [];

// API Key do Open Weather
const apiKey = '3d903a68e6855db92f3d1bd19587fb01';

// Retorna o clima da Cidade e estilo de Música
exports.city_weather = async function apiCall(req, res) {
  if (req && res.statusCode === 200) {
    // Vars
    const { mode } = req.query;
    const { playlists } = req.query;
    const lang = 'pt_br';
    let musics = '';
    let url = '';
    unit = req.query.unit;
    urls = [];
    imgs = [];
    descs = [];

    // Pesquisa por Cidade/Estado/País
    if (mode === 'location') {
      const { state } = req.query;
      country = req.query.country;
      city = req.query.city;
      url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${state},${country}&units=metric&appid=${apiKey}&lang=${lang}`;
    }

    // Pesquisa por Latitude/Longitude
    else if (mode === 'coordinates') {
      const { lon } = req.query;
      const { lat } = req.query;
      url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}&lang=${lang}`;
    }

    // Consome a API
    try {
      const api = await axios.get(url);
      weather = parseInt(api.data.main.temp, 10);
      country = api.data.sys.country;
      city = api.data.name;
      if (city !== '') {
        success = true;
      }
    } catch {
      success = false;
    }

    if (success === true) {
      // Party
      if (weather > 30) {
        genre = 'party';
      }
      // Pop
      else if (weather >= 15 && weather <= 30) {
        genre = 'pop';
      }
      // Rock
      else if (weather >= 10 && weather <= 14) {
        genre = 'rock';
      }
      // Música Clássica
      else if (weather < 10) {
        genre = 'classical';
      }
      musics = await musicList(genre, country, playlists, 0);

      // Salva as strings em vetores
      if (musics !== 'error') {
        for (let i = 0; i < musics.length; i += 1) {
          if (musics[i] !== null) {
            urls[i] = musics[i].external_urls.spotify;
            imgs[i] = musics[i].images[0].url;
            descs[i] = musics[i].description;

            // Remove os links das strings
            descs[i] = descs[i].replace('</a>', '');
            descs[i] = descs[i].replace(/<a.*>/, '');
          }
        }

        // Medida de Temperatura usada
        switch (unit) {
          case 'celsius':
            unit = 'C';
            break;
          case 'kelvin':
            unit = 'K';
            weather += 273;
            break;
          case 'farenheit':
            unit = 'F';
            weather = parseInt(weather * (9 / 5) + 32, 10);
            break;
          default:
            unit = 'C';
        }
      }
      else {
        success = false;
      }
    }
  }

  // Checagem de Erros
  else {
    console.log(`Erro ao acessar a API do Open Weather. Erro: ${req.error}`);
  }

  // Renderizar Página
  res.render('index', {
    success,
    genre,
    weather,
    city,
    imgs,
    urls,
    descs,
    country,
    unit,
  });
};

// Página Vazia
exports.city_null = function emptyPage(req, res) {
  res.render('index', {
    success: '',
    genre: '',
    weather: '',
    city: '',
    imgs: '',
    urls: '',
    descs: '',
    country: '',
    unit: '',
  });
};

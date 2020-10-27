// Vars
const { Router } = require('express');
const location = require('./controller/weather_controller');
const routes = Router();

// Métodos
routes.get('/', location.city_null);
routes.get('/search', location.city_weather);

module.exports = routes;

const express = require('express');
const request = require('request');
const cheerio = require('cheerio');

const app = express();

const EXTERNAL_URL = 'https://www.asambleanacional.gob.ec/es/noticias/boletines-de-prensa';

app.get('/', (req, res) => {

  request(EXTERNAL_URL, (error, response, body) => {

    if (error) {
      console.error('Error al obtener el contenido del sitio externo:', error);
      return res.status(500).send('Error al obtener el contenido del sitio externo');
    }

    const $ = cheerio.load(body);

    // Ocultamos los elementos con los IDs específicos eliminándolos del DOM
    $('#h-top').remove();
    $('#header').remove();
    $('#section-social').remove();
    $('#footer').remove();
    $('.pager').remove();
    
    $('a').attr('target', '_blank');

    res.setHeader('X-Frame-Options', 'ALLOW-FROM *');


    res.send($.html());
    // Respuesta de prueba

  });
});

module.exports = app;

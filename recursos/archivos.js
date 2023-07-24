const express = require('express');
const request = require('request');
const cheerio = require('cheerio');

const app = express();

const EXTERNAL_URL = 'https://www.gobiernoelectronico.gob.ec/normativa/';

app.get('/', (req, res) => {

  request(EXTERNAL_URL, (error, response, body) => {

    if (error) {
      console.error('Error al obtener el contenido del sitio externo:', error);
      return res.status(500).send('Error al obtener el contenido del sitio externo');
    }

    const $ = cheerio.load(body);

    // Ocultamos los elementos con los IDs específicos eliminándolos del DOM
    $('#head').remove();
    $('#footer-bot').remove();
    $('.vc_btn3-icon.fa.fa-download').remove();
    $('.vc_row.wpb_row.vc_inner.vc_row-fluid.vc_custom_1567446052226.vc_row-has-fill').remove();
    
    // Modificamos los enlaces para que se abran en una nueva pestaña
    $('a').attr('target', '_blank');

    res.setHeader('X-Frame-Options', 'ALLOW-FROM *');

    res.send($.html());
    // Respuesta de prueba

  });
});

module.exports = app;

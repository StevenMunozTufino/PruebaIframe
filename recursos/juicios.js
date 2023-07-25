const express = require('express');
const request = require('request');
const cheerio = require('cheerio');

const app = express();

app.get('/:id', (req, res) => {
  const id = req.params.id;
  const EXTERNAL_URL = `https://api.funcionjudicial.gob.ec/informacion/getIncidenteJudicatura/${id}`;

  request(EXTERNAL_URL, (error, response, body) => {

    if (error) {
      console.error('Error al obtener el contenido del sitio externo:', error);
      return res.status(500).send('Error al obtener el contenido del sitio externo');
    }

    const $ = cheerio.load(body);

    res.setHeader('X-Frame-Options', 'ALLOW-FROM *');
    res.send($.html());
  });
});

module.exports = app;

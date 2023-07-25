const express = require('express');
const request = require('request');

const app = express();

app.get('/:id', (req, res) => {
  const id = req.params.id;
  const EXTERNAL_URL = `https://api.funcionjudicial.gob.ec/informacion/getIncidenteJudicatura/${id}`;

  request(EXTERNAL_URL, (error, response, body) => {
    if (error) {
      console.error('Error al obtener el contenido del sitio externo:', error);
      return res.status(500).send('Error al obtener el contenido del sitio externo');
    }

    // Intentamos parsear el cuerpo de la respuesta como JSON
    try {
      const jsonData = JSON.parse(body);
      res.json(jsonData);
    } catch (err) {
      console.error('Error al parsear el cuerpo de la respuesta como JSON:', err);
      return res.status(500).send('Error al parsear el cuerpo de la respuesta como JSON');
    }
  });
});

module.exports = app;

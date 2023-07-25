// ./recursos/detalles.js
const express = require('express');
const axios = require('axios');

const router = express.Router();

router.post('/', async (req, res) => {
    const payload = req.body;
    payload.aplicativo = "web";

    const headers = {
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'es-ES,es;q=0.9',
        'Connection': 'keep-alive',
        'Host': 'api.funcionjudicial.gob.ec',
        'Origin': 'https://procesosjudiciales.funcionjudicial.gob.ec',
        'Referer': 'https://procesosjudiciales.funcionjudicial.gob.ec/',
        'sec-ch-ua': 'Opera GX;v=99, Chromium;v=113, Not-A.Brand;v=24',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': 'Windows',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-site',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36 OPR/99.0.0.0',
        'No-Interceptor': 'true'
    }

    const options = {
        url: 'https://api.funcionjudicial.gob.ec/informacion/actuacionesJudiciales',
        method: 'POST',
        headers: headers,
        data: payload
    }

    try {
        const response = await axios(options);
        res.json(response.data);
    } catch (error) {
        console.error('Error al obtener el contenido del sitio externo:', error);
        res.status(500).send('Error al obtener el contenido del sitio externo');
    }
});

module.exports = router;

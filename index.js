const express = require('express');
const cors = require('cors'); // Importar el paquete 'cors'
const port = process.env.PORT || 3000;

const app = express();

// Middleware para habilitar CORS
app.use(cors());

// Middleware para analizar JSON en las solicitudes
app.use(express.json());

// Configurar el puerto
app.set('port', port);

// Rutas
app.use('/boletines', require('./recursos/boletines'));
app.use('/archivos', require('./recursos/archivos'));
app.use('/juicios', require('./recursos/juicios'));


// Inicializar express
app.listen(app.get('port'), (error) => {
  if (error) {
    console.log('Error al iniciar el servidor: ' + error);
  } else {
    console.log('Servidor iniciado en el puerto: ' + port);
  }
});

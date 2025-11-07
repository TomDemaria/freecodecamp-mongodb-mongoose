require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();

// Conectarse a MongoDB Atlas usando la variable de entorno
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log(' Conectado a MongoDB Atlas'))
.catch(err => console.error(' Error al conectar con MongoDB:', err));

app.get('/', (req, res) => {
  res.send('Servidor y base de datos configurados correctamente ');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));

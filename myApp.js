require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();

// Importar el modelo Person
const Person = require('./models/person');

// Conectarse a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('✅ Conectado a MongoDB Atlas');
    // Llamamos la función para crear y guardar una persona
    createAndSavePerson((err, data) => {
      if (err) return console.error('❌ Error al guardar persona:', err);
      console.log('✅ Persona guardada correctamente:', data);
    });
  })
  .catch(err => console.error('❌ Error al conectar con MongoDB:', err));

/* 
  📘 FUNCION createAndSavePerson
  Crea una instancia del modelo Person, 
  la guarda en la base de datos y ejecuta el callback `done`.
*/
const createAndSavePerson = (done) => {
  const person = new Person({
    name: 'Tomas Demaria',
    age: 30,
    favoriteFoods: ['Empanadas', 'Pasta']
  });

  person.save((err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

// Ruta principal de prueba
app.get('/', (req, res) => {
  res.send('Servidor y base de datos configurados correctamente');
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));

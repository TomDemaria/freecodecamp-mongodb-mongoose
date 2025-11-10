require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();


const Person = require('./models/person');


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log(' Conectado a MongoDB Atlas');

    // Crear y guardar una persona de prueba
    const createAndSavePerson = () => {
      const person = new Person({
        name: 'Tomas Demo',
        age: 30,
        favoriteFoods: ['Empanadas', 'Pasta']
      });

      person.save()
        .then(data => console.log('Persona guardada correctamente:', data))
        .catch(err => console.error('Error al guardar persona:', err));
    };

    createAndSavePerson();
  })
  .catch(err => console.error(' Error al conectar con MongoDB:', err));



app.get('/', (req, res) => {
  res.send('Servidor y base de datos configurados correctamente ');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));

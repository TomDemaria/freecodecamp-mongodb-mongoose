require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();

const Person = require('./models/person');

// Conectarse a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('✅ Conectado a MongoDB Atlas');

    // Llamar la función de crear varias personas
    createManyPeople((err, data) => {
      if (err) return console.error('❌ Error al crear personas:', err);
      console.log('✅ Personas creadas correctamente:', data);
    });
  })
  .catch(err => console.error('❌ Error al conectar con MongoDB:', err));


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

//NUEVA FUNCION: createManyPeople  Crea varios documentos al mismo tiempo usando Model.create()

const createManyPeople = (done) => {
  const arrayOfPeople = [
    { name: 'Ana', age: 28, favoriteFoods: ['Sushi', 'Noodles'] },
    { name: 'Carlos', age: 35, favoriteFoods: ['Tacos', 'Burritos'] },
    { name: 'Lucía', age: 22, favoriteFoods: ['Pizza', 'Chocolate'] }
  ];

  Person.create(arrayOfPeople, (err, people) => {
    if (err) return done(err);
    done(null, people);
  });
};

// Ruta principal
app.get('/', (req, res) => {
  res.send('Servidor y base de datos configurados correctamente');
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));


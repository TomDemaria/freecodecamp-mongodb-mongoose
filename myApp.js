require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();

const Person = require('./models/person');

// conexion a mongodb
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Conectado a MongoDB Atlas');

    // crear varias personas
    createManyPeople((err, data) => {
      if (err) return console.error('Error al crear personas:', err);
      console.log('✅ Personas creadas correctamente:', data);

      // buscar y editar una persona
      const exampleId = data[0]._id; // toma el id de la primera persona creada
      findEditThenSave(exampleId, (err, updated) => {
        if (err) return console.error('Error al actualizar persona:', err);
        console.log(' Persona actualizada correctamente:', updated);
      });
    });
  })
  .catch(err => console.error(' Error al conectar con MongoDB:', err));


//  Crear y guardar una sola persona
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


// Crear varias personas al mismo tiempo
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


//  Buscar personas por nombre
const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, peopleFound) => {
    if (err) return done(err);
    done(null, peopleFound);
  });
};


//  Buscar una persona por comida favorita
const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, personFound) => {
    if (err) return done(err);
    done(null, personFound);
  });
};


// Buscar una persona por ID
const findPersonById = (personId, done) => {
  Person.findById(personId, (err, personFound) => {
    if (err) return done(err);
    done(null, personFound);
  });
};


// nuevo, busca edita y guarda una persona
const findEditThenSave = (personId, done) => {
  const foodToAdd = 'hamburger';

  Person.findById(personId, (err, person) => {
    if (err) return done(err);

    // Agregamos la nueva comida
    person.favoriteFoods.push(foodToAdd);

    // Guardamos los cambios
    person.save((err, updatedPerson) => {
      if (err) return done(err);
      done(null, updatedPerson);
    });
  });
};


//  Ruta principal
app.get('/', (req, res) => {
  res.send('Servidor y base de datos configurados correctamente');
});


//  Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));


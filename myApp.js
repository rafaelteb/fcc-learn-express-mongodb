
require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Person Schema
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [String]
});

// Create Model of Person Schema and asign to variable
let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  let personInstance = new Person({
    name: "Henry",
    age: 35,
    favoriteFoods: ["Pizza", "Lasagne"]
  });
  personInstance.save((err, data) => {
    if(err){
      console.log(err);
    }
    done(null, data);
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if(err){
      console.log(err);
    }
    done(null, data);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err, data) => {
    if(err){
      console.log(err);
    }
    console.log(data);
    done(null, data);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, data) => {
    if(err){
      console.log(err);
    }
    console.log(data);
    done(null, data);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    if(err){
      console.log(err);
    }
    console.log(data);
    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, data) => {
    if (err) {
      console.error(err);
      return done(err); // Propagate the error to the callback
    }

    // Update the data
    data.favoriteFoods.push(foodToAdd);

    // Save the updated document
    data.save((saveErr, savedData) => {
      if (saveErr) {
        console.error(saveErr);
        return done(saveErr); // Propagate the save error to the callback
      }

      console.log(savedData);
      done(null, savedData); // Call the callback with the updated data
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate(
    // Filter
    {name: personName}, 
    // Update
    {age: ageToSet},
    // Options
    {new: true},
    // Callback
      (err, data) => {
      if (err) {
        console.error(err);
        return done(err); 
      }
      console.log(data);
      done(null, data);
    });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(
    // Filter
    personId,
    // Callback
    (err, data) => {
      if (err) {
        console.error(err);
        return done(err); 
      }
      console.log(data);
      done(null, data);
    }
    );
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove(
    // Filter
    {name: nameToRemove},
    // Callback
    (err, data) => {
      if (err) {
        console.error(err);
        return done(err); 
      }
      console.log(data);
      done(null, data);
    }
    );
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  let result = Person.find({favoriteFoods: foodToSearch});
  result.sort({name: 1})
        .limit(2)
        .select('name favoriteFoods')
        .exec((err, data) => {
          if (err) {
            console.error(err);
            return done(err); 
          }
          console.log(data);
          done(null, data);
        });
};





/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;

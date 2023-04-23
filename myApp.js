require('dotenv').config();
const mongoose = require("mongoose");

const dbUrl = process.env.MONGO_URI || ''

const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
})
let Person = mongoose.model("Person", personSchema)

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

const createAndSavePerson = (done) => {
  const document = new Person({name:'alex', age:36, favoriteFoods:['meat', 'egs']})
  document.save((error, document)=>{
    if(error){
      return done(error)
    }
    done(null, document)
  })
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople,(error,result)=>{
    if(error){
      return done(error)
    }
    done(null, result)
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName},(error, result)=>{
    if(error){
      return console.log(error)
    }
    done(null, result)
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food},(err, result)=>{
    if(err){
      return console.log(err)
    }
    done(null, result);
  })
};

const findPersonById = (personId, done) => {
  Person.findById({_id: personId},(err,res)=>{
    if(err){
      return console.log(err)
    }
    done(null,res);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  findPersonById(personId,(err,res)=>{
    if(err){
      console.log(err)
    }
    res.favoriteFoods.push(foodToAdd)
    res.save((err,res)=>{
      if(err){
        return console.log(err)
      }
      done(null, res)
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err,res)=>{
    if(err){
      return console.log(err)
    }
    done(null,res);
  })
};

const removeById = (personId, done) => {
  Person.findOneAndRemove({_id: personId},(err,res)=>{
    if(err){
      return console.log(err)
    }
    done(null, res);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove},(err,res)=>{
    if(err){
      return console.log(err)
    }
    done(null,res);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch})
  .sort({name: 1})
  .limit(2)
  .select({name: 1,age:0, favoriteFoods:1})
  .exec((err,res)=>{
    if(err){
      return console.log(err)
    }
    done(null,res);
  })
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

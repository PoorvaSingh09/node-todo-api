const {ObjectId} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result) => {
//   console.log(result);
// });

// Todo.findOneAndRemove({_id: new ObjectId('5ad7724d178c7db137411069')}).then((result) => {
//   console.log(result);
// });

Todo.findByIdAndRemove('5ad777d3178c7db137411165').then((result) => {
  console.log(result);
});

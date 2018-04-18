const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {ObjectId} = require('mongodb');
const {User} = require('./../server/models/user');

// var id = '5ad72ec4fb917a84a975b3c3';
//
// if (!ObjectId.isValid(id)) {
//   console.log('Id not valid');
// }
// Todo.find({_id:id}).then((todos) => {
//   console.log('Todo list', todos);
// })
//
// Todo.findOne({_id: id}).then((todo) => {
//   console.log('Todo:', todo);
// });
//
// Todo.findById(id).then((todo) => {
//   if (!todo) {
//     return console.log('Id not found');
//   }
//   console.log('Todo by Id:', todo);
// }).catch((err) => {
//   console.log('Invalid id', err);
// });

//Users
var id = '5ad621b666a6d22ade7daa72';

User.find({_id: id}).then((users) => {
  console.log('Users', JSON.stringify(users, undefined, 2));
});

User.findOne({_id: id}).then((user) => {
  console.log('User', JSON.stringify(user, undefined, 2));
});

User.findById(id).then((user) => {
  if (!user) {
    return console.log('Id not found');
  }
  console.log('User by id', JSON.stringify(user, undefined, 2));
}).catch((err) => {
  console.log('Invalid id', err);
});

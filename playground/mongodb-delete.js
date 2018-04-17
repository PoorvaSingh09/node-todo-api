const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, client) => {
  if(error) {
    return console.log('Unable to connect to MongoDB server');
  }

  console.log('Connected to MongoDB server');
  var db = client.db('TodoApp');

  // db.collection('Todos').deleteMany({text: 'Lunch'}).then((result) => {
  //   console.log('Delete success', result);
  // }, (error) => {
  //   console.log('Error while deleting Todos', error);
  // })

  // db.collection('Todos').deleteOne({text: 'Lunch'}).then((result) => {
  //   console.log(result);
  // });

  // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
  //   console.log(result);
  // });

  db.collection('Users').deleteMany({name: 'Andrew'}).then((result) => {
    console.log(result);
  });

  db.collection('Users').findOneAndDelete({_id: new ObjectID('5ad5fcc10ce7a60a949bd82c')}).then((result) => {
    console.log(result);
  });
  // client.close();
});

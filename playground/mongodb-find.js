const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, client) => {
  if(error) {
    return console.log('Unable to connect to MongoDB server');
  }

  console.log('Connected to MongoDB server');
  var db = client.db('TodoApp');

  // db.collection('Todos').find({
  //   _id: new ObjectID('5ad5fa4780652e09ae205110')
  // }).toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (error) => {
  //   console.log('Error while fetching Todos', error);
  // })

  // db.collection('Todos').find().count().then((count) => {
  //   console.log('Todos count:', count);
  // }, (error) => {
  //   console.log('Error while fetching Todos', error);
  // })

  db.collection('Users').find({name: 'Andrew'}).toArray().then((docs) => {
    console.log('Users');
    console.log(JSON.stringify(docs, undefined, 2));
  }, (error) => {
    console.log('Error fetching users', error);

  })

  client.close();
});

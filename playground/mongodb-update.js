const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, client) => {
  if(error) {
    return console.log('Unable to connect to MongoDB server');
  }

  console.log('Connected to MongoDB server');
  var db = client.db('TodoApp');

  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('5ad611b1d0b046ea98071df2')
  // }, {
  //     $set: {
  //       completed: true
  //     }
  //   }, {
  //     returnOriginal: false
  //   }).then((result) => {
  //     console.log(JSON.stringify(result, undefined, 2));
  // });

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('5ad5fc9e5627980a8bf895bd')
  }, {
    $set: {
      name: 'Poorva'
    },
    $inc: {
      age : 1
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(JSON.stringify(result, undefined, 2));
  });

  // client.close();
});

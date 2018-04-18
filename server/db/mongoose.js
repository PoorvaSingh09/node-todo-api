var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI)
// mongoose.connect('mongodb://localhost:27017/TodoApp')

// mongoose.connect('mongodb://Poorva:P123456@ds249299.mlab.com:49299/my-node-api-server-db');

module.exports.mongoose = mongoose;

var env = process.env.NODE_ENV || 'development';
console.log('env *******', env);

if (env === 'development') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp'
} else if (env === 'test') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest'
} else {
  process.env.MONGODB_URI = 'mongodb://Poorva:P123456@ds249299.mlab.com:49299/my-node-api-server-db'
}

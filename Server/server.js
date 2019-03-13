// import smth from smth
const http = require('http');
const app = require('./app');
require('dotenv').config();

// Port where the project sould run. env const or hardcode port.
const PORT = process.env.port || 3000;
//console.log(process.env);
console.log('Enviroment:',process.env.DEV_ENV,', Host:', process.env.DB_HOST, ', port:', PORT);
// Create server and store in the variable Server.
// Arguments : listener(function that executed when we get a new request).
const server = http.createServer(app);
//Strat the server
// arguments : port.
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

//LOADING ENV SETUP. JSON FILE*****
// const db = require('db')
// db.connect({
//   host: process.env.DB_HOST,
//   username: process.env.DB_USER,
//   password: process.env.DB_PASS
// })
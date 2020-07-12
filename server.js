var express = require('express');
var express_graphql = require('express-graphql').graphqlHTTP;
var { buildSchema } = require('graphql');// GraphQL schema
const mysql = require('mysql');
const cors = require('cors');



var schema = buildSchema(`
    type Query {
        message: String
    }
`);// Root resolver
var root = {
    message: () => 'Hello World!'
};// Create an express server and a GraphQL endpoint
var app = express();
app.use(cors())
//database connection
app.use((req, res, next) => {
    req.mysqlDb = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : 'kabylie34',
      database : 'userapp'
    });
    req.mysqlDb.connect();
    next();
  });
app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));
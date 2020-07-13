var express = require('express');
var express_graphql = require('express-graphql').graphqlHTTP;
var { buildSchema } = require('graphql');// GraphQL schema
const mysql = require('mysql');
const { Sequelize } = require('sequelize');
const cors = require('cors');
const {ApolloServer, gql} = require('apollo-server-express');
const db =require('./models');
const resolvers = require('./resolvers');
const typeDefs = require('./schema');


const server = new ApolloServer({
    typeDefs: gql(typeDefs),
    resolvers,
    context: { db }
  });


/*var schema = buildSchema(`
    type Query {
        message: String
    }
`);// Root resolver*/
var root = {
    message: () => 'Hello World!'
};// Create an express server and a GraphQL endpoint
var app = express();
server.applyMiddleware({ app });
app.use(cors());

const connection = new Sequelize('agri-api', 'root', 'kabylie34', {
    host: 'localhost',
    dialect: 'mysql'
  });
  connection
  .sync({
      logging: console.log,
      force: true
  })
  .then(()=>{
      console.log('connexion réussie à la base de données agri-api');
  })
  .catch(err=>{
      console.error('echec de connexion à la base de données'+ err);
  })
//database connection
/*app.use((req, res, next) => {
    req.mysqlDb = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : 'kabylie34',
      database : 'agri-api'
    });
    req.mysqlDb.connect();
    next();
  });*/
app.use('/graphql', express_graphql({
    schema: typeDefs,
    rootValue: resolvers,
    graphiql: true
}));
app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));
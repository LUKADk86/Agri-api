module.exports = `
  type User {
    id: ID!
    email: String!
    password: String!
   
  }
 
  type Query {
 
    user(id: ID!): User!
    users: [User!]!
  }
  type Mutation {
    createUser(email: String, password:String!): User!
    updateUser(id: ID!, email: String, password:String!): [Int!]!
    deleteUser(id: ID!): Int!
  }
`;
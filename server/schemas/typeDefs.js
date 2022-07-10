const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: String!
    savedBooks: [Book]
  }
  type Book {
    bookId: String!
    # Not sure about this
    authors: [String]
    description: String!
    title: String!
    image: String!
    link: String!
  }
  type Auth {
    token: ID!
    user: User
  }

  input saveBookInput {
    authors: [String]
    description: String
    title: String
    bookId: String
    image: String
    link: String
  }
  input userInput {
    _id: ID!
    username: String!
    email: String!
    bookCount: String!
    savedBooks: [String]
  }
  type Query {
    me(username: String, email: String, _id: ID): User
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(userInput: userInput!, savebookInput: saveBookInput!): User
  }
`;

module.exports = typeDefs;

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
  type Query {
    me(user: String, username: String): User
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(criteria: saveBookInput): User
  }
`;

module.exports = typeDefs;

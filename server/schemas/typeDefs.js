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
    authors: [Author]
    description: String!
    title: String!
    image: String!
    link: String!
  }
  type Auth {
    token: ID!
    user: User
  }

  type Author {
    name: String!
  }
  type Query {
    me: User
  }
`;

module.exports = typeDefs;

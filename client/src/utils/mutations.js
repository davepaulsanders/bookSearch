import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($userInput: userInput!, $saveBookInput: saveBookInput!) {
    saveBook(userInput: $userInput, saveBookInput: $saveBookInput) {
      username
    }
  }
`;
export const DELETE_BOOK = gql`
  mutation deleteBook($userInput: userInput!, $bookId: String!) {
    deleteBook(userInput: $userInput, bookId: $bookId) {
      username
    }
  }
`;

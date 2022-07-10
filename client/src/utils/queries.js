import { gql } from "@apollo/client";

export const GET_ME = gql`
  query me($username: String, $email: String, $_id: ID) {
    me(username: $username, email: $email, _id: $_id) {
      _id
      username
      savedBooks {
        title
        description
        image
        link
        authors
        bookId
      }
    }
  }
`;

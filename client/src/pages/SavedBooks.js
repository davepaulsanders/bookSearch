import React, { useState, useEffect } from "react";
import {
  Jumbotron,
  Container,
  CardColumns,
  Card,
  Button,
} from "react-bootstrap";
import { useQuery, useMutation } from "@apollo/client";

import { GET_ME } from "../utils/queries";
import { DELETE_BOOK } from "../utils/mutations";
import Auth from "../utils/auth";
import { removeBookId } from "../utils/localStorage";

const SavedBooks = () => {
  // get data from token
  const user = Auth.getProfile().data;
  const { loading, data, refetch } = useQuery(GET_ME, {
    variables: { username: user.username, email: user.email, _id: user._id },
  });
  const userData = data?.me || {};
  const [deleteBook, { error }] = useMutation(DELETE_BOOK, {
    // update(cache, { data: { deleteBook } }) {
    //   try {
    //     // update me array's cache
    //     const { me } = cache.readQuery({ query: GET_ME });
    //     cache.writeQuery({
    //       query: GET_ME,
    //       data: { me: { ...me, savedBooks: [...me.savedBooks, deleteBook] } },
    //     });
    //   } catch (e) {
    //     console.log(e);
    //   }
    // ?\}
  });

  const handleDeleteBook = async (bookId) => {
    try {
      await deleteBook({ variables: { userInput: user, bookId } });
      removeBookId(bookId);
      refetch()
    } catch (err) {
      console.error(err);
    }
  };
  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${
                userData.savedBooks.length === 1 ? "book" : "books"
              }:`
            : "You have no saved books!"}
        </h2>
        <CardColumns>
          {userData.savedBooks.map((book) => {
            return (
              <Card key={book.bookId} border="dark">
                {book.image ? (
                  <Card.Img
                    src={book.image}
                    alt={`The cover for ${book.title}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className="small">Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button
                    className="btn-block btn-danger"
                    onClick={() => handleDeleteBook(book.bookId)}
                  >
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedBooks;

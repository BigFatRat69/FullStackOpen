import { useState, useEffect } from "react";
import { useApolloClient } from "@apollo/client";
import { useSubscription } from '@apollo/client'
import { BOOK_ADDED, ALL_BOOKS } from './components/queries'


import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";
import Recommendations from "./components/Recommendations";

export const updateCache = (cache, query, addedPerson) => {
  // helper that is used to eliminate saving same person twice
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.name
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allPersons }) => {
    return {
      allPersons: uniqByName(allPersons.concat(addedPerson)),
    }
  })
}


const App = () => {
  const [page, setPage] = useState("authors");
  const [error, setError] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("books-user-token"));
  const client = useApolloClient();

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded
      console.log('NEW BOOK ADDED:', addedBook)
      window.alert(`NEW BOOK ADDED: ${addedBook.title}`)


      updateCache(client.cache, {query: ALL_BOOKS}, addedBook)
    }
  })


  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 500);
      return () => clearTimeout(timer);
    }
  }, [error]);


  const logout = () => {
    setToken(null);
    localStorage.removeItem("books-user-token");
    client.resetStore();
    setPage("authors");
  };

  return (
    <div>
      {error && (
        <div style={{ color: "red", margin: "1em 0" }}>
          {error}
        </div>
      )}

      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>

        {token && (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recommendations")}>recommended</button>
            <button onClick={logout}>logout</button>
          </>
        )}

        {!token && (
          <button onClick={() => setPage("login")}>login</button>
        )}
      </div>

      <Authors show={page === "authors"} canEdit={Boolean(token)} />
      <Books show={page === "books"} />

      {token && (
        <>
          <NewBook show={page === "add"} setError={setError} />
          <Recommendations show={page === "recommendations"} />
        </>
      )}

      {!token && page === "login" && (
        <Login setError={setError} setToken={setToken} />
      )}
    </div>
  );
};

export default App;

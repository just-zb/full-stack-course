import {useState} from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import { useQuery, useApolloClient, useSubscription } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED, USER  } from './queries'
import Notify from "./components/Notify";
import Recommend from "./components/Recommand";

const App = () => {
    const [page, setPage] = useState("authors");
    const [token, setToken] = useState(null)
    const authors = useQuery(ALL_AUTHORS)
    const books = useQuery(ALL_BOOKS)
    const user = useQuery(USER)
    const [errorMessage, setErrorMessage] = useState(null)
    const client = useApolloClient()

useSubscription(BOOK_ADDED, {
                onData: ({ data, client }) => {
                    const addedBook = data.data.bookAdded;
                    try {
                        window.alert(`${addedBook.title} added`);
                        updateCache(client.cache, { query: ALL_BOOKS }, addedBook);
                    } catch (error) {
                        console.error('Error updating cache:', error);
                    }

                    client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => ({
                        allBooks: [...allBooks, addedBook],
                    }));
                }
            });
    const logout = () => {
        setToken(null)
        localStorage.clear()
        client.resetStore()
    }
    if(authors.loading || books.loading){
        return <div>loading...</div>
    }
    const notify = (message) => {
        setErrorMessage(message)
        setTimeout(() => {
            setErrorMessage(null)
        }, 5000)
    }


    return (
        <div>
            <Notify errorMessage={errorMessage} />
            <div>
                <button onClick={() => setPage('authors')}>authors</button>
                <button onClick={() => setPage('books')}>books</button>
                {!token ?
                    <button onClick={() => setPage('login')}>login</button>
                    : <div>
                        <button onClick={() => setPage('add')}>add book</button>
                        <button onClick={logout}>logout</button>
                    </div>
                }
                <button onClick={() => setPage('recommend')}>recommend</button>
            </div>

            <Authors show={page === 'authors'} authors={authors.data.allAuthors} setError={notify} />

            <Books show={page === 'books'} books={books.data.allBooks} />

            <NewBook show={page === 'add'} setError={notify}/>

            <LoginForm show={page === 'login'} setToken={setToken} setError={notify} />

            <Recommend show={page === 'recommend'} user={user.data.me} books={books.data.allBooks}/>
        </div>
    )
};

export const updateCache = (cache, query, addedBook) => {
    /**
     * Filters an array of books to remove duplicates based on their titles
     * @param {Array<{title: string}>} books - Array of book objects
     * @returns {Array<{title: string}>} - Array of books with unique titles
     */
    const uniqByTitle = function(books) {
        const seenTitles = new Set();

        return books.filter((book) => {
            const title = book.title;
            const isUnique = !seenTitles.has(title);

            if (isUnique) {
                seenTitles.add(title);
            }

            return isUnique;
        });
    };

    cache.updateQuery(query, ({ allBooks }) => {
        return {
            allBooks: uniqByTitle(allBooks.concat(addedBook)),
        }
    })
}

export default App;

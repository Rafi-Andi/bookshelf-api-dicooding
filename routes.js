import { addBooksHandler, getAllBooks, getBooksById, editBook, deleteBook } from "./handler.js"

const routes = [
    {
        method: "POST",
        path: "/books",
        handler: addBooksHandler
    },
    {
        method: "GET",
        path: "/books",
        handler: getAllBooks
    },
    {
        method: "GET",
        path: "/books/{bookId}",
        handler: getBooksById
    },
    {
        method: "PUT",
        path: "/books/{bookId}",
        handler: editBook
    },
    {
        method: "DELETE",
        path: "/books/{bookId}",
        handler: deleteBook
    }
]

export default routes
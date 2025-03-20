import { nanoid } from "nanoid"
import books from "./books.js"

export const addBooksHandler = (request, h) => {
    const {name, year, author, summary, publisher, pageCount, readPage, reading} = request.payload

    const id = nanoid(26)
    const finished = pageCount === readPage ? true : false
    const insertedAt = new Date().toISOString()
    const updatedAt = new Date().toISOString()

    if(!name){
        const response = h.response({
            status: "fail",
            message: "Gagal menambahkan buku. Mohon isi nama buku"
        })

        return response.code(400)
    }

    if(readPage > pageCount) {
        const response = h.response({
            status: "fail",
            message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
        })

        return response.code(400)
    }

    const book = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        insertedAt,
        updatedAt
    }

    books.push(book)
    console.log(books)

    const response = h.response({
        status: "success",
        message: "Buku berhasil ditambahkan",
        data: {
            bookId : id
        }
    })

    return response.code(201)
}

export const getAllBooks = (request, h) => {
    const {name, reading, finished} = request.query

    const book = books.map(b => ({
        id: b.id,
        name: b.name,
        publisher: b.publisher
    }))


    const bookStatus = books.map(b => ({
        id: b.id,
        name: b.name,
        publisher: b.publisher,
        finished: b.finished,
        reading: b.reading
    }))

    const nameUppercase = name ? name.toUpperCase() : null

    const filterName = books.filter(b => b.name.toUpperCase() === nameUppercase)

    if(filterName.length > 0) {

        const dataFilterName = filterName.map(b => ({
            id: b.id,
            name: b.name,
            publisher: b.publisher
        }))
        const response = h.response({
            status: "success",
            data: {
                books: dataFilterName
            }
        })

        return response.code(200)
    }

    const booksFinished = bookStatus.filter(b => b.finished == true)
    const booksUnfinished = bookStatus.filter(b => b.finished == false)

    const booksReading = bookStatus.filter(b => b.reading == true)
    const booksUnreading = bookStatus.filter(b => b.reading == false)
    
    

    if(finished === '1') {

        if(booksFinished.length > 0) {
            const dataFinished = booksFinished.map(b => ({
                id: b.id,
                name: b.name,
                publisher: b.publisher,
            }))
            const response = h.response({
                status: "success",
                data: {
                    books: dataFinished
                }
            })

            return response.code(200)
        }
    } else if(finished === '0'){
        if(booksFinished.length > 0){
            const dataUnfinished = booksUnfinished.map(b => ({
                id: b.id,
                name: b.name,
                publisher: b.publisher,
            }))
            const response = h.response({
                status: "success",
                data: {
                    books: dataUnfinished
                }
            })

            return response.code(200)
        }
    } else if(reading == '1'){
        const dataReading = booksReading.map(b => ({
            id: b.id,
            name: b.name,
            publisher: b.publisher
        }))

        const response = h.response({
            status: "success",
            data: {
                books: dataReading
            }
        })

        return response.code(200)
    } else if(reading == '0') {
        const dataUnreading = booksUnreading.map(b => ({
            id: b.id,
            name: b.name,
            publisher: b.publisher
        }))

        const response = h.response({
            status: "success",
            data: {
                books:dataUnreading
            }
        })

        return response.code(200)
    } else {
        const response = h.response({
            status: "success",
            data: {
                books: book
            }
        })
        return response.code(200)
    }
}

export const getBooksById = (request, h) => {
    const {bookId} = request.params

    const book = books.filter((b) => b.id === bookId)[0]

    if(book !== undefined) {
        const response = h.response({
            status: "success",
            data: {
              book  
            }
        })

        return response.code(200)
    }

    const response = h.response({
        status: "fail",
        message: "Buku tidak ditemukan"
    })

    return response.code(404)
}

export const editBook = (request, h) => {
    const {name, year, author, summary, publisher, pageCount, readPage, reading} = request.payload
    const {bookId} = request.params

    const updatedAt = new Date().toISOString()

    const index = books.findIndex((book) => book.id === bookId)

    if(!name) {
        const response = h.response({
            status: "fail",
            message: "Gagal memperbarui buku. Mohon isi nama buku"
        })

        return response.code(400)
    }

    if(readPage > pageCount){
        const response = h.response({
            status: "fail",
            message: "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"
        })
        
        return response.code(400)
    }
    
    if(index === -1) {
        const response = h.response({
            status: "fail",
            message: "Gagal memperbarui buku. Id tidak ditemukan"
        })
        
        return response.code(404)
    }
    
    books[index] = {
        ...books[index],
        name, 
        year, 
        author, 
        summary, 
        publisher, 
        pageCount, 
        readPage, 
        reading,
        updatedAt
    }
    
    const response = h.response({
        status: "success",
        message: "Buku berhasil diperbarui"
    })
    
    return response.code(200)
}

export const deleteBook = (request, h) => {
    const {bookId} = request.params
    
    const index = books.findIndex((b) => b.id === bookId)

    if(index !== -1){
        books.splice(index, 1)

        const response = h.response({
            status: "success",
            message: "Buku berhasil dihapus"
        })

        return response.code(200)
    } else {
        const response = h.response({
            status: "fail",
            message: "Buku gagal dihapus. Id tidak ditemukan"
        })

        return response.code(404)
    }
}

export const getBooksByName = (request, h) => {
    const {name} = request.query

    const nameUppercase = name.toUpperCase()

    const booksName =  books.filter((b) => b.name === nameUppercase)
    if(booksName){
        const response = h.response({
            message: "success",
            data: {
                booksName
            }
        })
    }
}
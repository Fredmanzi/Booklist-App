//Book class: Represent Book
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

//store class :Handles storage
class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem(books));
        }
        return books;
    }
    static addBooks(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));

    }
    static removeBooks() {
        const books = Store.getBooks();
        books.forEach((book, index) => {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books))
    }

}
//UI class:Handle Ui task
class UI {
    static displayBooks() {
        const books = Store.getBooks();
        const arr = books || [];
        arr.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list');
        const row = document.createElement('tr');
        row.innerHTML =
            `<td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">x</a></td>
        `;
        list.appendChild(row);
    }
    static deleteBook(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }
    static clearFields() {
        const title = document.querySelector('#book-title').value = '';
        const author = document.querySelector('#author').value = '';
        const isbn = document.querySelector('#isbn').value = '';
    }

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container-one');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);
        //vanish after 3 secs

        setTimeout(() => document.querySelector('.alert').remove(), 3000)
    }
}

document.addEventListener('DOMContentLoaded', UI.displayBooks);

document.querySelector('#book-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.querySelector('#book-title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    if (title === 'b' || author === '' || isbn === '') {
        UI.showAlert('please fillin all fields', 'danger');
    }
    else {
        const book = new Book(title, author, isbn);

        UI.addBookToList(book);
        Store.addBooks(book);

        UI.clearFields();
        UI.showAlert('Book added successfully', 'success');
    }


})



//remove book from list
document.querySelector('#book-list').addEventListener('click', (e) => {
    UI.deleteBook(e.target);
    UI.showAlert('Book deleted', 'warning')
})
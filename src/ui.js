const ul = document.querySelector('.books');
const form = document.querySelector('.book-form');
const formWrapper = document.querySelector('.book-form-wrapper');
let bookList = List();

const createBook = (book) => new Map({
  ...book,
  isRead: book.isRead || false,
  date: new Date()
});

const createDiv = (text, className) => {
  let div = document.createElement('div');
  div.innerHTML = text;
  div.className = className;
  return div;
};

const createButton = (text, className, func) => {
  let button = document.createElement('button');
  button.innerHTML = text;
  button.className = 'btn ' + className;
  button.onclick = func;
  return button;
}

const editBook = (book) => () => {
  openForm();
  form.elements['title'].value = book.title;
  form.elements['author'].value = book.author;
  form.elements['publishing-house'].value = book.publishingHouse;
  form.elements['tags'].value = book.tags.join(', ');
  form.elements['is-read'].checked = book.isRead;
}

const createLi = (book) => {
  let el = document.createElement('li');
  const {title, author, publishingHouse, tags, date, isRead, id} = book;
  const tagsString = tags.map(t => '#' + t).join(' ');
  const status = isRead ? 'Read' : 'Not read';
  const dateString = date.toLocaleDateString();
  el.className = 'book col-4';
  el.appendChild(createDiv(title, 'book__title'));
  el.appendChild(createDiv(author, 'book__author'));
  el.appendChild(createDiv(publishingHouse, 'book__publishing-house'));
  el.appendChild(createDiv(dateString, 'book__date'));
  el.appendChild(createDiv(status, 'book__is-read'));
  el.appendChild(createDiv(tagsString, 'book__tags'));
  el.appendChild(createButton('Mark as read', 'btn-success'));
  el.appendChild(createButton('Edit', 'btn-info', editBook(book)));
  return el;
}

const book1 = {
  title: 'Harry',
  author: 'Joanne Rowling',
  publishingHouse: 'Ababagalamaga',
  tags: Set.of('Fantasy', 'Science fiction', 'Horror')
}

const book2 = {
  title: 'Peter Pan',
  author: 'Barrie',
  publishingHouse: 'Ababagalamaga',
  tags: Set.of('Fantasy', 'Science fiction', 'Horror')
}

const book3 = {
  title: 'Green mile',
  author: 'Stephen King',
  publishingHouse: 'Ababagalamaga',
  tags: Set.of('Fantasy', 'Science fiction', 'Horror')
}


// const createLii = (book) => R.pipe(
  // _ => document.createElement('li'),
  // el => ({...el, className: 'book col-4', dataset: {...el.dataset, id: book.id}}),
  // el => el.appendChild(createField(book.title, 'book__title'))
// )(book);

// console.log(createLii(book1));

bookList = bookList.push(createBook(book1));
bookList = bookList.push(createBook(book2));
bookList = bookList.push(createBook(book3));

function renderBooks() {
  ul.innerHTML = '';
  console.log(bookList.toJS());
  bookList.toJS().forEach((element) => {
    const book = createLi(element);
    ul.appendChild(book);
  })
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const book = {
    title: formData.get('title'),
    author: formData.get('author'),
    publishingHouse: formData.get('publishing-house'),
    tags: Set.of(...formData.get('tags').split(',').map(v => v.trim())),
    isRead: formData.get('is-read') !== null
  }
  bookList = bookList.push(createBook(book));
  form.reset();
  renderBooks();
})

function openForm() {
  formWrapper.style.display = 'block';
}

function closeForm() {
  formWrapper.style.display = 'none';
}

renderBooks();
// var list = Immutable.fromJS([1,['foo','bar'],3,4,5,6]);
// var newlist = Immutable.fromJS(['a']);
// console.log(list.toJS());
// // [1, ['foo', 'bar'], 3, 4, 5, 6]
// list = list.mergeDeepIn([1], newlist)	;
// console.log(list.toJS());
// // [1, ['a', 'bar'], 3, 4, 5, 6]

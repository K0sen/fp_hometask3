// const list = List([1,2,3,3]);
const ul = document.querySelector('.books');
const createBook = ({title, author, publishingHouse, tags}) => new Map({
  title,
  author,
  publishingHouse,
  tags,
  date: new Date(),
  isRead: false
});

const createLi = ({title}) => {
  let el = document.createElement('li');
  el.innerHTML = title;
  el.className = 'book'
  return el;
}

const book1 = {
  title: 'Kyksys1',
  author: 'Peter Pan',
  publishingHouse: 'Ababagalamaga',
  tags: Set.of('Fantasy', 'Science fiction', 'Horror')
}

const book2 = {
  title: 'Kyksys2',
  author: 'Peter Pan',
  publishingHouse: 'Ababagalamaga',
  tags: Set.of('Fantasy', 'Science fiction', 'Horror')
}

const book3 = {
  title: 'Kyksys3',
  author: 'Peter Pan',
  publishingHouse: 'Ababagalamaga',
  tags: Set.of('Fantasy', 'Science fiction', 'Horror')
}

myList = List.of(createBook(book1), createBook(book2), createBook(book3));

function renderBooks() {
  ul.innerHTML = '';
  myList.toJS().forEach(element => {
    const book = createLi(element);
    ul.appendChild(book);
  })
}




// var list = Immutable.fromJS([1,['foo','bar'],3,4,5,6]);
// var newlist = Immutable.fromJS(['a']);
// console.log(list.toJS());
// // [1, ['foo', 'bar'], 3, 4, 5, 6]
// list = list.mergeDeepIn([1], newlist)	;
// console.log(list.toJS());
// // [1, ['a', 'bar'], 3, 4, 5, 6]
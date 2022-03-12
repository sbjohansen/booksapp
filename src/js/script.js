{

  'use strict';

  const select = {
    templateOf: {
      bookProduct: '#template-book',
    },       
        
    containerOf: {
      booklist: '.books-list',
      filters: '.filters'
    },

    element: {
      bookImage: '.book__image',
      dataId: 'data-id'
    },

    class: {
      favorite: 'favorite',
    }

        

  };

  const templates = {
    bookProduct: Handlebars.compile(document.querySelector(select.templateOf.bookProduct).innerHTML)
  };

  const favoriteBooks = [];
  const filters = [];

  const filtersForm = document.querySelector(select.containerOf.filters);

  console.log(filtersForm);


  const render = function(){
    for(let book of dataSource.books) { 
      const thisBook = this;

      /* generate HTML based on template */
      const generatedHTML = templates.bookProduct(book);
      /* create element using utils.createElementFromHTML */
      thisBook.bookParams = utils.createDOMFromHTML(generatedHTML);
      /* find menu container */
      const bookContainer = document.querySelector(select.containerOf.booklist);
      /* add element to menu */
      bookContainer.appendChild(thisBook.bookParams);
    }
  };


  const initActions = function(){

    const thisBook = this;

    thisBook.container = document.querySelector(select.containerOf.booklist);
    thisBook.images = thisBook.container.querySelectorAll(select.element.bookImage);
    thisBook.filters = document.querySelector(select.containerOf.filters);
    

    thisBook.container.addEventListener('click', function(event){
      event.preventDefault();
    });
      
    thisBook.container.addEventListener('dblclick', function(event){
      event.preventDefault();

      const book = event.target.offsetParent;
      if(book.classList.contains('book__image')){
        book.classList.toggle(select.class.favorite);
        const dataId = book.getAttribute(select.element.dataId);
        //console.log(dataId);
        if (!favoriteBooks.includes(dataId)){
          favoriteBooks.push(dataId);
          console.log(favoriteBooks);
        } else {
          const indexId = favoriteBooks.indexOf(dataId);
          favoriteBooks.splice(indexId, 1);
          //console.log(favoriteBooks);
        }
      }
    });

    thisBook.filters.addEventListener('click', function(event){
      
      const filter = event.target;
      console.log(filter);
      if (filter.getAttribute('type') === 'checkbox' && filter.getAttribute('name') === 'filter'){
        if(filter.checked){
          filters.push(filter.value);
        } else if (!filter.checked){
          const filterId = filters.indexOf(filter.value);
          filters.splice(filterId, 1);
        }       
      }
    });


  };

  

  render();
  initActions();

}
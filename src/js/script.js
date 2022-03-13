{

  'use strict';

  const select = {
    templateOf: {
      bookProduct: '#template-book',
    },       
        
    containerOf: {
      booklist: '.books-list',
      filters: '.filters',
      rating: '.book__rating'
    },

    element: {
      bookImage: '.book__image',
      dataId: 'data-id',
    },

    class: {
      favorite: 'favorite',
      hidden: 'hidden',
    }

        

  };

  const templates = {
    bookProduct: Handlebars.compile(document.querySelector(select.templateOf.bookProduct).innerHTML),
  };

  const favoriteBooks = [];
  const filters = [];


  //const filtersForm = document.querySelector(select.containerOf.filters);

  console.log(filters);


  const render = function(){
    
    for(let book of dataSource.books) { 
      const thisBook = this;
      book.ratingBgc = determineRatingBgc(book.rating);
      book.ratingWidth = book.rating * 10;

      /* generate HTML based on template */
      const generatedHTML = templates.bookProduct(book);
      /* create element using utils.createElementFromHTML */
      thisBook.bookParams = utils.createDOMFromHTML(generatedHTML);
      /* find menu container */
      const bookContainer = document.querySelector(select.containerOf.booklist);
      /* add element to menu */
      bookContainer.appendChild(thisBook.bookParams);
      console.log(thisBook.ratingBgc);


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
          //console.log(favoriteBooks);
        } else {
          const indexId = favoriteBooks.indexOf(dataId);
          favoriteBooks.splice(indexId, 1);
          //console.log(favoriteBooks);
        }
      }
    });

    thisBook.filters.addEventListener('click', function(event){
      
      const filter = event.target;
      //console.log(filter);
      if (filter.getAttribute('type') === 'checkbox' && filter.getAttribute('name') === 'filter'){
        if(filter.checked){
          filters.push(filter.value);
          filterBooks();
        } else if (!filter.checked){
          const filterId = filters.indexOf(filter.value);
          filters.splice(filterId, 1);
          filterBooks();
        }       
      }
    });


  };

  const filterBooks = function() {
    //const thisBook = this;

    //thisBook.images = thisBook.container.querySelector(select.element.bookImage);

    const books = dataSource.books;
    const bookId = [];


    for(let book of books){
      let shouldBeHidden = false;

      for(const filter of filters) {
        if(!book.details[filter]) {
          shouldBeHidden = true;
          
          bookId.push(book.id)
          

          break;
        }
        

      }
      if(bookId.includes(book.id)){
        //console.log(bookId);
        const bookImg = document.querySelector('[data-id="' + book.id + '"]');
        console.log(bookImg);
        bookImg.classList.add(select.class.hidden);
      } else if (!bookId.includes(book.id)){
        const bookImg = document.querySelector('[data-id="' + book.id + '"]');
        console.log(bookImg);
        bookImg.classList.remove(select.class.hidden);
      }
      
    }
    
  };

  const determineRatingBgc = function(rating){
    if(rating < 6){
      ratingBgc = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
    } else if(rating > 6 && rating <= 8){
      ratingBgc = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';

    } else if (rating > 8 && rating <= 9){
      ratingBgc = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
 
    } else if(rating > 9){
      ratingBgc = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
    }
    return ratingBgc;

  }

  

  render();
  determineRatingBgc();
  initActions();

}
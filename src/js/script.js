{

  'use strict';

  const select = {
    templateOf: {
      bookProduct: '#template-book',
    },       
        
    containerOf: {
      booklist: '.books-list'
    }
        

  };

  const templates = {
    bookProduct: Handlebars.compile(document.querySelector(select.templateOf.bookProduct).innerHTML)
  };



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

  render();
}
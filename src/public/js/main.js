const socket = io()

const form = document.querySelector('#form');
const title = document.querySelector('#title');
const description = document.querySelector('#description');
const code = document.querySelector('#code');
const price = document.querySelector('#price');
const stock = document.querySelector('#stock');
const category  = document.querySelector('#category');
const thumbnails = document.querySelector('#thumbnails');

form.addEventListener('submit', e => {
    e.preventDefault();
     
        socket.emit('client:new_product',{
            title: title.value,
            description: description.value,
            code: code.value,
            price: price.value,
            stock: stock.value,
            category: category.value,
            thumbnails: thumbnails.value
        } )
   

});

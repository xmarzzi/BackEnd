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

socket.on("msg_back_to_sockets", (data) => {
    // console.log("hola",data);
    data.forEach(prod => {
      
        data += "<div class='card '  style='width: 18rem;'>";   
        data += "<div class='card-body''>";   
        data += "<h2 class='card.title'>"+ prod.title + "</h2>";  
        data += "<p class='card.text'> Descripción:" + prod.description + "</p>";   
        data += "<p class='card.text'> Precio:" + prod.price + "</p>";   
        data += "<p class='card.text'> Precio:" + prod.price + "</p>";   
        data += "<buttom  class='btn btn-primary' onclick='eliminar'> Eliminar" +"</buttom>";    
        data += "</div>";  
       
       
      
    });

    document.getElementById('addproduct').innerHTML = data;
})

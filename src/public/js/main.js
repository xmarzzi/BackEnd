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
    console.log("hola",data);
    data.forEach((prod) => {
      data += "<div>";  
      data += "<li>" + prod.title + "</li>";  
      data += "<li>" + prod.description + "</li>";  
      data += "<li>" + prod.code + "</li>";  
      data += "<li>" + prod.price + "</li>";  
      data += "<li>" + prod.stock + "</li>";  
      data += "<li>" + prod.category + "</li>";  
      data += "<li>" + prod.thumbnails + "</li>";  
    
      data += "</div>";  
    });

    const divProd = document.getElementById("addproduct");
    divProd.innerHTML = data;
})

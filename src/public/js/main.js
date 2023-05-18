const socket = io()

const form = document.querySelector('#form');
const title = document.querySelector('#title');
const description = document.querySelector('#description');
const code = document.querySelector('#code');
const price = document.querySelector('#price');
const stock = document.querySelector('#stock');
const category  = document.querySelector('#category');
const thumbnails = document.querySelector('#thumbnails');

// Enviando data al socket desde el front
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
        form.reset();
        alert('El producto ha sido agregado correctamente'); 

});


//Recibiendo data desde el socket
socket.on("msg_back_to_sockets", (data) => {
  
        console.log(data)
        const newProduct = `
        <div class="card" style="width: 18rem;">
        <img src=${data.thumbnails} class="card-img-top img" alt="..." />
        <div class="card-body">
          <h5 class="card-title">${data.title}</h5>
          <p class="card-text">${data.description}</p>
          <p class="card-text">$${data.price}</p>
          <buttom class="btn "onclick="deleteproduct ('${data.id}')">Delete</buttom>
        </div>
      </div>
        `;
        document.getElementById("addproduct").innerHTML += newProduct;
      
    });
    

    function deleteproduct(id) {
      socket.emit("client:deleteproduct", id)
    }
    
    // Evento que se activa cuando se recibe la lista de productos actualizada
    socket.on('server:updateproducts', (products) => {
      // Recargar la página
      location.reload();
    });

 

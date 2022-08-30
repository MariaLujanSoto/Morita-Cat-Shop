const contenedorCarrito = document.getElementById('carrito-contenedor')

const contenedorProductos = document.getElementById('contenedor-productos')

const botonVaciar = document.getElementById('vaciar-carrito')

const contadorCarrito = document.getElementById('contadorCarrito')

const precioTotal = document.getElementById('precioTotal')

let botonComprar = document.getElementById("btnComprar")

let carrito = []

document.addEventListener('DOMContentLoaded', () =>{
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})

const cargarProductos = async () => {
    
    const response = await fetch('productos.json');
    const data = await response.json();
    productos = data
    crearCards();
    
};

cargarProductos()

function crearCards(){
    productos.forEach((producto) => {
        const div = document.createElement('div')
        div.classList.add('producto')
        div.innerHTML = `
                <div class="card-body">
                    <img src='${producto.imagen}'class="imgCards " style="widht: 100px">
                    <h2>${producto.nombre}</h2>
                    <p class="precioProducto">Precio: $${producto.precio}</p>
                    <button id="agregar${producto.id}" class="boton-agregar">Agregar al carrito <i class="fas fa-shopping-cart"></i></button>
                </div>
                    `
        contenedorProductos.appendChild(div)

        let boton = document.getElementById(`agregar${producto.id}`)
        boton.addEventListener('click', () => {
        
        agregarAlCarrito(producto.id)
        Toastify({
            text: "Producto Añadido !",
            duration: 1500,
            gravity: "bottom", // `top` or `bottom`
            position: "left", // `left`, `center` or `right`
            style: {
              background: "lume",
            }
          }).showToast();
           
            
           

    })
   }
   
)}
   


   
const agregarAlCarrito = (prodId)=>{
    const existe = carrito.some(prod => prod.id == prodId)

    if (existe){
        const prod = carrito.map(prod =>{
            if (prod.id === prodId){
                prod.cantidad++
            }
        })
        

    } else {

    
    const item = productos.find((prod) => prod.id === prodId)
    carrito.push(item)
    
    console.log(carrito)
    
    }

    actualizarCarrito()
}

const eliminarDelCarrito = (prodId) =>{
    const item = carrito.find((prod)=>prod.id === prodId)
    const indice = carrito.indexOf(item)
    carrito.splice(indice,1)
    actualizarCarrito()
    Toastify({
        text: "Producto Eliminado!",
        className: "info",
        style: {
          background: "lume",
        }
      }).showToast();
    
       
}


const actualizarCarrito = () =>{

    contenedorCarrito.innerHTML = ""

    carrito.forEach((prod) =>{
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
        <div class="card-body ">
        <img src='${prod.imagen}'class="imgCards " style="widht: 40px">
                <p>${prod.nombre}</p>
                <p class="precioProducto">Precio: $${prod.precio}</p>
                <p> Cantidad: <span id =cantidad> ${prod.cantidad}</span></p>
                <button onclick = "eliminarDelCarrito(${prod.id})" class="boton-eliminar" style=" border-radius: 100px ;"><i class="fa-solid fa-trash-can"></i></button>

            </div>
                
        
        `
         contenedorCarrito.appendChild(div)

         localStorage.setItem('carrito', JSON.stringify(carrito))

         
    })
    
   contadorCarrito.innerText = carrito.length
   precioTotal.innerText = carrito.reduce((acc, prod)=> acc + prod.precio * prod.cantidad, 0)
}

botonVaciar.addEventListener('click', ()=>{
    carrito.length = 0
    actualizarCarrito()
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'El carrito se a vaciado correctamente',
        showConfirmButton: false,
        timer: 2000
       })

})


botonComprar.addEventListener("click", ()=>{
    if (carrito.length >0){
        Swal.fire({
            title: 'Compra Confirmada',
            text: '¡ Hiciste muy feliz a tu minino !',
            imageUrl: 'img/gatitofeliz.jpg',
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Minino Feliz',
          })
    }else{
        Swal.fire({
            title: '¡ No hay nada para comprar !',
            text: 'Volve y agrega algun articulo a tu carrito, no permitas que tu minino se ponga triste.',
            imageUrl: 'img/gatitotriste.jpg',
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Minino Triste',
          })
    }


})


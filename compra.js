let contenedorResumen = document.getElementById("resumenCompra");

carrito = JSON.parse(localStorage.getItem("carrito"));
console.log(carrito);

let botonComprar = document.getElementById("btn-submit");

const precioTotal = document.getElementById('precioTotal')

carrito.forEach((prod) => {
    contenedorResumen.innerHTML += `
    
    <tr style="border: solid 3px black; text-align: center; ">
        <td ><img src= "${prod.imagen}"  style="margin-left:50px;"></td>        
        <td class:"textoProd" >${prod.nombre}</td>
        <td class:"textoProd">${prod.cantidad}</td>
        <td class:"textoProd">$${prod.precio}</td>    
    
    </tr> 
    `;
    localStorage.setItem("carrito", JSON.stringify(carrito)) 
    
})

precioTotal.innerText = carrito.reduce((acc, prod)=> acc + prod.precio * prod.cantidad, 0)



const actualizarCarrito = () => {
    contenedorResumen.innerHTML = "";
    carrito.forEach(() => {       
        localStorage.setItem("carrito", JSON.stringify(carrito));
    })    
}


function validarTamaño(event){
    if(event.target.value.length ==4 || event.target.value.length == 9 ||event.target.value.length == 14 ){
        event.target.value += ' ';
        
            }

    }

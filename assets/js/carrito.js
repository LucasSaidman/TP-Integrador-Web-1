// Seleccionar elementos del DOM
const contenedorCarrito = document.querySelector('.Contenedor-carrito');
const carritoVacio = document.querySelector('#carrito-vacio');
const carritoAcciones = document.querySelector('#carrito-acciones');
const carritoAccionesVaciar = document.querySelector('#carrito-acciones-vaciar');
const carritoAccionesComprar = document.querySelector('#carrito-acciones-comprar');
const totalElement = document.querySelector('#total');


let productosEnCarrito = [];


document.addEventListener('DOMContentLoaded', function() {
    cargarProductosCarrito();
});

function cargarProductosCarrito() {
    const productosEnCarritoLS = localStorage.getItem("productos-en-carrito");
    
    if (productosEnCarritoLS) {
        productosEnCarrito = JSON.parse(productosEnCarritoLS);
        mostrarProductosCarrito();
    } else {
        carritoVacio.classList.remove('desactivado');
        carritoAcciones.classList.add('desactivado');
    }
}

function mostrarProductosCarrito() {
    
    contenedorCarrito.innerHTML = '';
    
    if (productosEnCarrito.length === 0) {
        carritoVacio.classList.remove('desactivado');
        carritoAcciones.classList.add('desactivado');
        return;
    }
    
    
    carritoVacio.classList.add('desactivado');
    carritoAcciones.classList.remove('desactivado');
    
    
    const tabla = document.createElement('table');
    tabla.classList.add('carrito-tabla');
    
   
    const thead = document.createElement('thead');
    thead.innerHTML = `
        <tr>
            <th>Imagen</th>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
            <th>Eliminar</th>
        </tr>
    `;
    tabla.appendChild(thead);
    
    
    const tbody = document.createElement('tbody');
    
    productosEnCarrito.forEach(producto => {
        const tr = document.createElement('tr');
        
        
        const tdImg = document.createElement('td');
        const img = document.createElement('img');
        img.src = producto.imagen;
        img.alt = producto.titulo;
        img.classList.add('carrito-producto-imagen');
        tdImg.appendChild(img);
        
        
        const tdTitulo = document.createElement('td');
        tdTitulo.textContent = producto.titulo;
        tdTitulo.classList.add('carrito-producto-titulo');
        
       
        const tdPrecio = document.createElement('td');
        tdPrecio.textContent = `$${producto.precio.toLocaleString('es-AR')}`;
        tdPrecio.classList.add('carrito-producto-precio');
        
      
        const tdCantidad = document.createElement('td');
        const divCantidad = document.createElement('div');
        divCantidad.classList.add('carrito-producto-cantidad');
        
        const btnRestar = document.createElement('button');
        btnRestar.textContent = '-';
        btnRestar.classList.add('btn-cantidad');
        btnRestar.addEventListener('click', () => modificarCantidad(producto.id, -1));
        
        const inputCantidad = document.createElement('input');
        inputCantidad.type = 'number';
        inputCantidad.value = producto.cantidad;
        inputCantidad.min = '1';
        inputCantidad.classList.add('input-cantidad');
        inputCantidad.addEventListener('change', (e) => {
            const nuevaCantidad = parseInt(e.target.value);
            if (nuevaCantidad > 0) {
                actualizarCantidad(producto.id, nuevaCantidad);
            } else {
                e.target.value = producto.cantidad;
            }
        });
        
        const btnSumar = document.createElement('button');
        btnSumar.textContent = '+';
        btnSumar.classList.add('btn-cantidad');
        btnSumar.addEventListener('click', () => modificarCantidad(producto.id, 1));
        
        divCantidad.append(btnRestar, inputCantidad, btnSumar);
        tdCantidad.appendChild(divCantidad);
        
       
        const tdSubtotal = document.createElement('td');
        const subtotal = producto.precio * producto.cantidad;
        tdSubtotal.textContent = `$${subtotal.toLocaleString('es-AR')}`;
        tdSubtotal.classList.add('carrito-producto-subtotal');
        
    
        const tdEliminar = document.createElement('td');
        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = '✕';
        btnEliminar.classList.add('btn-eliminar');
        btnEliminar.addEventListener('click', () => eliminarProducto(producto.id));
        tdEliminar.appendChild(btnEliminar);
        
        tr.append(tdImg, tdTitulo, tdPrecio, tdCantidad, tdSubtotal, tdEliminar);
        tbody.appendChild(tr);
    });
    
    tabla.appendChild(tbody);
    contenedorCarrito.appendChild(tabla);
    
   
    actualizarTotal();
}

function modificarCantidad(id, cambio) {
    const producto = productosEnCarrito.find(p => p.id === id);
    if (producto) {
        producto.cantidad += cambio;
        
        if (producto.cantidad <= 0) {
            eliminarProducto(id);
        } else {
            guardarEnLocalStorage();
            mostrarProductosCarrito();
            actualizarNumerito();
        }
    }
}

function actualizarCantidad(id, nuevaCantidad) {
    const producto = productosEnCarrito.find(p => p.id === id);
    if (producto) {
        producto.cantidad = nuevaCantidad;
        guardarEnLocalStorage();
        mostrarProductosCarrito();
        actualizarNumerito();
    }
}

function eliminarProducto(id) {
    productosEnCarrito = productosEnCarrito.filter(p => p.id !== id);
    guardarEnLocalStorage();
    mostrarProductosCarrito();
    actualizarNumerito();
}

function vaciarCarrito() {
    productosEnCarrito = [];
    guardarEnLocalStorage();
    mostrarProductosCarrito();
    actualizarNumerito();
}

function actualizarTotal() {
    const total = productosEnCarrito.reduce((acc, producto) => {
        return acc + (producto.precio * producto.cantidad);
    }, 0);
    
    totalElement.textContent = `$${total.toLocaleString('es-AR')}`;
}

function guardarEnLocalStorage() {
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    const numero = document.querySelector("#numero");
    if (numero) {
        const nuevoNumero = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
        numero.textContent = nuevoNumero;
    }
}

function comprarCarrito() {
    if (productosEnCarrito.length === 0) {
        alert('El carrito está vacío');
        return;
    }
    
    
    alert('¡Gracias por tu compra! Total: ' + totalElement.textContent);
    
    
    vaciarCarrito();
}


carritoAccionesVaciar.addEventListener('click', vaciarCarrito);
carritoAccionesComprar.addEventListener('click', comprarCarrito);
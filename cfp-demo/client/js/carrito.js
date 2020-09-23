//Actualizando repositorio
let btnAgregar = document.querySelector("#btnAgregar");
btnAgregar.addEventListener("click", agregar);
let btnTotal = document.querySelector("#btnTotal");
btnTotal.addEventListener("click", sumar);
let btnLimpiar = document.querySelector("#btnLimpiar");
btnLimpiar.addEventListener("click", limpiarTabla);

let compras = [];

function agregar() {
    let producto = document.querySelector('#producto').value;
    let precio = parseInt(document.querySelector('#precio').value);
    let marca = document.querySelector('#marca').value;
    let renglon = {
        "producto_nombre": producto,
        "precio": precio,
        "marca":marca
    }
    compras.push(renglon);
    mostrarTablaCompras();
}


function sumar() {
    let total = 0;
    for (let i = 0; i < compras.length; i++) {
        total += (compras[i].precio); //tengo q convertirlo a entero
    }
    let max = (compras[0].precio); //tengo q convertirlo a entero
    for (let i = 0; i < compras.length; i++) {
        if (max < (compras[i].precio)) { //tengo q convertirlo a entero
            max = (compras[i].precio);
        }
    }
    document.querySelector("#total").innerHTML =
        "<p>Total: $" + total + "</p>" +
        "<p>Maximo: $" + max + "</p>"
}

function limpiarTabla(){
    document.querySelector("#tblCompras").innerHTML="";

}

function mostrarTablaCompras() {
    html = "";
    for (let i = 0; i < compras.length; i++) {
        html += `
               <tr>
                   <td>${compras[i].producto_nombre}</td>
                   <td>${compras[i].precio}</td>
                   <td>${compras[i].marca}</td>
                   </tr>
           `;
    }
     document.querySelector("#tblCompras").innerHTML = html;
}


async function load() {
    let container = document.querySelector("#use-ajax");
    container.innerHTML = "<h1> ...LOADING... </h1>";
    try {
        let response = await fetch('/productos');
        if (response.ok) {
            let t = await response.json();
            compras = t; //[...compras, ...t];reemplazo arreglo global compras por el que viene de la api 
            mostrarTablaCompras(); //muestro las compras
            container.innerHTML = ""; //lo dejo vacio, sin mensaje
        }
        else {
            container.innerHTML = "<h1>Error - Failed URL!</h1>";
        }
    }
    catch (response) {
        container.innerHTML = "<h1>Connection error</h1>";
    };
}

load();









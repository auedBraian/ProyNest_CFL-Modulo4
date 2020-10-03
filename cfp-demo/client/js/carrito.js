let btnAgregar = document.querySelector("#btnAgregar");
btnAgregar.addEventListener("click", agregar);
let btnTotal = document.querySelector("#btnTotal");
btnTotal.addEventListener("click", sumar);
let btnLimpiar = document.querySelector("#btnLimpiar");
btnLimpiar.addEventListener("click", limpiarTabla);


let compras = [];

async function agregar() {
    let producto = document.querySelector('#producto').value;
    let precio = parseInt(document.querySelector('#precio').value);
    let marca = document.querySelector('#marca').value;
    let renglon = {
        "producto_nombre": producto,
        "precio": precio,
        "marca": marca
    }
    let resp = await fetch("productos", {
        "method": "POST",
        "headers": { "Content-Type": "application/json" },
        "body": JSON.stringify(renglon)
    })
    if (resp.ok) {
        compras.push(renglon);
        mostrarTablaCompras();
    } else {
        console.log("fallo el post");
        let container = document.querySelector("#use-ajax");
        container.innerHTML = "<h1> Fallo Post </h1>";
    }


}


function sumar() {
    let total = 0;
    for (let i = 0; i < compras.length; i++) {
        total += (compras[i].precio); 
    }
    let max = (compras[0].precio); 
    for (let i = 0; i < compras.length; i++) {
        if (max < (compras[i].precio)) { 
            max = (compras[i].precio);
        }
    }
    document.querySelector("#total").innerHTML =
        "<p>Total: $" + total + "</p>" +
        "<p>Maximo: $" + max + "</p>"
}

function limpiarTabla() {
    document.querySelector("#tblCompras").innerHTML = "";
}

function mostrarTablaCompras() {
    html = "";
    for (let i = 0; i < compras.length; i++) {
        if (compras[i].precio == null) {

        }
        else {
            html += `
        <tr>
        <td><input type=”text” value=${compras[i].producto_nombre} id="prod${i}"></td>
        <td><input type=”number” value=${compras[i].precio} id="prec${i}"></td>
        <td><input type=”text” value=${compras[i].marca} id="marc${i}"></td>
        
        <td><button class="btnUpdProd" pos=${i}>Actualizar</button></td>
      
        <td><button class="btn-delete-producto" pos=${i}>Borrar</button></td>
        </tr>
           `;
        }
    }
    document.querySelector("#tblCompras").innerHTML = html;

    let botonesBorrar = document.querySelectorAll(".btn-delete-producto");
    botonesBorrar.forEach(e => {
        e.addEventListener("click", btnBorrarClick);
    });

    let botonesActualizar = document.querySelectorAll(".btnUpdProd");
    botonesActualizar.forEach(e => { e.addEventListener("click", btnActualizarClick); });



}

async function load() {
    let container = document.querySelector("#use-ajax");
    container.innerHTML = "<h1> ...LOADING... </h1>";
    try {
        let response = await fetch('/productos');
        if (response.ok) {
            let t = await response.json();
            compras = t; //reemplazo arreglo global compras por el que viene de la api 
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

//Actualizo repositorio
async function btnBorrarClick() {
    let pos = this.getAttribute("pos");
    let response = await fetch(`/productos/${pos}`, {
        "method": "DELETE",
        "headers": {
            "Content-Type": "application/json"
        }
    })
    load();
}

async function btnActualizarClick() {
    let pos = this.getAttribute("pos");
    let renglon = {
        "producto_nombre": document.querySelector(`#prod${pos}`).value,
        "precio": document.querySelector(`#prec${pos}`).value,
        "marca": document.querySelector(`#marc${pos}`).value,
    }
    let response = await fetch(`/productos/${pos}`, {
        "method": "PUT",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(renglon)
    });
    load();
}

load();




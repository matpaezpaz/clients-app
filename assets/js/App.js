const formCliente = document.getElementById("formCliente");

const inputNombre = document.getElementById("nombre");
const inputApellido = document.getElementById("apellido");
const inputDni = document.getElementById("dni");
const inputBalance = document.getElementById("balance");

const tableClientes = document.getElementById("tableClientes");
const tableClientesBody = document.createElement('tbody');

const listClientes = document.getElementById("listClientes");

var clientesInStorage = localStorage.getItem("clientes");
clientesInStorage = clientesInStorage?clientesInStorage:"[]";

const CLIENTES = JSON.parse(clientesInStorage).map( cliente => clienteInStorageToInstance(cliente) );
tableClientes.appendChild(tableClientesBody);
CLIENTES.forEach( cliente => tableClientesBody.appendChild(crearFila(cliente)) );
CLIENTES.forEach( cliente => listClientes.appendChild(createElementWithTextContent('li',cliente.getNombreCompleto())) );


formCliente.addEventListener('submit', function(event){
    event.preventDefault();
    let nombre = inputNombre.value;
    let apellido = inputApellido.value;
    let dni = inputDni.value;
    let balance  = inputBalance.value;

    if (!noEstaVacio(nombre)) return;
    if (!noEstaVacio(apellido)) return;
    if (!esNumeroNatural(dni)) return;
    if (!esFloat(balance)) return;

    dni = parseInt(dni);
    balance = parseFloat(balance);
    let nuevoCliente = new Cliente(nombre,apellido,dni,balance);
    agregarElementoVisual(nuevoCliente);
    guardarCliente(nuevoCliente);
    formCliente.reset();
});

function noEstaVacio( campo ) {
    if (campo && campo.length > 0) {
        return true;
    } else {
        return false;
    }
}

function esNumeroNatural ( campo ) {
    if ( noEstaVacio(campo) ) {
        let regex = /^\d+$/g;
        return regex.test(campo);
    }
    return false;
}
function esFloat ( campo ) {
    if ( noEstaVacio(campo) ) {
        let regex = /^\d*(\.|\,)?\d*$/g;
        return regex.test(campo);
    }
    return false;
}


function agregarElementoVisual(nuevoCliente) {
    tableClientesBody.appendChild(crearFila(nuevoCliente));
    listClientes.appendChild(createElementWithTextContent('li',nuevoCliente.getNombreCompleto()));
}

function guardarCliente(nuevoCliente) {
    CLIENTES.push(nuevoCliente);
    localStorage.setItem("clientes",JSON.stringify(CLIENTES));
}

function crearFila(cliente){
    const CELDA = 'td';
    let fila = document.createElement('tr');
    let celdaNombre = createElementWithTextContent(CELDA,cliente.getNombre());
    let celdaApellido = createElementWithTextContent(CELDA,cliente.getApellido());
    let celdaDNI = createElementWithTextContent(CELDA,cliente.getDNI());
    let celdaBalance = createElementWithTextContent(CELDA,cliente.getBalance());
    fila.appendChild(celdaNombre);
    fila.appendChild(celdaApellido);
    fila.appendChild(celdaDNI);
    fila.appendChild(celdaBalance);
    return fila;
}
function createElementWithTextContent(element, textContent) {
    let newDOMelement = document.createElement(element);
    let newContent = document.createTextNode(textContent);
    newDOMelement.appendChild(newContent);
    return newDOMelement;
}
function clienteInStorageToInstance ( object ) {
    let nombre = object._nombre;
    let apellido = object._apellido;
    let dni = object._dni;
    let balance  = object._balance;
    let cliente = new Cliente(nombre,apellido,dni,balance);
    return cliente;
}
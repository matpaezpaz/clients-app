const formCliente = document.getElementById("formCliente");

const inputNombre = document.getElementById("nombre");
const inputApellido = document.getElementById("apellido");
const inputDni = document.getElementById("dni");
const inputBalance = document.getElementById("balance");

const tableClientes = document.getElementById("tableClientes");
const tableClientesBody = document.createElement('tbody');
tableClientes.appendChild(tableClientesBody);


formCliente.addEventListener('submit', function(event){
    event.preventDefault();
    let nombre = inputNombre.value;
    let apellido = inputApellido.value;
    let dni = inputDni.value;
    let balance  = inputBalance.value;
    let nuevoCliente = new Cliente(nombre,apellido,dni,balance);
    tableClientesBody.appendChild(crearFila(nuevoCliente));
});

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
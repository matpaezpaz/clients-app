const formCliente = document.getElementById("formCliente");

const inputNombre = document.getElementById("nombre");
const inputApellido = document.getElementById("apellido");
const inputDni = document.getElementById("dni");
const inputBalance = document.getElementById("balance");

const tableClientes = document.getElementById("tableClientes");
const tableClientesBody = document.createElement('tbody');

const listClientes = document.getElementById("listClientes");

const persistencia = new Persistencia("clientes");

const CLIENTES = persistencia.obtenerClientes();
function cargarClientes() {
    tableClientes.appendChild(tableClientesBody);
    CLIENTES.forEach( cliente => tableClientesBody.appendChild(crearFila(cliente)) );
    CLIENTES.forEach( cliente => listClientes.appendChild(createElementWithTextContent('li',cliente.getNombreCompleto())) );
}
cargarClientes();

formCliente.addEventListener('submit', handleSubmit);

inputNombre.addEventListener('keydown', handleChangeText);
inputNombre.addEventListener('error', handleChangeText);

function handleChangeText(event) {
    if ( !noEstaVacio(this.value) ) {
        this.classList.add('text-error');
    } else {
        this.classList.remove('text-error');
    }
}

function handleSubmit(event){
    event.preventDefault();
    let nombre = inputNombre.value;
    let apellido = inputApellido.value;
    let dni = inputDni.value;
    let balance  = inputBalance.value;
    let inputs = [inputNombre,inputApellido,inputDni,inputBalance];
    inputs.forEach ( input => input.classList.remove("text-error") );
    let errorFlag = false;
    if (!noEstaVacio(nombre)) {
        inputNombre.className = "text-error";
        errorFlag = true;
    };
    if (!noEstaVacio(apellido)) {
        inputApellido.className = "text-error";
        errorFlag = true;
    }
    if (!esNumeroNatural(dni)) {
        inputDni.className = "text-error";
        errorFlag = true;
    }
    if (!esFloat(balance)) {
        inputBalance.className = "text-error";
        errorFlag = true;
    }
    if( errorFlag ) return;

    dni = parseInt(dni);
    balance = parseFloat(balance);
    let nuevoCliente = new Cliente(nombre,apellido,dni,balance);
    agregarElementoVisual(nuevoCliente);
    persistencia.guardarCliente(nuevoCliente);
    formCliente.reset();
}

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
        let regex = /^\-?\d*(\.|\,)?\d*$/g;
        return regex.test(campo);
    }
    return false;
}


function agregarElementoVisual(nuevoCliente) {
    tableClientesBody.appendChild(crearFila(nuevoCliente));
    listClientes.appendChild(createElementWithTextContent('li',nuevoCliente.getNombreCompleto()));
}
function crearFila(cliente){
    const CELDA = 'td';
    let fila = document.createElement('tr');
    let celdaNombre = createElementWithTextContent(CELDA,cliente.getNombre());
    let celdaApellido = createElementWithTextContent(CELDA,cliente.getApellido());
    let celdaDNI = createElementWithTextContent(CELDA,cliente.getDNI());
    let celdaBalance = createElementWithTextContent(CELDA,cliente.getBalance());

    if ( cliente.getBalance() > 0 ) {
        celdaBalance.classList.add('positive-balance');
    } else {
        celdaBalance.classList.add('negative-balance');
    }

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
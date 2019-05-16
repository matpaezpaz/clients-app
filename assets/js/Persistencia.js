class Persistencia {
    constructor(key){
        this._key = key;
    }
    _InstanciarCliente ( object ) {
        let {_nombre:nombre,_apellido:apellido,_dni:dni,_balance:balance} = object;
        let cliente = new Cliente(nombre,apellido,dni,balance);
        return cliente;
    }
    obtenerClientes(){
        let clientesEnStorage;
        try {
            clientesEnStorage = localStorage.getItem(this._key);
        } catch (exception) {
            return [];
        }
        clientesEnStorage = (clientesEnStorage)?clientesEnStorage:"";
        let clientes;
        try {
            clientes = JSON.parse(clientesEnStorage).map( cliente => this._InstanciarCliente(cliente) );
        } catch (exception) {
            return [];
        }
        return clientes;
    }
    guardarCliente(cliente){
        const clientes = this.obtenerClientes().concat(cliente);
        localStorage.setItem(this._key, JSON.stringify(clientes));
    }
}
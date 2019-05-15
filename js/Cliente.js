class Cliente {
    constructor(nombre, apellido, dni, balance) {
        this._nombre = nombre;
        this._apellido = apellido;
        this._dni = dni;
        this._balance = balance;
    }
    getNombre(){
        return this._nombre;
    }
    getApellido(){
        return this._apellido;
    }
    getDNI(){
        return this._dni;
    }
    getBalance(){
        return this._balance;
    }
    getNombreCompleto(){
        return `${this._apellido}, ${this._nombre}`;
    }
}
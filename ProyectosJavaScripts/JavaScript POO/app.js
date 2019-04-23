// Object Literal --> Esquema de declaración de un Objeto de Tipo "Object Literal"

// let nombre = 'Andrés';
// let saldo = 200

// const cliente = {
//     nombre: nombre,
//     saldo: saldo,
//     tipoCliente: function uno() {
//         let tipo;

//         if (this. saldo > 1000) { //--> Con el This puedo acceder a las otras variables fuera de la función
//             tipo ='Gold';
//         }else if (this.saldo > 5000) {
//             tipo = 'Platino';
//         }else {
//             tipo = 'Normal';
//         };
//         return tipo;
//     }

// }

// console.log(cliente);



/* ---------------------------------------------------------------------- */

//METODO ALTERNATIVO [POO]

function Cliente(nombre, saldo) {
    this.nombre = nombre;
    this.saldo = saldo;
    this.tipoCliente = function() {
        let tipo;

         if (this.saldo > 1000) { //--> Con el This puedo acceder a las otras variables fuera de la función
             tipo ='Gold';
         }else if (this.saldo > 5000) {
             tipo = 'Platino';
         }else {
             tipo = 'Normal';
         };
         return tipo;
    };
};

const Cliente1 = new Cliente('Andrés', 200);
console.log(Cliente1.nombre);
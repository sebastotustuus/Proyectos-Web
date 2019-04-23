/*--------->VARIABLES GLOBALES<------------ */

const presupuestoUsusario = prompt('¿Cual es tu Presupuesto Semanal?');
const formulario = document.querySelector('#agregar-gasto')
let cantidadPresupuesto;


/*--------->CLASES<------------ */

//Clase Presupuesto

class Presupuesto {
    constructor(presupuesto){
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
    }

    //Método para ir Restando de Presupuesot Actual
    presupuestoRestante (cantidad = 0){
        return this.restante -= Number(cantidad);
    }
}

//Clase para la Interfaz: Maneja todo lo Relacionado con el DOM HTML
class Interfaz {
    insertarPresupuesto(cantidad){
        //console.log(cantidad); --> Imprime el Presupuesto de la Clase Presupuesto
        const presupuestoSpan = document.querySelector('span#total');
        const restanteSpan = document.querySelector('span#restante');

        //Intertar al DOM 
        presupuestoSpan.innerHTML = `${cantidad}`;
        restanteSpan.innerHTML = `${cantidad}`;
    }

    imprimirMensaje(mensaje, tipo){
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert');
        if (tipo === 'error') {
           divMensaje.classList.add('alert-danger');
        }else {
            divMensaje.classList.add('alert-success');
        }

        divMensaje.appendChild(document.createTextNode(mensaje));
        //Insertar en el DOM
        document.querySelector('.primario').insertBefore(divMensaje, formulario);
        //Quitar el Alert después de 3seg
        setTimeout(function(){
            document.querySelector('.primario .alert').remove();
        }, 3000);
    }

    //Inserta los Gastos a la Lista
    gastosEnListado(nombreGasto, cantidadGastos){
        const gastosListado = document.querySelector('#gastos ul');;
        //Crear li
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-center';
        //Insetar Garto
        li.innerHTML = `
            ${nombreGasto}
            <span class="badge badge-primary badge-pill"> $ ${cantidadGastos}</span>
        `;

        //Insetar al HTML
        gastosListado.appendChild(li);
    }

    //Comprueba el Resultado Restando
    presupuestoRestante(cantidad){
        const restante = document.getElementById('restante');
        //Leemos el Presupuesto Restante
        const presupuestoRestanteUser = cantidadPresupuesto.presupuestoRestante(cantidad)
        restante.innerHTML = `${presupuestoRestanteUser}`
        this.cambioDeColor();
    }

    //Cambia de Color según lo Restante
    cambioDeColor(){
        const presupuestoTotal = cantidadPresupuesto.presupuesto;
        const presupuestoRestante = cantidadPresupuesto.restante;

        //COmprobar el 25% de
        if ((presupuestoTotal / 4) > presupuestoRestante) {
            const restante = document.querySelector('.restante');
            restante.classList.remove('alert-success', 'alert-warning');
            restante.classList.add('alert-danger');

        }else if ((presupuestoTotal / 2) > presupuestoRestante){
            const restante = document.querySelector('.restante');
            restante.classList.remove('alert-success');
            restante.classList.add('alert-warning');

        }
    }

}


/*--------->EVENT LISTENERS<------------ */
document.addEventListener('DOMContentLoaded', function(){
    if (presupuestoUsusario === null || presupuestoUsusario === '') {
        window.location.reload();
    }else {
        //Instanciamos el Presupuesto
            //console.log('Agregado Correctamente');
            //console.log(typeof(presupuestoUsusario)); --> El Prompt devuelve el número pero en String
        cantidadPresupuesto = new Presupuesto(presupuestoUsusario);
        //Instancias la Clase de Interfaz
        const datosInterfaz = new Interfaz();
        datosInterfaz.insertarPresupuesto(cantidadPresupuesto.presupuesto);
    }
});

formulario.addEventListener('submit', function(e) {
    e.preventDefault();
        //console.log('Enviado');
    //Leer del Formulario de gastos
    const gastos = document.querySelector('#gasto').value;
    const cantidadGasto = document.querySelector('#cantidad').value;

    //Instancias la Interfaz
    const datosInterfaz = new Interfaz();

    //Comprobar que los campos no estén vacios
    if (gastos === '' || cantidadGasto === '') {
        //console.log('Hubo un Error');

        //Dos parametros: Mensaje y Tipo de Error
        datosInterfaz.imprimirMensaje('Hubo un Error', 'error');
    }else {
        //console.log('El gasto se agregó');

        //Insertar en el HTML
        datosInterfaz.imprimirMensaje('Añadido', 'correcto');
        datosInterfaz.gastosEnListado(gastos, cantidadGasto);
        datosInterfaz.presupuestoRestante(cantidadGasto);
    }
});


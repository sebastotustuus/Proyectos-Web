//Instancia de Clases
const api = new API('c2ab66fb647a5c413ad8e02f83edaabde5bd2c215d33e5f99bf207ac991fb1d0');
const ui =  new Interfaz();




//VARIABLES

const formulario = document.querySelector('#formulario');



//EVENTS LISTENERS

formulario.addEventListener('submit', (e) => {
   e.preventDefault();
   
   //Leer la Moneda Seleccionada
   const monedaSelect = document.querySelector('#moneda');
   const monedaSeleccionada = monedaSelect.options[monedaSelect.selectedIndex].value;

   //Leer la CriptoMoneda Seleccionada
   const criptoMonedaSelect = document.querySelector('#criptomoneda');
   const criptoMonedaSeleccionada = criptoMonedaSelect.options[criptoMonedaSelect.selectedIndex].value;

   //Comprobar que Ambos Campos estés Seleccionadas

   if (monedaSeleccionada === '' || criptoMonedaSeleccionada === '') {
        //Arrojar una Alerta de Error
        ui.mostrarMensaje('AMBOS CAMPOS SON OBLIGATORIOS', 'alert bg-danger text-center');

   }else {
       //Consultar la API
       api.obtenerValores(monedaSeleccionada, criptoMonedaSeleccionada)
         .then(data =>{
             ui.mostrarResultado(data.resultado.RAW, monedaSeleccionada, criptoMonedaSeleccionada)
      })
   }
});
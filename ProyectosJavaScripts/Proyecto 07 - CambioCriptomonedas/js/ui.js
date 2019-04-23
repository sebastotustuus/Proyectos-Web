class Interfaz{

    constructor(){
        this.init();
    }

    init(){
        this.construirOpcionesApi();
    }

    //1.
    construirOpcionesApi() {
        api.obtenerMonedasApi()
            .then(monedas => {
                //Crear un Select de Opciones
                const select = document.querySelector('#criptomoneda');
                //Iteramos los Valores 
                for( const [key, value] of Object.entries(monedas.monedas.Data)){

                    //Añadir el Symbol y el nombre como opciones
                    const option = document.createElement('option');
                    option.value = value.Symbol;
                    option.appendChild(document.createTextNode(value.CoinName));
                    select.appendChild(option);
                }
        })
    }

    //2.
    mostrarMensaje(mensaje, clases){
        //Crear el Elemento Div y su TextNode
        const div = document.createElement('div');
        div.className = clases;
        div.appendChild(document.createTextNode(mensaje));

        //Seleccionar Mensajes
        const divMensaje = document.querySelector('.mensajes');
        divMensaje.appendChild(div);

        //Eliminar Mensaje después de un Tiempo
        setTimeout(() => {
            document.querySelector('.mensajes div').remove();
        }, 3000);
    }

    //Imprime el Resultado de la Cotización

    mostrarResultado(resultado, moneda, crypto){

        //En caso de un resultado anterior se Oculta
        const resultadoAnterior = document.querySelector('#resultado > div')

        if (resultadoAnterior) {
            resultadoAnterior.remove();
        }

        const datosMonedas = resultado[crypto][moneda];

        //Recortar digitos de Precio
            let precios = datosMonedas.PRICE.toFixed(2);
            let porcentaje = datosMonedas.CHANGEPCTDAY.toFixed(2),
                actualizado = new Date(datosMonedas.LASTUPDATE * 1000).toLocaleDateString('es-COL');

        //Construir el Template
            let TemplateHtml = `
                <div class="card bg-warning">
                    <div class="card-body text-light">
                        <h2 class="card-title">Resultado:</h2>
                        <p>El precio de ${datosMonedas.FROMSYMBOL} a moneda ${datosMonedas.TOSYMBOL} es de: $ ${precios}<p>
                        <p>Variacion del Último día: ${porcentaje}% </p>
                        <p>Última actualización: ${actualizado} </p>
                    </div>                
                </div>
            `;

            this.mostrarSpinner('block');
        //Insertar el Resultado
        setTimeout(() => {
            //Se inserta el Resultado
            document.querySelector('#resultado').innerHTML = TemplateHtml;

            //Se oculta el spinner
            this.mostrarSpinner('none');
        }, 3000);
        
    }

    //Mostrar SPinner de Carga al Enviar la Cotización
    mostrarSpinner(vista) {
        const spinner = document.querySelector('.contenido-spinner')
        spinner.style.display = vista;
    }
}
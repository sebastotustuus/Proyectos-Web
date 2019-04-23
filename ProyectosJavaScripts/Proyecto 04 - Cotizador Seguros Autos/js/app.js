/*
    POR:
    Sebastian Vallejo Rojas
    350 57931 34
    Proyecto de Aprendizaje
    Derechos Reservados

    -->PROYECTO DE COTIZACIÓN DE SEGUROS CON EL PARADIGMA DE PROTOTYPES<--

*/


/*------------------>VARIABLES<--------------------- */

const formulario = document.getElementById('cotizar-seguro');

/*----------------------------------------------*/


/* COTIZADOR CONSTRUCTOR */ //-->Por Prototypes

function Seguros(marca, anho, tipoSeguro){ //--> Calcula los seguros
    this.marca = marca;
    this.anho = anho;
    this.tipo = tipoSeguro;

};

Seguros.prototype.cotizarSeguro = function(info){
    /*
        1 = Americano - Valor: 1.15
        2 = Asiatico - Valor: 1.05
        3 = Europeo - Valor 1.35
    */
    let cantidad;
    const base = 2000;

    switch (this.marca) {
        case '1':
            cantidad = base * 1.15;
            break;

        case '2':
            cantidad = base * 1.05;
            break;
        
        case '3':
            cantidad = base * 1.35;
            break;
    }

    //Leer el Año

    const diferencia = new Date().getFullYear() - this.anho;
    //Cada año de Diferencia hay que reducir en 3% el valor del Seguro
    cantidad -= ((diferencia*3)*cantidad) / 100;
    //console.log(cantidad);
    /* 
        Si el seguro es Básico se multiplica por 30% más
        Si el Seguro es Completo se multiplica por 50% más
    */

    if (this.tipo === 'basico') {
        cantidad *= 1.30;
    }else{
        cantidad *= 1.50;
    }

   // console.log(cantidad);

   return cantidad;

}

//Todo lo que se muestra en la Interfaz
function Interfaz(){

}

//Mensaje que se Imprime en el HTML
Interfaz.prototype.mostrarError = function(mensaje, tipo) {
    const div = document.createElement('div');

    if (tipo === 'error') {
        div.classList.add('mensaje', 'error');
    }else {
        div.classList.add('mensaje', 'correcto');
    }

    div.innerHTML = `${mensaje}`;
    formulario.insertBefore(div, document.querySelector('.form-group')); //-->Inserta el Elemento con dos parametros.. EL rpimero es el elemento que quiero insertar, y els egundo es ANTES de que elemento lo quiero insertar

    setTimeout(function(){
        document.querySelector('.mensaje').remove();

        
    }, 3000);

}

Interfaz.prototype.mostrarResultado = function(seguro, total){
    const resultado = document.getElementById('resultado');
    let marca;

    if (seguro.marca === '1') {
        marca = 'Americano';
    }else if (seguro.marca === '2') {
        marca = 'Asiático';
    }else {
        marca = 'Europeo';
    }

    //Crear un Div
    const div = document.createElement('div');
    div.innerHTML = `
            <p class = "header">Tu Resumen:</p>
            <p>Marca: ${marca}</p>
            <p>Año: ${seguro.anho}</p>
            <p>Tipo: ${seguro.tipo}</p>
            <p>Total de la Cotizacion: $ ${total}</p>
    `;

    const spinner = document.querySelector('#cargando img');
    spinner.style.display = 'block';

    setTimeout(function(){
        spinner.style.display = 'none';
        resultado.appendChild(div);
    }, 3000);  

}


/*------------->EVENT LISTENER<-----------------*/


formulario.addEventListener('submit', function (e) {
    e.preventDefault();
        //console.log('Presionado');
    
        //Leer la Marca Seleccionada en la Sección MArcas
        const marca = document.getElementById('marca');
        const marcaSeleccionada = marca.options[marca.selectedIndex].value //-->Devuelve el Value de las optiones de las Marcas
        //console.log(marcaSeleccionada);


        //Leer el Año Seleccionado
        const anho = document.getElementById('anio');
        const anhoSeleccionado = anho.options[anho.selectedIndex].value; //Obtiene el valor de una Lista de Opciones. En este caso de los Años, a partir de los Value
        //console.log(anhoSeleccionado)

        //Leer Plan de Seguros Seleccionado
        const tipo = document.querySelector('input[name="tipo"]:checked').value; //-->Obtiene el Valor de un Radius Button. 

        //Crea Instancia de interfaz
        const interfaz = new Interfaz();

        //Revisar que los Campos no estèn vacios
        if(marcaSeleccionada === '' || anhoSeleccionado === '' || tipo === ''){
            //interfaz que imrprime un Error
            //console.log('Faltan Datos');
            interfaz.mostrarError('Faltan Datos, revisa el formularios e Intenta de Nuevo', 'error')
        }else {
            //Interfaz que imprime Aprobado
            //console.log('Los campos están Llenos');

            //Limpiar Resultados Anteriores en Caso de Haberlos
            const resultadosEliminar = document.querySelector('#resultado div');
                if (resultadosEliminar != null) {
                        resultadosEliminar.remove();
                }

            const seguro = new Seguros(marcaSeleccionada, anhoSeleccionado, tipo);
                    //console.log(seguro);
            //Cotizar el seguro
            const cantidad = seguro.cotizarSeguro(seguro);
            //Mostrar el Resultado
            interfaz.mostrarResultado(seguro, cantidad)
            //Mostrar Mensaje Proceso Exitoso
            interfaz.mostrarError('Cotizando los Parametros...', 'correcto')
        }

});


/*----------------------------------------------*/




// Options para los Años de los Seguros 
const max = new Date().getFullYear(), //--> Imprime el Año Actual: 2019
      min = max - 20; //--> Imprime el Año actual menos 20: 1999

const selecAnhos = document.getElementById('anio');
      for (let i = max; i >= min; i--){
          let option = document.createElement('option');
          option.value = i;
          option.innerHTML = i;
          selecAnhos.appendChild(option);
      }
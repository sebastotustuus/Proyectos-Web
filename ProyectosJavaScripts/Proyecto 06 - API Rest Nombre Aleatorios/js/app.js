/* 
    [IMPORTANTE]
    NOTA: El signo & concatena los distintos tipos de requisitos de Variables que podamos necesitar!! 
*/

/*------------------>VARIABLES<------------------*/
const formulario = document.querySelector('#generar-nombre');





/*------------------>CLASES<------------------*/







/*------------------>EVENT LISTENERS<------------------*/
formulario.addEventListener('submit', function(e){
    //Cargar Nombres
    //llamado Ajax e imprimir Resultados

    e.preventDefault();
    
    //Leer las Variables

    //Se lee el Pais de Origen
    const NombreOrigen = document.getElementById('origen'); 
    const origenSeleccionado = NombreOrigen.options[NombreOrigen.selectedIndex].value;
    //Se lee el género deseado
    const genero = document.getElementById('genero'); 
    const generoSeleccionado = genero.options[genero.selectedIndex].value;
    //Se lee cantidad de nombres a imprimir
    const cantidad = document.getElementById('numero').value;
    


    let url = '';
    url += 'https://uinames.com/api/?'; //-->Construyendo la URL

    //si hay Origen agregarlo a la URL
    if (origenSeleccionado !== '') {
            url += `region=${origenSeleccionado}&`;
    }
    //Si hay un géreno agregarlo a la URL
    if (generoSeleccionado !== '') {
        url += `gender=${generoSeleccionado}&`;
    }
    //Si hay una Cantidad se Agrega a la URL
    if (cantidad !== '') {
        url += `amount=${cantidad}&`;
    }
    
    //iniciar XMLHTTPRequest
    const xhr = new XMLHttpRequest();

    //Abrimos la Conexión
    xhr.open('GET', url, true);

    //Datos de Impresión del Template
    xhr.onload = function(){
        if(this.status === 200){
            const nombres = JSON.parse(this.responseText);

            //General el HTML
            let htmlNombres = '<h2>Nombres Generados</h2>';
            htmlNombres += '<ul class="lista">';

            //Imprimir cada Nombre
            nombres.forEach(function(nombre){
                htmlNombres += `
                    <li>${nombre.name};
                
                `;
            })

            htmlNombres += '</ul>';
            document.getElementById('resultado').innerHTML = htmlNombres;
        }
    }
    xhr.send();
});
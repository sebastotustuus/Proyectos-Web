/*------------->VARIABLES GLOBALES<--------------*/
const email = document.getElementById('email');
const asunto = document.getElementById('asunto');
const mensjae = document.getElementById('mensaje');
const BotonEnviar = document.getElementById('enviar');
const formularioEnvio = document.getElementById('enviar-mail');
const resetBoton = document.getElementById('resetBtn');



/*------------->EVENT LISTENERS<--------------*/
function EventListeners(){
    //Inicio de la Aplicación y Deshabilitar "Enviar"
    document.addEventListener('DOMContentLoaded', inicioApp);

    //Campos del Formulario
    email.addEventListener('blur', validarCampo);
    asunto.addEventListener('blur', validarCampo);
    mensaje.addEventListener('blur', validarCampo);

    //Botón Enviar en el Submit
    BotonEnviar.addEventListener('click', enviarEmail);

    // Boton de Reset
    resetBoton.addEventListener('click', resetFormulario);

};

EventListeners();


/*------------->FUNCIONES<--------------*/

function inicioApp(){
    //deshabilitar el botón Enviar
    BotonEnviar.disabled = true;
}


//Valida que el Campo tenga información
function validarCampo() {
    //console.log('Dentro del INPUT');

    //Se valida la longitud del Texto y que no esté vacío
    validarLongitud(this);

    //Validar unicamente el Email
        //console.log(this.type);
    
        if (this.type === 'email') {
            validarEmail(this);
        }

    let errores = document.querySelectorAll('.Error');

    if(email.value !== '' && asunto.value !== '' && mensaje.value !== ''){
        if (errores.length === 0) {
            BotonEnviar.disabled = false;
         };
     };        
};   



//Cuando se Envía el Correo
    function enviarEmail(e){
        e.preventDefault();
        //console.log('Email Enviado'); --> Confirma el evento click en el botón
        //Spinner Aparece Cuando se presiona el Botñon
        const spinnerGif = document.querySelector('#spinner')
        spinnerGif.style.display = 'block';

        //Gif que envìa Email
        const enviado = document.createElement('img');
        enviado.src = 'img/mail.gif'
        enviado.style.display = 'block';

        //Ocultar Spinner y mostrar Gif de Enviado
        setTimeout(function(){
            spinnerGif.style.display = 'none';

            document.querySelector('#loaders').appendChild(enviado);
                setTimeout(function(){
                    enviado.remove();
                    formularioEnvio.reset();
                    inicioApp();
                }, 5000)
            
        }, 3000) //-->El tiempo se mide en milisegundos 1000ms = 1seg
    };


    //Resetear Formulario

    function resetFormulario(e){
        e.preventDefault();
        formularioEnvio.reset();
        inicioApp();
    };



//Verifica la Longitud del texto en los campos
function validarLongitud(campo) {
    //console.log(campo);
    if (campo.value.length > 0) {
        campo.style.borderBottomColor = 'green';
        campo.classList.remove('Error');
    }else {
        campo.style.borderBottomColor = 'Red';
        campo.classList.add('Error');
    };
}

function validarEmail(campoEmail){
    const mensaje = campoEmail.value;
    if (mensaje.indexOf('@') !== -1) {
        campoEmail.style.borderBottomColor = 'green';
        campoEmail.classList.remove('Error');
    }else{
        campoEmail.style.borderBottomColor = 'Red';
        campoEmail.classList.add('Error');
    }
}


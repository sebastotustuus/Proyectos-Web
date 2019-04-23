

/* -------> VARIABLES <---------- */

const listaTweets = document.getElementById('lista-tweets'); //--> Valiable que Obtiene el ID del Espacion donde van a ser Escritos los Tweets pasados por el Area de Texto
//const borrar_listaTweet;

const BorrarListas = document.getElementById('Boton_Borrar');
//console.log(BorrarListas.previousElementSibling);



/* -------> EVENT LISTENERS <---------- */


function eventListerner(){
    //Cuando se envia el Formulario
    document.querySelector('#formulario').addEventListener('submit', agregarTweet);


    //Borrar Tweets
    listaTweets.addEventListener('click', borrarTweet);

    //Contenido Cargado del Local Storage
    document.addEventListener('DOMContentLoaded', localStorageListo); //--> Lee la información cargada en el Local Storage   

    BorrarListas.addEventListener('click', BorrarListasCompletas);
   
};
eventListerner();



/* -------> FUNCIONES <---------- */

//Agragar Tweet del Formulario
    function agregarTweet(e){
        e.preventDefault();
            //console.log('Formulario Enviado');

        //Leer el Valor del Area del Texto
        const tweet = document.getElementById('tweet').value;
        //console.log(tweet);

        //Condición que evalua si el TextArea está Vacio o no
        if (tweet == "") {
            alert('Escriba un Elemento Válido');
        }else {
            
            if (tweet == document.getElementById('tweet').value) {
                document.getElementById('tweet').value="";
            };

        //Crear Botón de Eliminar
        const botonBorrar = document.createElement('a');
        botonBorrar.classList = 'borrar-tweet';
        botonBorrar.innerText = 'X';

        //Crear Elemento y Añadirlo a una Lista
        const li = document.createElement('li'); //--> Crea la Lista
        li.innerText = tweet; //--> Iguala lo Escrito en el Area del Texto al Espacio del li
        li.appendChild(botonBorrar); //--> Agrega el sólo Botón Borrar
        listaTweets.appendChild(li); //--> Agrega al DOM la lista con su información

        //Funcion Añadir al Local Storage
        tweetLocalStorage(tweet);

        };           

    }

    function borrarTweet(e){
        e.preventDefault();
        if (e.target.className === 'borrar-tweet') {
            //Variable Para confirmacion de Borrado
            let confirmacion = confirm('Desea Borrar la tarea?');
                if (confirmacion === true) {
                        e.target.parentElement.remove();
                        borrarTweetLocalStorage(e.target.parentElement.textContent);
                    // console.log(e.target.parentElement.textContent);
                    } //-->Proceso que Elimina el Tweet
                // console.log(confirm('Has Borrado la Tarea'));
        } 

        // else {console.log('Diste CLick en otra parte');}
        // console.log('Diste Click en la Lista');
    };


    function tweetLocalStorage(tweet){
        let tweets;
        tweets = getTweetsLocalStorage();
        //Añadir El nuevo Tweet
        tweets.push(tweet);
        //Convertir de String a Arreglo para Local Storage
        localStorage.setItem('tweets', JSON.stringify(tweets));
    };

    // Función que comprueba que exista Elementos en Local Storage --> Retorna un Arreglo
    function getTweetsLocalStorage(){
        let tweets;
        //SE revisa los Valores del Local Storage
        if (localStorage.getItem('tweets') === null) {
            tweets = [];
        } else {
            tweets = JSON.parse(localStorage.getItem('tweets'));
        }
        return tweets;
    };

    // Mostrar Datos del Local Storage en la Lista

    function localStorageListo(){
        let tweets;

        tweets = getTweetsLocalStorage();
        tweets.forEach(function(tweet){
            
        //Crear Botón de Eliminar
        const botonBorrar = document.createElement('a');
        botonBorrar.classList = 'borrar-tweet';
        botonBorrar.innerText = 'X';

        //Crear Elemento y Añadirlo a una Lista
        const li = document.createElement('li'); //--> Crea la Lista
        li.innerText = tweet; //--> Iguala lo Escrito en el Area del Texto al Espacio del li
        li.appendChild(botonBorrar); //--> Agrega el sólo Botón Borrar
        listaTweets.appendChild(li); //--> Agrega al DOM la lista con su información
        });
    }

    // Se borra Elementos del Arreglo. No se usa localstorage.remove porque, no queremos borrar el key, solamente algunos valores dentro del key. Es decir borrar elementos del Arreglo.
    function borrarTweetLocalStorage(tweet){
        
        let tweets, tweetBorrar;
        //Elimina la X del Tweet
        tweetBorrar = tweet.substring(0, tweet.length - 1);

        tweets = getTweetsLocalStorage();
        tweets.forEach(function (tweet, index){
            if(tweetBorrar === tweet){
                tweets.splice(index, 1);
            };

        });
        console.log(tweets);
        localStorage.setItem('tweets', JSON.stringify(tweets));
       
    };


    function BorrarListasCompletas(e) {
        // let borraddoListas = BorrarListas.previousElementSibling.remove();
        // console.log(borraddoListas);

        let borradoListas = e.target;
        console.log(borradoListas);
        e.preventDefault();

        if (borradoListas.className === 'boton_Borrar') {
            BorrarListaTweetsLocalStorage(e.target.previousElementSibling.textContent);
               e.target.previousElementSibling.remove();             
        };

    };

    function BorrarListaTweetsLocalStorage(tweet){
        //console.log(tweetLista);
        console.log(tweet);

        let tweets, tweetBorrar;
        //Elimina la X del Tweet
        tweetBorrar = tweet.substring(0, tweet.length);
        console.log(tweetBorrar);

        tweets = getTweetsLocalStorage();
        tweets.forEach(function (tweet){
            if(tweetBorrar === tweet){
                tweets.splice(0, tweets.length);
            }else {
                console.log('No son Iguales');
            };
        });
        console.log(tweets);
        localStorage.setItem('tweets', JSON.stringify(tweets));
    };
    
    
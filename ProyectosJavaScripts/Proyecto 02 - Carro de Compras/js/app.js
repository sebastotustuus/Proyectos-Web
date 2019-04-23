// LS = Local Storage

/* ----->VARIABLES GLOBALES<-------- */

const carrito = document.getElementById('carrito');
const listaCursos = document.getElementById('lista-cursos');
const listaCursosSeleccionados = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.getElementById('vaciar-carrito');




/* ----->EVENT LISTENERS<-------- */

function EventListeners(){
    //Dispara cuando se presiona "Agregar Carrito"
    listaCursos.addEventListener('click', comprarCurso);
    //Cuando Se elimina un solo curso del Carrito
    carrito.addEventListener('click', EliminarCurso);
    //Vaciar Toda la información del Carrito de Compras
    vaciarCarrito.addEventListener('click', LimpiarCarrito);
    //Arl cargar la pagina, se muestra el Local Storage
    document.addEventListener('DOMContentLoaded', leerLocalStorage);
};

EventListeners();


/* ----->FUNCIONES<-------- */

//Función que añade el curso al Carrito
function comprarCurso(e){
    e.preventDefault();
    //Delegacion para Agregar al Carrito
    if(e.target.classList.contains('agregar-carrito')){
            // console.log('Sí!')
       const curso = e.target.parentElement.parentElement;
            //console.log(curso);

       //Enviamos el curso Seleccionado para tomar sus datos.

       

       leerDatosCurso(curso);
        
    };
};

//Funcion para Leer Datos del Curso
function leerDatosCurso(curso){
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id')
    }
   
        insertarAlCarrito(infoCurso); 
        //console.log(infoCurso);    
};


//Muestra el Curso Seleccionaro en el Carrito
function insertarAlCarrito(curso){
    const row = document.createElement('tr');
    
    row.innerHTML = `
        <td> 
            <img src="${curso.imagen}" width="150"> 
        </td>
        <td> 
            ${curso.titulo}
        </td>
        <td> 
            ${curso.precio}
        </td>
        <td> 
            <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
         </td>
    `;

    listaCursosSeleccionados.appendChild(row);
    guardarCursoLocalStorage(curso);

    };

    //Elimina el Curso del DOM - Carrito de Compras
    function EliminarCurso(e){
        e.preventDefault();
        //console.log(e.target.className); // --> Imprime La Clase .borrar-curso 
        let curso, cursoID;
        if (e.target.className === 'borrar-curso') {
                //console.log(e.target.parentElement.parentElement); --> Imprime el <tr>
                e.target.parentElement.parentElement.remove(); //-->Elimina El Elemento Seleccionado con la X
                curso = e.target.parentElement.parentElement;
                cursoID = curso.querySelector('a').getAttribute('data-id');
                  //  console.log(cursoID); ---> Imprime el ID del elemento seleccionado

        }  
        EliminarCursoLS(cursoID);
    };

    //Elimina la totalidad de los cursos del Carrito del DOM
    function LimpiarCarrito(e){
        e.preventDefault();
        //console.log(listaCursosSeleccionados.firstElementChild); --> Imprime el <tr> del primer curso que haya sido agregado
        while (listaCursosSeleccionados.firstElementChild) {
            listaCursosSeleccionados.firstElementChild.remove();
        };

        //Vaciar Local Storage
        vaciarLS();
    };

    //Almacena los cursos del Carrito al Local Storage
    function guardarCursoLocalStorage(curso){
        //console.log(curso); --> imprime en la consola la información de Curso Seleccionado
        let cursos;

        //Toma el valor de un arreglo con datos de LS o vacio
        cursos = obtenerCursosLocalStorage();
           // console.log(cursos); //--> Devuelve lo Comprobado por la funciòn obtenerCursosLocalStorage. Si no hay nada devuelve un Array vacio [].

        //El curso seleccionado se agrega al Arreglo
        cursos.push(curso);
        localStorage.setItem('cursos', JSON.stringify(cursos));

    };

    //Comprueba que haya elementos en Local Storage
    function obtenerCursosLocalStorage(){
        let cursosLS;

        //Comprobamos si hay algo en Local Storage
        if (localStorage.getItem('cursos') === null) {
            cursosLS = [];
        } else {
            cursosLS = JSON.parse(localStorage.getItem('cursos'));
        }

        return cursosLS;
    };

    //Iprime la información del Local Storage en el Carrito
    function leerLocalStorage(){
        let cursosLS;
        
        cursosLS = obtenerCursosLocalStorage();
         //console.log(cursosLS); --> Veriica la conexión entre las funciones. Debe de Imprimir los objetos que están en el Local Storage

         cursosLS.forEach(function(curso){
            //Construir el Template
            const row = document.createElement('tr');
                row.innerHTML = `
                <td> 
                    <img src="${curso.imagen}" width="150"> 
                </td>
                <td> 
                    ${curso.titulo}
                </td>
                <td> 
                    ${curso.precio}
                </td>
                <td> 
                    <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
                </td>
            `;
            listaCursosSeleccionados.appendChild(row);
        });
    };

    //Elimiar curso del Local Storage
    function EliminarCursoLS(cursoID){
       console.log(cursoID); //--> Imprime el ID de la función de donde viene invocada la actual funcion.

       let cursosLS;
       cursosLS = obtenerCursosLocalStorage(); //Revisamos el Local Storage

       cursosLS.forEach(function(curso, index){ //Iteramos comparando el Id del curso borrado con los del LS
            //console.log(curso.id); --> Imprime los ID de los cursos que están en el Local Storage
            if (curso.id === cursoID) {
                cursosLS.splice(index, 1)
            }
       });
       //console.log(cursosLS); --> Imprime el arreglo de objetos sin el objeto que se especificó eliminar
       localStorage.setItem('cursos', JSON.stringify(cursosLS)); //--> Añadimos el Arreglo Actual al LS
    };

    function vaciarLS(){
        localStorage.clear();
    }
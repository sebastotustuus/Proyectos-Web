document.getElementById('txtBtn').addEventListener('click', datos);



function datos(){
    const url = 'datos.txt'

    fetch(url)
        .then(function(res){
            return res.text();
        })

        .then(function(data){
            console.log(data);
            document.getElementById('resultado').innerHTML = `<li>${data}</li>`;
        })
        .catch(function(error){
            console.log(error);
        })
};


document.getElementById('jsonBtn').addEventListener('click', cargarJSON);

function cargarJSON(){
    const url = 'empleados.json';

    fetch(url)
        .then(function(res){
            //console.log(res.json());
            return res.json();
        })
        .then(function(data){
            console.log(data)
            let html = '';
            data.forEach(function(datas){
                html += `
                    <li>${datas.nombre}: ${datas.puesto}</li>
                `
                document.getElementById('resultado').innerHTML = html;
            })
        }).catch(function(error){
            console.log(error);
        })
};


document.getElementById('apiBTN').addEventListener('click', cargarAPI);

function cargarAPI(){
    const url = 'https://picsum.photos/list';

    fetch(url)
        .then(function(res){
           return res.json();
        })
        .then(function(data){
            console.log(data);
            let html = '';
            data.forEach(function(datas){
                html += `
                <li>${datas.author}: 
                    <a target="_blank"href="${datas.post_url}">Ver Imagen</a>
                </li>`;
            })
            document.getElementById('resultado').innerHTML = html;
        })
}
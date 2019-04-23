class API{
    constructor(apikey){
        this.apikey = apikey;
    }

    //Obtener todas las monedas

    async obtenerMonedasApi(){
        const url = `https://min-api.cryptocompare.com/data/all/coinlist?api_key=${this.apikey}`;

        //Fetch Api
        const urlObtenerMonedas = await fetch(url);

        //Respuesta JSON
        const monedas = await urlObtenerMonedas.json();
       
        return {
            monedas
        }
    }

    async obtenerValores(moneda, criptomoneda){
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}&api_key=${this.apikey}`;

        //Consultar REST API
        const urlConvertir = await  fetch(url);
        const resultado = await urlConvertir.json();
        return {
            resultado
        }
    }
}
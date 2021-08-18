const btnEnviar = document.getElementById('enviar');



//peticion al JSON
const sendHttpRequest = city => {
    let api = "http://api.openweathermap.org/data/2.5/weather?q=" ;
    let appid = "&appid=c6c79260044273a425dbb6bf36b4032b&units=metric";
    const url = api + city + appid;
    const promise = new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.responseType = 'json';
        xhr.onload = function() {
          resolve(xhr.response);
        };
        xhr.onerror = function() {
            reject(new Error('Ha ocurrido algún error.'))
        }
        xhr.send();
      
    });
    return promise;  

}
const getDataById = id => {
    return document.getElementById(id);
}

const getEstadoMeteorologico = icono => {
    const mapa = new Map();
    mapa.set('01d', 'Soleado');
    mapa.set('02d', 'Soleado con nublos');
    mapa.set('03d', 'Nublado');
    mapa.set('04d', 'Muy nublado');
    mapa.set('09d', 'Lluvia');
    mapa.set('10d', 'Lluvia');
    mapa.set('11d', 'Tormenta');
    mapa.set('13d', 'Nieve');
    mapa.set('50d', 'Niebla');
    document.getElementById('estado').textContent = mapa.get(icono)
};

const renderData = data => {
    const nombre = getDataById('nombre');
    const icono = document.querySelector('#icono img');
    const temperaturaActual = getDataById('temperatura-actual');
    const maxima = getDataById('maxima');
    const minima = getDataById('minima');
    const humedad = getDataById('humedad');

    //seteamos los valores...
    nombre.textContent = `${data.name}, ${data.sys.country}`;
    icono.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
    getEstadoMeteorologico(data.weather[0].icon);
    temperaturaActual.textContent = `Temperatura: ${data.main.temp .toFixed(1)} ºC`;

    maxima.textContent = `${data.main.temp_max .toFixed(1)} ºC`;
    minima.textContent = `${data.main.temp_min .toFixed(1)} ºC`;
    humedad.textContent = `${(data.main.humidity).toFixed(1)} %`;
}

const getTiempo = () => {
    const datos = document.getElementById('datos');
    datos.classList.remove('disabled');
    document.querySelector('.contenedor-principal h2').classList.remove('disabled');
    document.querySelector('.leyenda').classList.remove('disabled');
    const cityElement = document.getElementById('ciudad');
    const ciudad = cityElement.value;
    cityElement.value = "";
    sendHttpRequest(ciudad)
        .then((data) => {
            renderData(data);
        })
   

}















btnEnviar.addEventListener('click', getTiempo);
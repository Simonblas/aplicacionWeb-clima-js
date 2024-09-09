const urlBase = `https://api.openweathermap.org/data/2.5/weather` //es la url base de la api que utilizaremos
//https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key} esta es la url o endpoint para llamar a la api en postman, ademas, usaremos esta completa en el metodo fetch mediante una interpolacion con la url base
const API_KEY = '2419d5d6d07dc09643153ec6ecc2058f'; // es nuestra llave para utilizar la api
const diffKelvin = 273.15;/* la api nos dara los grados en formato kelvin, por eso utilizaremos este numero para pasarlo a formato celsius.*/

//le agrego un evento al searchButton
document.getElementById('searchButton').addEventListener('click', () => {
    const city = document.getElementById('cityInput').value //guardo en una constante el valor del cityinput del html
    if (city) { //si city es creada, es decir, tiene un valor
        fetchWeather(city)//llamar a la api que nos de la informacion del clima de esa ciudad recibida mediante la funcion creada:\
        fetchWeather(city)
    } else {
        alert('ingrese una ciudad válida')
    }
})

function fetchWeather(city) {//esta funcion llama a la api
    fetch(`${urlBase}?q=${city}&appid=${API_KEY}&lang=es`) //este llamado a la api devuelve una promesa
        .then(data => data.json()) //con un .then recibimos esa promesa devuelta y la transformamos en un objeto tipo json
        .then(data => showWeatherData(data) //con este .then recibimos el objeto json y lo mostramos por consola
        )
}

function showWeatherData(data) {
    const divResponseData = document.getElementById('responseData')
    divResponseData.innerHTML = ''

    const cityName = data.name;
    const countryName = data.sys.country;
    const temp = data.main.temp;
    const humidity = data.main.humidity;
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;

    const cityInfo = document.createElement('h2');
    cityInfo.textContent = `${cityName}, ${countryName}`

    const tempInfo = document.createElement('p');
    tempInfo.textContent = `La temperatura es: ${Math.floor(temp - diffKelvin)}°C`

    const humidityInfo = document.createElement('p')
    humidityInfo.textContent = `La humedad es: ${humidity}%`

    const iconInfo = document.createElement('img');
    iconInfo.src = `https://openweathermap.org/img/wn/${icon}@2x.png`

    const descriptionInfo = document.createElement('p')
    descriptionInfo.textContent = `La descripcion meteorológica es ${description}`

    divResponseData.appendChild(cityInfo)
    divResponseData.appendChild(tempInfo)
    divResponseData.appendChild(humidityInfo)
    divResponseData.appendChild(iconInfo)
    divResponseData.appendChild(descriptionInfo)
}



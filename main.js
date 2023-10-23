const API_KEY = "6cee49b1126370ca410507355c688231";

// Función para obtener datos climáticos
const fetchData = position => {
    const { latitude, longitude } = position.coords;
    fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
       setWeatherData(data);
       console.log(data);
    })
    .catch(error => {
        console.error("Error fetching data:", error);
    });
}



// Traducción de descripciones del tiempo
const weatherDescriptions = {
    "Clear": "Despejado",
    "Clouds": "Nublado",
    "Rain": "Lluvia",
    "Snow": "Nieve",
};

// Función para mostrar datos climáticos en la interfaz de usuario
const setWeatherData = (data, forecastForTomorrow) => {
    // Mostrar los datos del clima actual
    const weatherData = {
        location: data.name,
        description: translateDescription(data.weather[0].main),
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        temperature:`: ${Math.floor(data.main.temp)}°C`, // Agrega °C al final
        date: getDate(),
    }
    const currentWeatherDescription = data.weather[0].main;
    const container = document.getElementById('container');
    // Cambia el fondo del contenedor según el estado del clima
    switch (currentWeatherDescription) {
        case "Clouds":
            container.style.backgroundColor = "lightgray"; // Nublado (gris)
            break;
        case "Clear":
            container.style.backgroundColor = "blue"; // Despejado (azul)
            break;
        case "Snow":
            container.style.backgroundColor = "white"; // Nieve (blanco)
            break;
        case "Rain":
            container.style.backgroundColor = "darkgray"; // Lluvia (azul oscuro)
            break;
        default:
            container.style.backgroundColor = "lightgray"; // Otro estado del clima
    }

    Object.keys(weatherData).forEach(key => {
        setTextContent(key, weatherData[key]);
    });

    // Mostrar el pronóstico extendido (día de mañana)
    if (forecastForTomorrow) {
        const forecastElement = document.getElementById('forecast-list');
        const forecastListItem = document.createElement('li');
        forecastListItem.textContent = `Mañana: ${forecastForTomorrow.main.temp}°C, ${translateDescription(forecastForTomorrow.weather[0].main)}`;
        forecastElement.appendChild(forecastListItem);
    }

    cleanUp();
}







// Función para ocultar el indicador de carga
const cleanUp = () => {
    let container = document.getElementById('container');
    let loader = document.getElementById('loader');

    loader.style.display = 'none';
    container.style.display = 'flex';
}

// Función para obtener la fecha actual
const getDate = () => {
    let date = new Date();
    return `${date.getDate()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${date.getFullYear()}`;
}

// Función para establecer el contenido de un elemento
const setTextContent = (element, text) => {
    document.getElementById(element).textContent = text;
}

// Función que se ejecuta al cargar la página
const onLoad = () => {
    navigator.geolocation.getCurrentPosition(fetchData);
}

// Función para traducir las descripciones del tiempo
function translateDescription(englishDescription) {
    return weatherDescriptions[englishDescription] || englishDescription;
}

 // Función para recargar el iframe cada 30 segundos
 function recargarIframe() {
    var iframe = document.getElementById("miIframe");
    iframe.src = iframe.src; // Esto recargará la fuente del iframe
    console.log('Actualizando dolar')
  }

  // Configura el intervalo para actualizar el iframe cada 30 segundos
  setInterval(recargarIframe, 30000); // 30,000 milisegundos = 30 segundos


// Llama a la función onLoad al cargar la página
window.addEventListener("load", onLoad);



// Boutons de recherches
const validation = document.querySelector("#validation");
const ville = document.querySelector("#ville");

// Infos météo
const temp = document.querySelector(".dgr");
const weatherIcon = document.querySelector("#weather-icon");
const temperature = document.querySelector('.dgr');
const description = document.querySelector("#description")
const humidite = document.querySelector("#humidity")
const vent = document.querySelector("#wind")
const city = document.querySelector("#city")

// cards forecast
const textContainer = document.querySelector("#text-container");


async function showWeather(ville) {
    try {
        // Déclare une clé API pour accéder au service WeatherAPI.
        const marinaKey = "dee9c68a0d304fbe91095156250304";

        // Effectue une requête HTTP GET vers l'API WeatherAPI avec la clé API et la ville spécifiée.
        const reponse = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${marinaKey}&q=${ville}&aqi=no&days=3`);

        // Attend la réponse de l'API et la convertit en JSON pour obtenir les données météo.
        const weather = await reponse.json();

        temp.textContent = weather.current.temp_c;


        const weatherCode = weather.current.condition.code;

        // Association des codes météo aux images personnalisées
        const customIcons = {
            1000: "sun.png",  // Ensoleillé
            1003: "sun_cloud.png",  // Partiellement nuageux
            1006: "cloud.png",  // Nuageux
            1009: "cloud.png",  // Très nuageux
            1030: "cloud.png",  // Brume
            1183: "rain.png",  // Pluie légère
            1195: "rain.png",  // Pluie forte
            1273: "storm.png",  // Orages avec pluie
            1276: "storm.png",  // Orages violents
            1282: "storm.png",  // Orages violents avec grêle

        };

        // Vérifie si le code météo existe dans la liste, sinon met une icône par défaut
        const iconPath = customIcons[weatherCode] ? `./assets/img/${customIcons[weatherCode]}` : "./assets/img/meteo.png";

        // Mise à jour de l'image météo
        weatherIcon.src = iconPath;
        temperature.textContent = weather.current.temp_c + "°C"
        description.textContent = weather.current.condition.text
        humidite.textContent = "Taux d'humidité : " + weather.current.humidity + " %"
        vent.textContent = "Vent : " + weather.current.wind_kph + " km/h"
        city.textContent = ville


        // Affiche les données météo dans la console.
        console.log(weather);

        textContainer.innerHTML = "";
        for (day in weather.forecast.forecastday) {
            const divJour = document.createElement("div");
            divJour.setAttribute("class", "jour");
            textContainer.appendChild(divJour);

            const weatherCode2 = weather.forecast.forecastday[day].day.condition.code;
            const iconPath2 = customIcons[weatherCode2] ? `./assets/img/${customIcons[weatherCode2]}` : "./assets/img/meteo.png";

            divJour.innerHTML = `<div class="left-panel panel">
            <div class="description"> ${weather.forecast.forecastday[day].date}</ div>
                    <div class="city">${ville}</div>
                    <img id="weather-icon2" class="weather-icon2" src="${iconPath2}" alt="Icône météo"
                    width="130">
                    </div>
                    <div class="right-panel panel">
                    <div class="dgr">${weather.forecast.forecastday[day].day.avgtemp_c}°C</div>
                    <p class="humidity">Taux moyen d'humidité: ${weather.forecast.forecastday[day].day.avghumidity}</p>
                    <p class="wind">Vitesse maximale du vent: ${weather.forecast.forecastday[day].day.maxwind_kph}km/h</p>
                    </div>`;
        }
    } catch (error) {
        console.log(error);
    }
}

window.onload = showWeather("Paris");

validation.addEventListener('click', () => {
    if (ville.value) {
        showWeather(ville.value);
    } else {
        console.log("Ville introuvable");
    }
})




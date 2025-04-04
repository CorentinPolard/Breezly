const validation = document.querySelector("#validation");
const ville = document.querySelector("#ville");
const temperature = document.querySelector('.dgr');
const description = document.querySelector("#description")
const humidite = document.querySelector("humidity")
const vent = document.querySelector("wind")



validation.addEventListener('click', () => {
    if (ville.value) {
        showWeather(ville.value);
    } else {
        console.log("Ville introuvable");
    }
})

async function showWeather(ville) {
    try {
        // Déclare une clé API pour accéder au service WeatherAPI.
        const marinaKey = "dee9c68a0d304fbe91095156250304";

        // Effectue une requête HTTP GET vers l'API WeatherAPI avec la clé API et la ville spécifiée.
        const reponse = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${marinaKey}&q=${ville}&aqi=no&days=3`);
       
        // Attend la réponse de l'API et la convertit en JSON pour obtenir les données météo.
        const weather = await reponse.json();
        console.log(weather)
        temperature.textContent = weather.current.temp_c
        description.textContent = weather.current.condition.text
        humidite.textContent = weather.current.humidity
        vent.textContent = weather.current
        

        // Affiche les données météo dans la console.
        console.log(weather);
    } catch (error) {
        console.log(error);
    }

}





const validation = document.querySelector("#validation");
const ville = document.querySelector("#ville");

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

        // Affiche les données météo dans la console.
        console.log(weather);
    } catch (error) {
        console.log(error);
    }
}
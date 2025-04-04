const validation = document.querySelector("#validation");
const ville = document.querySelector("#ville");
const temp = document.querySelector(".dgr");
const weatherIcon = document.querySelector("#weather-icon");


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
            // Ajoute d'autres conditions météo si nécessaire
        };

        // Vérifie si le code météo existe dans la liste, sinon met une icône par défaut
        const iconPath = customIcons[weatherCode] ? `/assets/img/${customIcons[weatherCode]}` : "/assets/img/default.png";

        // Mise à jour de l'image météo
        weatherIcon.src = iconPath;

        // Affiche les données météo dans la console.
        console.log(weather);
    } catch (error) {
        console.log(error);
    }

    

}
window.onload = showWeather("Paris");
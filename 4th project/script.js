let input = document.getElementById("input");
let search = document.getElementById("search");
const error = document.querySelector(".not-found");
const weather = document.querySelector(".weather");
const container = document.querySelector(".card");

search.addEventListener("click", () => {
    const APIkey = 'your key';
    const cityName = input.value.trim();

    if (cityName === "") return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${APIkey}`)
        .then(response => response.json())
        .then(json => {
            if (json.cod === '404') {
                container.style.height = "600px";
                weather.classList.remove("active");
                weather.classList.add("inactive");
                error.classList.add("active");
            } else {
                container.style.height = "620px";
                weather.classList.remove("inactive");
                weather.classList.add("active");
                error.classList.remove("active");

                const image = document.querySelector(".weather img");
                const temp = document.querySelector(".weather .temp");
                const city = document.querySelector(".weather .city");
                const humidity = document.querySelector(".humidity");
                const wind = document.querySelector(".wind");

                switch (json.weather[0].main) {
                    case 'Clear':
                        image.src = "images/clear.png";
                        break;
                    case 'Rain':
                        image.src = "images/rain.png";
                        break;
                    case 'Snow':
                        image.src = "images/snow.png";
                        break;
                    case 'Clouds':
                        image.src = "images/clouds.png";
                        break;
                    case 'Mist':
                        image.src = "images/mist.png";
                        break;
                    case 'Drizzle':
                        image.src = "images/drizzle.png";
                        break;
                    default:
                        image.src = 'images/cloud.png';
                }

                city.innerHTML = json.name;
                temp.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
                humidity.innerHTML = `${json.main.humidity}%`;
                wind.innerHTML = `${parseInt(json.wind.speed)} km/h`;
            }
        })
        .catch(() => {
            container.style.height = "600px";
            weather.classList.remove("active");
            weather.classList.add("inactive");
            error.classList.add("active");
        });
});

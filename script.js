document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("temperature");
    const button = document.getElementById("btn");
    const name = document.getElementById("city");
    const show = document.getElementById("result");
    const date = document.getElementById("dateresult");
    const weatherIcon = document.getElementById('weather-icon');

    const key = '15a857d4bc472bf95fcad6240db4c540';

    button.addEventListener("click", () => {
        const cityName = input.value.trim();
        if (cityName === "") {
            show.innerHTML = "Please enter a city name.";
            return;
        }

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}&units=metric`)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            const currentDate = new Date();
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            const formattedDate = currentDate.toLocaleDateString('en-US', options);

            name.innerHTML = `City: ${data.name}`;
            show.innerHTML = `Temperature: ${data.main.temp} °C`;
            date.innerHTML = `Date: ${formattedDate}`;

            const weatherCode = data.weather[0].icon;
            const { iconClass, colorClass } = getWeatherIconClass(weatherCode);
            weatherIcon.innerHTML = `<i class="${iconClass} ${colorClass}"></i>`;
        })
        .catch(error => {
            console.error('Error:', error);
            show.innerHTML = `Error: ${error.message}`;
            weatherIcon.innerHTML = `<i class="fas fa-exclamation-triangle"></i>`;
            weatherIcon.className = 'icon error';
        });
    });

    function getWeatherIconClass(code) {
        const weatherIcons = {
            '01d': { iconClass: 'fas fa-sun', colorClass: 'sunny' },
            '01n': { iconClass: 'fas fa-moon', colorClass: 'clear-night' },
            '02d': { iconClass: 'fas fa-cloud-sun', colorClass: 'partly-cloudy-day' },
            '02n': { iconClass: 'fas fa-cloud-moon', colorClass: 'partly-cloudy-night' },
            '03d': { iconClass: 'fas fa-cloud', colorClass: 'cloudy' },
            '03n': { iconClass: 'fas fa-cloud', colorClass: 'cloudy' },
            '04d': { iconClass: 'fas fa-cloud-meatball', colorClass: 'overcast' },
            '04n': { iconClass: 'fas fa-cloud-meatball', colorClass: 'overcast' },
            '09d': { iconClass: 'fas fa-cloud-showers-heavy', colorClass: 'rainy' },
            '09n': { iconClass: 'fas fa-cloud-showers-heavy', colorClass: 'rainy' },
            '10d': { iconClass: 'fas fa-cloud-sun-rain', colorClass: 'showers' },
            '10n': { iconClass: 'fas fa-cloud-moon-rain', colorClass: 'showers-night' },
            '11d': { iconClass: 'fas fa-poo-storm', colorClass: 'stormy' },
            '11n': { iconClass: 'fas fa-poo-storm', colorClass: 'stormy' },
            '13d': { iconClass: 'fas fa-snowflake', colorClass: 'snowy' },
            '13n': { iconClass: 'fas fa-snowflake', colorClass: 'snowy' },
            '50d': { iconClass: 'fas fa-smog', colorClass: 'foggy' },
            '50n': { iconClass: 'fas fa-smog', colorClass: 'foggy' }
        };
        return weatherIcons[code] || { iconClass: 'fas fa-question-circle', colorClass: 'unknown' };
    }
});

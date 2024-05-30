document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("temperature");
    const button = document.getElementById("btn");
    const name = document.getElementById("city");
    const show = document.getElementById("result");
    const date = document.getElementById("dateresult");
    const sun = document.getElementById('sun');

    const key = `15a857d4bc472bf95fcad6240db4c540`;

    button.addEventListener("click", () => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${key}&units=metric`) 
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            const currentDate = new Date();
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            const formattedDate = currentDate.toLocaleDateString('en-US', options);

            name.innerHTML = `City Name: ${data.name}`; 
            show.innerHTML = `Temperature: ${data.main.temp} °C`;
            date.innerHTML = `Date: ${formattedDate}`;
            sun.innerHTML = `${Image}`;
        })
        .catch((error) => {
            console.error('Error:', error);
            show.innerHTML = `Error: ${error.message}`;
        });
    });
});


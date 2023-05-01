// RapidAPI : Weather API url
const apiUrl = "https://weather-by-api-ninjas.p.rapidapi.com/v1/weather"
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'e1191133cbmshcda78d47df924d7p11f081jsne0c4d2c4b236',
        'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
    }
}

const getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showLocation)
    } else {
        console.log("%c: Geolocation is not supported by this browser!",
            "color: red")
    }
}

const showLocation = async (postition) => {
    const location = {
        latitude: postition.coords.latitude,
        longitude: postition.coords.longitude
    }
    // Get the weather
    const res = await fetch(`${apiUrl}?lat=${location.latitude}&lon=${location.latitude}`, options);
    const data = await res.json();
    let currLocation = document.getElementById("currLocation");
    currLocation.innerHTML = `
    <h1>Weather for your location: (Latitude: ${location.latitude}, Longitude: ${location.longitude})</h1>
    <p><strong>Temperature :</strong> ${data.temp}°C</p>
    <p><strong>Humidity :</strong> ${data.humidity}</p>
    <p><strong>Wind Speed :</strong> ${data.wind_speed}</p>
    `;
}

getLocation();

// Search functionality
const city = document.querySelector('input#city');
const debounce = (func, timeout) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args)
        }, timeout);
    }
}

const getWeather = async (cityName) => {
    let queryLocation = document.getElementById("queryLocation");
    queryLocation.setAttribute("class", "border-2 border-emerald-500 my-3 p-4");
    queryLocation.innerHTML = '<div class="flex items-center">Loading...<img src="/static/images/loading.gif" class="w-8"></div>';
    const res = await fetch(`${apiUrl}?city=${cityName}`, options);
    const data = await res.json();
    if (data.error) {
        queryLocation.removeAttribute("class");
        queryLocation.innerHTML = `<p class="my-3">Some error occurred...</p>`;
    } else {
        queryLocation.innerHTML = `
        <h1>Weather of <strong>"${cityName}"</strong>:</h1>
        <p><strong>Temperature :</strong> ${data.temp}°C</p>
        <p><strong>Humidity :</strong> ${data.humidity}</p>
        <p><strong>Wind Speed :</strong> ${data.wind_speed}</p>`
    }
}

const debounceGetData = debounce(getWeather, 500);

city.addEventListener("input", (e) => {
    debounceGetData(e.target.value);
})
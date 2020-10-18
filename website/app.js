// Global variable
const url = "http://api.openweathermap.org/data/2.5/weather?units=imperial&zip=";
const apiKey = "&appid=84cbf53335752057b28fcbc47c59a1e8";
const addWeatherData = '/addWeatherData'
const allWeatherData = '/allWeatherData'
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getDate() + ' / ' + Number(d.getMonth() + 1) + ' / ' + d.getFullYear();
console.log(newDate);

//function excuted when generate button clicked
function generateWeatherData() {

    const userInputZip = document.getElementById('zip').value;
    const userInputFealing = document.getElementById('fealing').value;
    // get data from OpenWeather API using user data 
    getApiData(url, userInputZip, apiKey)
        .then(function (weatherData) {
            console.log(weatherData);
            //routing addWeatherData tp server 
            postData(addWeatherData, {
                date: newDate, temp: weatherData.main.temp,
                fealing: userInputFealing
            });
            updateUI();
        })
};
// get data from OpenWeather API function 
const getApiData = async (url, userInputZip, apiKey) => {
    const serverRes = await fetch(url + userInputZip + apiKey)
    try {
        const data = await serverRes.json;
        return data;
    }
    catch (err) {
        // error log message reported in the console if it existed
        console.log("err", err);
    }
}

//async postdata func
const postData = async (url = "", weatherData = {}) => {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        //same type as in the header application
        // convert to json string
        body: JSON.stringify(weatherData)
    });
    try {
        const newWeatherData = await res.json;
        return newWeatherData;
    }
    catch (err) {
        // error log message reported in the console if it existed
        console.log("err", err);
    }
}

//async getdata func
const updateUI = async () => {
    const req = await fetch(allWeatherData);
    try {
        //updating HTML elements with user & API data
        const allWeatherData = await req.json;
        document.getElementById('date').innerHTML =
            `Date: ${allWeatherData[0].date}`;
        document.getElementById('temp').innerHTML =
            `Temperature: ${allWeatherData[0].temperature} &#8457`;
        document.getElementById('fealing').innerHTML =
            `You feal: ${allWeatherData[0].fealing}`
}
    catch (err) {
    // error log message reported in the console if it existed
    console.log("err", err);
}
}

// event listener for generate buttoon to generate data
document.getElementById('generate').addEventListener('click', generateWeatherData);

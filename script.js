const search_input = document.querySelector('.search');
const search_btn = document.querySelector('.search-btn')

const weatherinfoSection = document.querySelector('.weather-info')
const notFoundSection = document.querySelector('.not-found')
const searchcitySection = document.querySelector('.search-city')

const countrytxt = document.querySelector('.country-txt')
const tempTxt = document.querySelector('.temp-txt')
const tempClo = document.querySelector('.temp-txt-clo')
const percentage = document.querySelector('.percentage')
const windValue = document.querySelector('.wind-value-text')
const watherimag = document.querySelector('.weather-image')
const curentdata = document.querySelector('.curent-data')

const forecastItemContainer = document.querySelector('.forecast-item-container')



const apiKey = '78e32f933c2504fd8cc119a1f212c663'

search_btn.addEventListener('click', () => {
    if (search_input.value.trim() != '') {
        updateWeatherInfo(search_input.value)
        search_input.value = ''
        search_input.blur()

    }

})
search_input.addEventListener('keydown', (event) => {
    if (event.key == 'Enter' &&
        search_input.value.trim() != ''
    ) {
        updateWeatherInfo(search_input.value)
        search_input.value = ''
        search_input.blur()
    }

})
async function getFetchData(endPoint, city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${apiKey}&units=metric`

    const response = await fetch(apiUrl)
    return response.json()
}
function getWeatherIcon(id) {
    if (id <= 232) return 'thumderstorm.svg'
    if (id <= 321) return 'drizzle.svg'
    if (id <= 531) return 'rain.svg'
    if (id <= 622) return 'snow.svg'
    if (id <= 781) return 'atmosphere.svg'
    if (id <= 800) return 'clear.svg'
    else return 'clouds.svg'
}
function getCurrentDatae() {
    const curentData = new Date()
    const option ={
        weekday :'short',
        day:'2-digit',
        month:'short'
    }
    return curentData.toLocaleDateString('en-GB',option)
}
async function updateWeatherInfo(city) {
    const weatherData = await getFetchData('weather', city)
    if (weatherData.cod != 200) {
        showDisplaySection(notFoundSection)
        return
    }
    console.log(weatherData);

    const {
        name: country,
        main: { temp, humidity },
        weather: [{ id, main }],
        wind: { speed }
    } = weatherData

    countrytxt.textContent = country
    tempTxt.textContent = Math.round(temp) + '°C'
    tempClo.textContent = main
    percentage.textContent = humidity + '%'
    windValue.textContent = speed + 'M/s'
    curentdata.textContent = getCurrentDatae()
    watherimag.src = `assets/weather/${getWeatherIcon(id)}`

    await updateForecastsInfo(city)
    showDisplaySection(weatherinfoSection)
}

async function updateForecastsInfo(city){
    const forecastsData = await getFetchData('forecast',city)

    const timeTaken = '12:00:00'
    const todayDate = new Date().toISOString().split('T')[0]

    forecastItemContainer.innerHTML= ''
    forecastsData.list.forEach(forecastWeather=>{
        if(forecastWeather.dt_txt.includes(timeTaken)&
            !forecastWeather.dt_txt.includes(todayDate)){
            updateForecastItems(forecastWeather)
        }
        
    })
    
}
function updateForecastItems(weatherDate){
    const{
        dt_txt: date,
        weather:[{id}],
        main:{temp}
    }= weatherDate

    const dateTaken = new Date(date)
    const dateOption = {
        day:'2-digit',
        month:'short'
    }
    const dateResult =  dateTaken.toLocaleDateString('en-US', dateOption)
    const forecastItem = `
        <div class="card forecast-item">
            <div class="weather-day">Mon${dateResult}</div>
            <img class="weather-image-card" src="assets/weather/${getWeatherIcon(id)}" alt="Sunny Icon">
            <h4>Sunny</h4>
            <div class="weather-day-o">${Math.round(temp)} °C</div>
        </div>`

        forecastItemContainer.insertAdjacentHTML('beforeend',forecastItem)
}

function showDisplaySection(section) {
    [weatherinfoSection, searchcitySection, notFoundSection]
        .forEach(section => section.style.display = 'none')
    section.style.display = 'inline'
}


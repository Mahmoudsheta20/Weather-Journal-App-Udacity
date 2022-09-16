/* Global Variables */
const generate = document.getElementById('generate')

console.log(zip)
    // Api Ulrl and key
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?q='
const apiKey = '&units=metric&appid=a5859ff71ad36f5b4cffecce922fac48'

// Create a new date instance dynamically with JS
let d = new Date()
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear()

// add evenet litener

generate.addEventListener('click', async e => {
    const zip = document.getElementById('zip').value
    const feelings = document.getElementById('feelings').value
    e.preventDefault()
    getWeather(baseURL, zip, apiKey).then(Data => {
        postData('http://localhost:3000/add', {
                date: newDate,
                temp: Data.main.temp,
                feelings
            })
            .then(e => retrieveData())
            .catch(e => console.log(e))
    })
    console.log(feelings)
})

const getWeather = async(baseURL, zipCode, apiKey) => {
    if (zipCode) {
        try {
            const res = await fetch(baseURL + zipCode + apiKey)
            const data = await res.json()
            return data
        } catch (err) {
            console.log('err', err)
        }
    }
    document.getElementById('worng').innerHTML = 'Please Entry Valid zipcode'
}

const postData = async(url = '', data = {}) => {
    try {
        let response = await fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify({
                date: data.date,
                temp: data.temp,
                feelings: data.feelings
            })
        })

        let newdata = await response.json()
        return newdata
    } catch (err) {
        console.log(err)
    }
}

const retrieveData = async() => {
    const request = await fetch('/all')
    try {
        // Transform into JSON
        const allData = await request.json()
        console.log(allData)
            // Write updated data to DOM elements
        document.getElementById('temp').innerHTML =
            Math.round(allData.temp) + 'degrees'
        document.getElementById('content').innerHTML = allData.feelings
        document.getElementById('date').innerHTML = allData.date
    } catch (error) {
        console.log('error', error)
            // appropriately handle the error
    }
}
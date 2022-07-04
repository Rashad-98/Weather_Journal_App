/* Global Variables */
const apiKey = '&appid=9f05cb3c6f8685d71665a68cc3a7210a&units=metric';
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const button = document.getElementById('generate');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();

// POST request to add data to project endpoint
const postData = async function(url = '', data = {}){
  const response = await fetch(url,{
    method: 'POST',
    credentials: 'same-origin',
    headers: {'content-type':'application/json'},
    body: JSON.stringify(data)
  });
}

// asynchronous function to get data from (openweathermap) api and add it to the application endpoint, then call another asynchronous function to get the data from the application endpoint.
const fetchAndAddFunc = async function(){
  const zipCode = document.getElementById('zip').value;
  const user_response = document.getElementById('feelings').value;
  try{
    if (isNaN(zipCode)) throw 'not a number!';
    if (zipCode=='') throw 'nothing entered!';
    if (!numIsFive(zipCode)) throw 'not a valid number!'
    const weatherData =await ((await fetch(baseURL+zipCode+apiKey)).json());
    postData('/addData',{
      temperature:weatherData.main.temp,
      date:newDate,
      user_response: user_response
    });
    fetchAgain();
  } catch(error){
    alert(error);
  }
}

//asynchronous function to fetch data from the application endpoint and update the DOM elements with it.
async function fetchAgain(){
  const data = await ((await fetch('/getData')).json());
  //createElements();
  console.log(document.getElementById('date').innerHTML);
  document.getElementById('date').innerHTML= 'date: ' + data.date;
  document.getElementById('temp').innerHTML= 'temperature: ' + data.temperature + ' degree celsius';
  document.getElementById('content').innerHTML='user response: ' + data.user_response;
}

//add event listener to the button with id=generate
button.addEventListener('click',fetchAndAddFunc);

// a helper function to test if the zip code contains five numbers or not
function numIsFive(num){
  const numStr = num.toString().length;
  if (numStr==5){
    return true;
  } else{
    return false;
  }
}

//helper function to create holder elements
// function createElements(){
//   const holdler = document.createElement('div');
//   holdler.innerHTML = `<div class = "title">Most Recent Entry</div>
//   <div id = "entryHolder">
//    <div id = "date"></div>
//    <div id = "temp"></div>
//    <div id = "content"></div>
//  </div>`
// }

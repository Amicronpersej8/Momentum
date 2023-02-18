//import playlist from "./playlist.js"


function showTime() {
    const time = document.querySelector('.time');
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    time.textContent = currentTime;
    setTimeout(showTime, 1000);
}
showTime();

const date = new Date();
function showDate(date) {
    const currentDate = document.querySelector('.date');
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    currentDate.textContent = date.toLocaleDateString('en-Br', options);
    setTimeout(showDate, 1000000);
}
showDate(date);

const timeOfDay = getTimeOfDay()
function getTimeOfDay() {
    const hours = new Date().getHours()
    if (5 <= hours && hours < 11) {
        return "morning"
    } else if (11 <= hours && hours < 18) {
        return "afternoon"
    } else if (17 < hours && hours <= 23) {
        return "evening"
    } else if (00 <= hours && hours < 5)
        return "night"
}

function showGreetings() {
    const greeting = document.querySelector('.greeting')
    const greetingText = (`Good ${timeOfDay},`);
    greeting.textContent = greetingText;
}
showGreetings()

//local storage
const user = document.querySelector('.name');
function setLocalStorage() {
    localStorage.setItem(user, user.value);
}

window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
    if (localStorage.getItem(user)) {
        user.value = localStorage.getItem(user);
    }
}
window.addEventListener('load', getLocalStorage);

//body image
let randomNum = Math.floor(Math.random() * 20) + 1;
let url = '';
let bgNum;
const body = document.querySelector('body');


function setBg() {
    bgNum = ((randomNum + '').padStart(2, 0));
    body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg')`;
}
setBg()

function getSlideNext() {
    if (randomNum < 20) {
        randomNum = randomNum + 1
        return setBg()
    }
    else {
        randomNum = randomNum - 19
        return setBg()
    }
}
function getSlidePreviev() {
    if (randomNum < 20) {
        randomNum = randomNum - 1
        return setBg()
    }
    else {
        randomNum = randomNum - 19
        return setBg()
    }
}

(function () {
    const next = document.querySelector('.slide-next');
    const previev = document.querySelector('.slide-prev');
    next.addEventListener('click', () => {
        getSlideNext();
    });
    previev.addEventListener('click', () => {
        getSlidePreviev()
    });
}());

//weather
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');

async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=caca60a9cb24a9b5d6444f36765c806a&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `Wind ${Math.round(data.wind.speed)} m/s`;
    humidity.textContent = `Humidity ${data.main.humidity} %`;
}
const city = document.querySelector('.city');

function setCity() {
    localStorage.setItem('city', city.value);
}
city.addEventListener('change', setCity)

function getCity() {
    city.value = localStorage.getItem('city');
    getWeather();
}
getCity()


//Quotes


async function getQuotes() {
    let quoteNumber = Math.floor(Math.random() * 6) + 1;
    const quote = document.querySelector('.quote');
    const author = document.querySelector('.author');
    const quotes = "js/data.json";
    const res = await fetch(quotes);
    const data = await res.json();
    quote.textContent = data[quoteNumber].text
    author.textContent = data[quoteNumber].author
}
getQuotes();
const change = document.querySelector('.change-quote')
change.addEventListener('click', () => {
    getQuotes();
});


//Audio player
const playList = [
    {
        title: 'Aqua Caelestis',
        src: '../assets/sounds/Aqua Caelestis.mp3',
    },
    {
        title: 'River Flows In You',
        src: '../assets/sounds/River Flows In You.mp3',
    },
    {
        title: 'Ennio Morricone.mp3',
        src: '../assets/sounds/Ennio Morricone.mp3'
    },
    {
        title: 'Summer Wind.mp3',
        src: '../assets/sounds/Summer Wind.mp3'
    }
]

let numAudio = 0;

let isPlay = false;
const playBtn = document.querySelector('.play');
const audio = new Audio();
function playAudio() {
    audio.src = playList[numAudio].src;
    audio.currentTime = 0;
    if (isPlay == false) {
        audio.play();
        isPlay = true;
    } else if (isPlay == true) {
        audio.pause();
        isPlay = false;
    }
    showAudio()
    console.log(isPlay)

}

playBtn.addEventListener('click', playAudio);


function toggleBtn() {
    playBtn.classList.toggle('pause');
}
playBtn.addEventListener('click', toggleBtn);

const nextAudio = document.querySelector('.play-next');
function playNext() {
    if (numAudio < 4) {
        numAudio = numAudio + 1;
    }
    if (numAudio == 4) {
        numAudio = 0;
    }
    playAudio()
    showAudio()

}

nextAudio.addEventListener('click', () => {
    playNext();
    playAudio()
})
const prevAudio = document.querySelector('.play-prev');
function playPrev() {
    if (numAudio > 0) {
        numAudio = numAudio - 1;
    }
    else {
        numAudio = 3;
    }
    playAudio()
    showAudio()

}

prevAudio.addEventListener('click', () => {
    playPrev();
    playAudio()

})

showAudio = function () {
    const audioList = document.querySelector('.play-list');
    audioList.textContent = playList[numAudio].title;
}
// const userTab=document.querySelector("[data-userWeather]");
// const searchTab=document.querySelector("[data-searchWeather]");
// const grantaccess=document.querySelector("[data-grantAccess]");
// const searchForm=document.querySelector("[data-searchForm]");
// const loading=document.querySelector(".loading-container");
// const userinfocontainer=document.querySelector(".user-info-container");
// let currenttab=userTab;
// const API_KEY="c191942ca00d6cbad2672f2d567df6d5";
// currenttab.classList.add("current-tab"); 

// //function to switch the tab
// getfromSessionStorage();

// function switchTab(clickedTab) {
//     if(clickedTab!=currenttab){
//         currenttab.classList.remove("current-tab");
//         currenttab=clickedTab;
//         currenttab.classList.add("current-tab");

//         if(!searchForm.classList.contains("active")){
//             userinfocontainer.classList.remove("active");
//             grantaccess.classList.remove("active");
//             searchForm.classList.add("active");
//         }
//         else{
//             searchForm.classList.remove("active");
//             userinfocontainer.classList.remove("active");
//             getfromSessionStorage();
//         }
//     }
// }
// userTab.addEventListener("click",()=>{
//     switchTab(userTab);
// })
// searchTab.addEventListener("click",()=>{
//     switchTab(searchTab);
// })
// function getfromSessionStorage() {
//     const localCoordinates=sessionStorage.getItem("user-coordinates");
//     if(!localCoordinates){
//         // When the local Coordinates are inactive.
//         grantaccess.classList.add("active");
//     }
//     else{
//         const coordinates=JSON.parse(localCoordinates);
//         fetchUserWeatherInfo(coordinates);
//     }
// }
//  async function fetchUserWeatherInfo(coordinates) {
//     const {lat,lon}=coordinates;
//     //Api is calling
//     grantaccess.classList.remove("active");
//     // userinfocontainer.classList.remove("active");
//     //loading is activated
//     loading.classList.add("active");
//      try{
//         const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
//         const data= await response.json();
//           loading.classList.remove("active");
//           userinfocontainer.classList.add("active");
//             renderWeatherInfo(data);
//      }
//      catch(e){
//         loading.classList.remove("active");
//      }
// }
// function renderWeatherInfo(weatherInfo) {
//     // firstly we have to fetch the elements
//     const cityName=document.querySelector("[data-cityName]");
//     const countryIcon=document.querySelector("[data-countryIcon]");
//     const weatherDes=document.querySelector("[data-weatherDesc]");
//     const weatherIcon=document.querySelector("[data-weatherIcon]");
//     const temp=document.querySelector("[data-temp]");
//     const windSpeed=document.querySelector("[data-windspeed]");
//     const humidity=document.querySelector("[data-humidity]");
//     const cloudiness=document.querySelector("[data-cloudiness]");
    
//      // fetch values to ui
//      cityName.innerText=weatherInfo?.name;
//      countryIcon.src=`https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
//      weatherDes.innerText=weatherInfo?.weather?.[0]?.description;
//      weatherIcon.src=`https://openweathermap.org/img/wn/${weatherInfo?.weather?.[0]?.icon}.png`;
//      temp.innerText=`${weatherInfo?.main?.temp}°C`;
//      windSpeed.innerText=weatherInfo?.wind?.speed;
//      humidity.innerText=weatherInfo?.main?.humidity;
//      cloudiness.innerText=weatherInfo?.clouds?.all;
// }
// function getLocation(){
//   if(navigator.geolocation){
//     navigator.geolocation.getCurrentPosition(showPosition);
//   }
//   else{
//     // alert("No Geolocation Support Available");
//   }
// }
// function showPosition(position) {
//     const userCoordinates={
//         lat: position.coords.latitude,
//         lon: position.coords.longitude,
//     }
//      sessionStorage.setItem("user-coordinates",JSON.stringify(userCoordinates));
//      fetchUserWeatherInfo(userCoordinates);
// }
// const grantAccessButton=document.querySelector("[data-grantAccess]");
// grantAccessButton.addEventListener("click",getLocation);
// const searchInput=document.querySelector("[data-searchInput]");
// searchForm.addEventListener("submit",(e)=>{
//     e.preventDefault();
//     let cityN=searchInput.value;
//     if(cityN === "") return;
//     else fetchSearchWeatherInfo(cityN);
// }) 
// async function fetchSearchWeatherInfo(city){
//        loading.classList.add("active");
//        userinfocontainer.classList.remove("active");
//        grantAccessButton.classList.remove("active");
//        try {
//         const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
//         const data=await response.json();
//         loading.classList.remove("active");
//         userinfocontainer.classList.add("active");
//               renderWeatherInfo(data);  
//        } catch (error) {
//          alert(" Error happening");
//        }
// }

const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const userContainer = document.querySelector(".weather-container");

const grantAccessContainer = document.querySelector(".grant-location-container");
const searchForm = document.querySelector("[data-searchForm]");
const loadingScreen = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".user-info-container");

//initially vairables need????

let oldTab = userTab;
const API_KEY = "d1845658f92b31c64bd94f06f7188c9c";
oldTab.classList.add("current-tab");
getfromSessionStorage();

function switchTab(newTab) {
    if(newTab != oldTab) {
        oldTab.classList.remove("current-tab");
        oldTab = newTab;
        oldTab.classList.add("current-tab");

        if(!searchForm.classList.contains("active")) {
            //kya search form wala container is invisible, if yes then make it visible
            userInfoContainer.classList.remove("active");
            grantAccessContainer.classList.remove("active");
            searchForm.classList.add("active");
        }
        else {
            //main pehle search wale tab pr tha, ab your weather tab visible karna h 
            searchForm.classList.remove("active");
            userInfoContainer.classList.remove("active");
            //ab main your weather tab me aagya hu, toh weather bhi display karna poadega, so let's check local storage first
            //for coordinates, if we haved saved them there.
            getfromSessionStorage();
        }
    }
}

userTab.addEventListener("click", () => {
    //pass clicked tab as input paramter
    switchTab(userTab);
});

searchTab.addEventListener("click", () => {
    //pass clicked tab as input paramter
    switchTab(searchTab);
});

//check if cordinates are already present in session storage
function getfromSessionStorage() {
    const localCoordinates = sessionStorage.getItem("user-coordinates");
    if(!localCoordinates) {
        //agar local coordinates nahi mile
        grantAccessContainer.classList.add("active");
    }
    else {
        const coordinates = JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);
    }

}

async function fetchUserWeatherInfo(coordinates) {
    const {lat, lon} = coordinates;
    // make grantcontainer invisible
    grantAccessContainer.classList.remove("active");
    //make loader visible
    loadingScreen.classList.add("active");

    //API CALL
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
          );
        const  data = await response.json();

        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    }
    catch(err) {
        loadingScreen.classList.remove("active");
        //HW

    }

}

function renderWeatherInfo(weatherInfo) {
    //fistly, we have to fethc the elements 

    const cityName = document.querySelector("[data-cityName]");
    const countryIcon = document.querySelector("[data-countryIcon]");
    const desc = document.querySelector("[data-weatherDesc]");
    const weatherIcon = document.querySelector("[data-weatherIcon]");
    const temp = document.querySelector("[data-temp]");
    const windspeed = document.querySelector("[data-windspeed]");
    const humidity = document.querySelector("[data-humidity]");
    const cloudiness = document.querySelector("[data-cloudiness]");

    // console.log(weatherInfo);

    //fetch values from weatherINfo object and put it UI elements
    cityName.innerText = weatherInfo?.name;
    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    desc.innerText = weatherInfo?.weather?.[0]?.description;
    weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    temp.innerText = `${weatherInfo?.main?.temp} °C`;
    windspeed.innerText = `${weatherInfo?.wind?.speed} m/s`;
    humidity.innerText = `${weatherInfo?.main?.humidity}%`;
    cloudiness.innerText = `${weatherInfo?.clouds?.all}%`;


}

function getLocation() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
        //HW - show an alert for no gelolocation support available
    }
}

function showPosition(position) {

    const userCoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    }

    sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);

}

const grantAccessButton = document.querySelector("[data-grantAccess]");
grantAccessButton.addEventListener("click", getLocation);

const searchInput = document.querySelector("[data-searchInput]");

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let cityName = searchInput.value;

    if(cityName === "")
        return;
    else 
        fetchSearchWeatherInfo(cityName);
})

async function fetchSearchWeatherInfo(city) {
    loadingScreen.classList.add("active");
    userInfoContainer.classList.remove("active");
    grantAccessContainer.classList.remove("active");

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
          );
        const data = await response.json();
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    }
    catch(err) {
        //hW
    }
}
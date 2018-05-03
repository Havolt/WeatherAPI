
let info = {
    initTime : '',
    lat: '',
    lon: ''
}

let requestURL;
let request = new XMLHttpRequest();


function getGeo(){ navigator.geolocation.getCurrentPosition(function(e){
    console.log(e)
    
    let myTime = new Date();
    myTime.getDate(e.timestamp)
    info.initTime = myTime;
    info.lat = Math.floor(e.coords.latitude);
    info.lon = Math.floor(e.coords.longitude);
    requestURL = 'http://api.openweathermap.org/data/2.5/weather?lat='+info.lat+'&lon='+info.lon+'&APPID=48e411ef7b37e3322417098d6f26293b&units=metric';
    if(e){gotLoc()}
    }, function(err){initFail();}
    );
    }


function initFail(){

    document.body.innerHTML = '';
    let failDiv = document.createElement('div');
    document.body.appendChild(failDiv);
    let failWarning = document.createElement('h1');
    failWarning.innerHTML = 'I NEED TO USE YOUR LOCATION, PLEASE REFRESH AND ALLOW'
    failDiv.appendChild(failWarning);
    let failButton = document.createElement('button');
    failButton.innerHTML = 'Get Location';
    failDiv.appendChild(failButton);
    failButton.addEventListener('click', function(){
    getGeo(); 
    });

}



function gotLoc(){
    document.body.innerHTML = '';
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    console.log(info.lat);
    reqTime();
}

//
let reqTime = function(){
    setTimeout(function(){
        if(request.response){
            console.log(request.response);
            info.city = request.response.sys.country;
            initApp();
        }else{
            console.log('not yet');
            reqTime();
        }
    }, 100)
}


//creates app when permission is granted
function initApp(){

    let appDiv = document.createElement('div');
    appDiv.id="app";
    document.body.appendChild(appDiv);

    let weatherDiv = document.createElement('div');
    weatherDiv.classList += 'weatherDiv';
    appDiv.appendChild(weatherDiv);

    let weatherHead = document.createElement('div');
    weatherHead.classList += 'weatherHead';
    weatherHead.innerHTML = info.city;
    weatherDiv.appendChild(weatherHead);
}




//initializes permission to get geolocation
getGeo();
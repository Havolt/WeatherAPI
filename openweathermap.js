
let info = {
    initTime : ''
}

let requestURL = 'http://api.openweathermap.org/data/2.5/weather?q=Dublin&APPID=48e411ef7b37e3322417098d6f26293b&units=metric';
let request = new XMLHttpRequest();


function getGeo(){ navigator.geolocation.getCurrentPosition(function(e){
    console.log(e)
    
    let myTime = new Date();
    myTime.getDate(e.timestamp)
    info.initTime = myTime;
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
    reqTime();
}

let reqTime = function(){
    setTimeout(function(){
        if(request.response){
            console.log(request.response);
            initApp();
        }else{
            console.log('not yet');
            reqTime();
        }
    }, 100)
}





getGeo();
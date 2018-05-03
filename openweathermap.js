
let info = {
    initTime : ''
}

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
    console.log(info.initTime);
}

getGeo();
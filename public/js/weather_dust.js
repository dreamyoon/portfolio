const latitude = '37.516500';
const longitude = '127.100456';
const weatherToken = '523ec961deed4e92247d6f2a631df78e';
let weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid='+weatherToken+'&units=metric&lang=kr';


httpGetAsync(weatherUrl, updateWeatherInfo);

const airQualityToken = '39a661bfaf1482ace3ddb1bc296212f661ba55c5';
let airQualityUrl = 'http://api.waqi.info/feed/geo:'+latitude+';'+longitude+'/?token='+airQualityToken;
httpGetAsync(airQualityUrl, updateAirQualityInfo);

setInterval(function () {
    httpGetAsync(weatherUrl, updateWeatherInfo);
    httpGetAsync(airQualityUrl, updateAirQualityInfo);
    var time = new Date();
    document.getElementById("updateTime").innerHTML = "last update - "+ time.getHours().toString()+":"+time.getMinutes().toString()+":"+time.getSeconds().toString();
},1800000);

function httpGetAsync(theUrl, callback)
{
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200)
            callback(xmlHttp.responseText);
    };
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
}
function updateWeatherInfo(text) {
    let obj = JSON.parse(text);
    document.getElementById("weatherInfo").innerHTML = obj.main.temp+'º  '+obj.main.humidity+'%   ' +obj.weather[0].description;
    document.getElementById('weatherIcon').src='img/' +obj.weather[0].icon + '.png';
}
function updateAirQualityInfo(text) {
    let obj = JSON.parse(text);
    let v10 = obj.data.iaqi.pm10.v;
    let v25 = obj.data.iaqi.pm25.v;
    document.getElementById("airInfo10").innerHTML = v10 + "   " + airStatus('pm10',v10);
    document.getElementById("airInfo25").innerHTML = v25 + "   " + airStatus('pm25',v25);

}

function airStatus(type, v) {
    const status = ["좋음","보통","한때나쁨","나쁨","매우나쁨"];
    let pm10 = document.getElementById("airInfo10");
    let pm25 = document.getElementById("airInfo25");
    switch (type)
    {
        case "pm25":
            if (v <= 15){pm25.style.color="#4e89f6"; return status[0];}
            else if (v <= 50){pm25.style.color="#5bd464"; return status[1];}
            else if (v <= 75) {pm25.style.color="#ffbc3b"; return status[2];}
            else if (v <= 100) {pm25.style.color="#fe7f41"; return status[3];}
            else {pm25.style.color="#ff0441"; return status[4];}
        case "pm10":
            if (v <= 30) {pm10.style.color="#4e89f6"; return status[0];}
            else if (v <= 80){pm10.style.color="#5bd464t"; return status[1];}
            else if (v <= 150){pm10.style.color="#fe7f41";return status[3];}
            else{pm25.style.color="#ff0441";return status[4];}
        default:
            break;
    }
    return "";
}

var H='....';
var H=H.split('');
var M='.....';
var M=M.split('');
var S='......';
var S=S.split('');
var Ypos=0;
var Xpos=0;
var Ybase=8;
var Xbase=8;
var dots=12;

function clock(){
    var time=new Date ();
    var secs=time.getSeconds();
    var sec=-1.57 + Math.PI * secs/30;
    var mins=time.getMinutes();
    var min=-1.57 + Math.PI * mins/30;
    var hr=time.getHours();
    var hrs=-1.57 + Math.PI * hr/6 + Math.PI*parseInt(time.getMinutes())/360;
    for (i=0; i < dots; ++i){
        document.getElementById("dig" + (i+1)).style.top=0-15+40*Math.sin(-0.49+dots+i/1.9).toString() + "px";
        document.getElementById("dig" + (i+1)).style.left=0-14+40*Math.cos(-0.49+dots+i/1.9).toString() + "px";
    }
    for (i=0; i < S.length; i++){
        document.getElementById("sec" + (i+1)).style.top =Ypos+i*Ybase*Math.sin(sec).toString() + "px";
        document.getElementById("sec" + (i+1)).style.left=Xpos+i*Xbase*Math.cos(sec).toString() + "px";
    }
    for (i=0; i < M.length; i++){
        document.getElementById("min" + (i+1)).style.top =Ypos+i*Ybase*Math.sin(min).toString() + "px";
        document.getElementById("min" + (i+1)).style.left=Xpos+i*Xbase*Math.cos(min).toString() + "px";
    }
    for (i=0; i < H.length; i++){
        document.getElementById("hour" + (i+1)).style.top =Ypos+i*Ybase*Math.sin(hrs).toString() + "px";
        document.getElementById("hour" + (i+1)).style.left=Xpos+i*Xbase*Math.cos(hrs).toString() + "px";
    }
    setTimeout(clock, 50);
}
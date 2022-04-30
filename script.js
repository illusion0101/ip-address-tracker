function renderMap(coordinates){
    document.querySelector('.map-box').innerHTML = '<div id="map" class="map"></div>';

    var map = L.map('map').setView(coordinates, 10);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1Ijoic2h1dmFtNTg2IiwiYSI6ImNsMmxrNTQzbTBucWYza25xbHBpemIxd2wifQ.qN0uF-4DYXdzwdOH3KpVoQ'
    }).addTo(map);

    var myIcon = L.icon({
        iconUrl: `data:image/svg+xml,<svg version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 46 56" width="46" height="56"><path id="Layer" fill-rule="evenodd" class="s0" d="m22.5 46c-12.5-0.1-22.6-10.3-22.6-22.8v-0.2l0.3-22.9 22.9 0.1c12.5 0 22.6 10.2 22.6 22.7v0.3c-0.2 12.6-10.5 22.8-23.2 22.8zm-6.4-16.3c3.6 3.7 9.5 3.7 13.3 0 3.7-3.6 3.8-9.6 0.1-13.2-3.6-3.7-9.5-3.7-13.3-0.1-3.7 3.7-3.7 9.6-0.1 13.3z"/></svg>`,
      });
      
    myMarker = L.marker(coordinates, { icon: myIcon }).addTo(map);
}

function renderDetails(data){
    document.querySelector('.ip-address .result-text').innerHTML = data.ip;
    document.querySelector('.location .result-text').innerHTML = `${data.city}, ${data.state}, ${data.country}`;
    document.querySelector('.timezone .result-text').innerHTML = data.timezone;
    document.querySelector('.isp .result-text').innerHTML = data.isp;
}

function getData(address, string){
    if(string == true){
        var place = 'domain';
    }
    else {
        var place = 'ipAddress';
    }

    const API_KEY = 'at_GdV7BAl8p9bLfzqBxdhKwJi8a86Ke';
    fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&${place}=${address}`).then(response => {
        return response.json();
    }).then(data => {
        var details = {
            'ip': data.ip,
            'city': data.location.city,
            'state': data.location.region,
            'country': data.location.country,
            'timezone': `UTC ${data.location.timezone}`,
            'isp': data.isp
        }

        renderDetails(details);
        renderMap([data.location.lat, data.location.lng]);
    })
}

function searchData(){
    address = document.querySelector('.search-text').value;
    
    var regExp = /[a-zA-Z]/g;
    var string = false;        

    if(regExp.test(address)){
        string = true;
    }

    getData(address, string);
}

getData('illusion0101.github.io', true);

    document.getElementById('timeNow').textContent = new Date();
    const checkNow = document.getElementById('checkNow');
    checkNow.addEventListener('click', () => {
        getISS();
    })

    const getISS = async () => {
        
        const ISS_API_URL = 'https://api.wheretheiss.at/v1/satellites/25544';

        const response = await fetch(ISS_API_URL);
        const data = await response.json();
        const {longitude,latitude,timestamp} = data;
        // console.log(longitude,latitude,timestamp);

        // setting up the map.
        let myMap = L.map('myMap').setView([latitude, longitude], 1);
        const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
        const tiles = L.tileLayer(tileUrl,{attribution:"Qwerty"});
        tiles.addTo(myMap)



        let requestedData = new Date();
        document.getElementById('longitude').textContent = longitude;
        document.getElementById('latitude').textContent = latitude;

        // send data to the server.
        const body = {
                longitude,
                latitude,
                requestedData: requestedData,
                day: requestedData.getDay(),
                hour: requestedData.getHours(),
                minutes:requestedData.getMinutes()
        };
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
            body: JSON.stringify(body)
        }

        const resp = await fetch('/api',options);
        const dataResp = await resp.json();
        console.log(dataResp);
    }

    getISS();

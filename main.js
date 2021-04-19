const map = document.querySelector('#api-key')
const address = document.querySelector('#address')
const norad = document.querySelector('#norad')



const arrayTimes = []



let longitude = ""
let latitude = ""



const searchButton = document.querySelector('#search')
searchButton.addEventListener("click", ButtonClicked)



function ButtonClicked(){
    let mapBox = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + 
    encodeURI(address.value)+ ".json?limit=2&access_token=" + map.value
    fetch(mapBox).then(function (response) {
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(response);
        }
    }).then(function (data) {
        longitude = data.features[0].center[0]
        latitude = data.features[0].center[1]
        getSatellite()
    })
}



function satellite(){
    longitude = "-34.9112212"
    latitude = "-57.9372988"
let satelliteAPI = "https://satellites.fly.dev/passes/" + norad.value + 
"?lat=" + longitude + "&lon=" + latitude + "&days=15&visible_only=true"
fetch(satelliteAPI).then(function (response) {
    if (response.ok) {
        return response.json();
    } else {
        return Promise.reject(response);
    }
}).then(function (data) {
        let i = 0
        for (const each of data ){ arrayTimes.push(each); displayData(i); i = i +1;}
})} 



function data(index){
    const carouselInner = document.querySelector('.carousel-inner')
    const parent = document.createElement('div');
    parent.className = 'item';
    const child1 = document.createElement('div');
    child1.className = 'container';
    const heading = document.createElement('h3');
    Heading.className = 'fontStyle';
    let date = arrayTimes[index].culmination.utc_datetime.split(' ')
    Heading.innerText = date[0]
    const child2 = document.createElement('div');
    child2.className = 'mapInfo';
    const div1 = document.createElement('div');
    div1.className = 'fontStyle';
    let x = arrayTimes[index].rise.utc_datetime.split(' ')[1].split('.')[0]
    div1.innerText = "RISE TIMINGS: " + x 
    const div2 = document.createElement('div');
    div2.className = 'fontStyle';
    let y = arrayTimes[index].culmination.utc_datetime.split(' ')[1].split('.')[0]
    div2.innerText = "CULMINATION TIMINGS: " + y
    const div3 = document.createElement('div');
    div3.className = 'fontStyle';
    let z = arrayTimes[index].set.utc_datetime.split(' ')[1].split('.')[0]
    div3.innerText = "SET TIMINGS: " +  z
    child2.appendChild(div1)
    child2.appendChild(div2)
    child2.appendChild(div3)
    child1.appendChild(child2)
    parent.appendChild(heading)
    parent.appendChild(child1)
    carouselInner.appendChild(parent)
}

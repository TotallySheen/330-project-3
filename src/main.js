import * as map from "./map.js"
import * as ajax from "./ajax.js"

let jobs;

function init(){
    map.initMap();
    map.loadMarkers();
    map.addMarkersToMap();
    setupUI();
}

function setupUI(){
    search.onclick = searchAt;
}

function searchAt()
{
    let location = place.value;

    location = location.replace(/ /g, '+')
    
    let url = "https://people.rit.edu/spg1627/330/project-3/php/proxy.php?";

    let description = language.value;
    //url += "description= " + description

    url += "location=" + location;

    function jobsLoaded(jsonString)
    {
        jobs = JSON.parse(jsonString);

        for (let j of jobs)
        {
            map.addMarker(j.location,j.company,j.title,"job");
        }
    }

    ajax.downloadFile(url,jobsLoaded);
}

export {init};
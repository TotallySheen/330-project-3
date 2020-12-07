import * as map from "./map.js"
import * as ajax from "./ajax.js"

let jobs,num;
let collapsed = false;

function init(){
    map.initMap();
    map.loadMarkers();
    map.addMarkersToMap();
    loadLocalStorage();
    setupUI();
}

function setupUI(){
    search.onclick = searchAt;
    collapse.onclick = toggleCollapse;
    for (let r of document.querySelectorAll(`input[type="radio"]`))
    {
        r.onchange = e => {
            if (r.id == "other" && r.checked == true)
            {
                otherText.disabled = false;
            }
            else if (r.checked == true)
            {
                otherText.disabled = true;
            }
        }
    }
    otherText.oninput = e => {
        other.value = e.target.value;
    }
}

function searchAt()
{
    map.clearMarkers();
    saveSearchValues();
    let location = place.value;

    location = location.replace(/ /g, '+')
    
    let url = "https://people.rit.edu/spg1627/330/project-3/php/proxy.php?";

    url += "location=" + location;

    let description = document.querySelector(`input[name="language"]:checked`).value;
    if (description != "any")
    {
        url += "&description=" + description
    }

    function jobsLoaded(jsonString)
    {
        jobs = JSON.parse(jsonString);

        num = document.querySelector("#numResults").value;
        
        search.innerHTML = "SEARCH";
        search.disabled = false;
        // limiting the displayed results
        if (num == "all" || num > jobs.count)
        {
            for (let j of jobs)
            {
                map.addMarker(j.location,j.company,j.title,j.url,"job");
            }
        }
        else
        {
            for (let i = 0; i < num; i++)
            {
                map.addMarker(jobs[i].location,jobs[i].company,jobs[i].title,jobs[i].url,"job");
            }
        }
    }

    search.innerHTML = "SEARCHING...";
    search.disabled = true;

    ajax.downloadFile(url,jobsLoaded);
}

function saveSearchValues()
{
    // saving the options of the search to local storage
    localStorage.setItem("saved", "true");
    localStorage.setItem("location", place.value);
    localStorage.setItem("results", numResults.value);
    localStorage.setItem("language", document.querySelector(`input[name="language"]:checked`).value);
}

function loadLocalStorage()
{
    if (localStorage.getItem("saved") != null)
    {
        place.value = localStorage.getItem("location");
        numResults.value = localStorage.getItem("results");
        // looping through the radio buttons to find the checked one
        document.querySelector("#any").checked = false;
        let language = localStorage.getItem("language");
        for (let r of document.querySelectorAll(`input[name="language"]`))
        {
            if (r.value == language)
            {
                r.checked = true;
                return;
            }
        }
        // if nothing gets checked, the checked one is other
        other.checked = true;
        other.value = language;
        otherText.value = language;
        otherText.disabled = false;
    }
}

function toggleCollapse()
{
    collapsed = !collapsed;
    collapse.innerHTML = collapsed ? "▲" : "▼";
    for (let i of document.querySelectorAll(".collapsable"))
    {
        i.hidden = collapsed;
    }
    controls.dataset.collapsed = collapsed;
}

export {init};
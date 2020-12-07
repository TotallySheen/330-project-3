function downloadFile(url,callbackRef){
    const xhr = new XMLHttpRequest();

    xhr.onerror = (e) => console.log("error");

    xhr.onload = (e) => {
        const headers = e.target.getAllResponseHeaders();
        const jsonString = e.target.response;
        console.log(`headers = ${headers}`);
        console.log(`jsonString = ${jsonString}`);
        callbackRef(jsonString);
    }

    xhr.open("GET",url);

    console.log(url);

    xhr.send();
}

export {downloadFile};
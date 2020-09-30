function processParams() {
    let paramstr = window.location.search.substr(1);
    let paramarr = paramstr.split("&");
    let params = [];
    for (let i = 0; i < paramarr.length; i++) {
        let tmparr = paramarr[i].split("=");
        params[tmparr[0]] = tmparr[1];
    }
    return params;
}


async function load(){
try {
    let params = processParams();
    let response = await fetch(`/productos/${params["index"]}`);
    console.log(response);
    if (response.ok) {
        let t = await response.json();
        document.querySelector("#nombre").innerHTML = t['producto_nombre'];
        document.querySelector("#precio").innerHTML = t['precio'];
    }
    else
    //en el practico estaba con container pero yo no hice el div container en el html
    document.querySelector("#nombre").innerHTML = "<h1>Error - Failed URL!</h1>";
}
catch (response) {
    console.log(response);
    document.querySelector("#nombre").innerHTML = "<h1>Connection error</h1>";
};
}

load();
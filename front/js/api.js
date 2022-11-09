const API_ENDPOINT = 'http://localhost:3000/api/products/';
async function apiCall(endpoint = API_ENDPOINT) {
    try {
        let response = await fetch(endpoint)
        return response.json();
        
    } catch (error) {
        console.error(error)
        alert ("an error occured sorry")
    }
}


   // fetch('http://localhost:3000/api/products')
    // .then(function(response) {
    //     return response.json();
    // })
    // .then(function(data) {
let orderNumber = document.getElementById('orderId');

//get the conformation number:
const getOrderId = () => {
    let searchParams = new URLSearchParams(window.location.search);
    return searchParams.get('orderId');
}

//add the conformation number to the HTML
const addConformNum = () => {
    orderNumber.innerText = getOrderId();
}

//call the function that add the conformation number to the html
addConformNum();

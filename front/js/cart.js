//receive localStorage data:
const getCartProducts = () => { 
    //If the condition before the ? is falsy, it returns an empty array
    return JSON.parse(localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem('cart')) : []; 
}

const array = getCartProducts();
let totalQuantity = document.getElementById("totalQuantity");
let totalPrice = document.getElementById("totalPrice");
let header = document.querySelector('h1');

//Message in case of empty cart:
const emptyCart = () => {
    if(array.length === 0) {
        header.innerText = 'No product added to the cart';
    }
}

//Use the HTML template to add the product details
async function createAndSetAttributesLoop (products) {
    let response = await apiCall();
    //console.log(response);
    for (let product of  products) {
        let section = document.getElementById("cart__items")
        let template = document.getElementById('cart-template').content;
        let cartTemplate = document.importNode(template, true);
        console.log(product);
        console.log(product.id);
        let prod = response.find(elmt => elmt._id === product.id);
        let price = prod.price;

        cartTemplate.querySelector(".cart__item").dataset.id = product.id;
        cartTemplate.querySelector(".cart__item").dataset.color = product.color;
        cartTemplate.querySelector(".cart__item__img > img").src = product.imageUrl;
        cartTemplate.querySelector(".cart__item__img > img").alt = product.imagealtTxt;
        cartTemplate.querySelector(".cart__item__content__name").innerText = product.name;
        cartTemplate.querySelector(".cart__item__content__color").innerText = product.color;
        cartTemplate.querySelector(".cart__item__content__price").innerText =  price;
        cartTemplate.querySelector(".cart__item__content__price").setAttribute("data-price",price);
        cartTemplate.querySelector(".cart__item__content__settings__quantity > input").value = product.quantity;
        section.append(cartTemplate);
    }
}

//Remove the product from the cart page and from the local storage
const deleteItem = () => {

    const deleteButton = document.querySelectorAll(".deleteItem");
    deleteButton.forEach((item, index) => {
        item.addEventListener('click', ($event) => {
            if (index === 0) {
                array.shift();
                localStorage.setItem("cart", JSON.stringify(array));
                window.location.reload();
            }
                array.splice(index, index);
                localStorage.setItem("cart", JSON.stringify(array));
                window.location.reload();
        });
    });
}

//Edit the quantity of products:
const changeQuantity = () => {

    const itemQuantity = document.querySelectorAll(".itemQuantity");
    
    itemQuantity.forEach((item, index) => {
        item.addEventListener('change', ($event) => {
            array[index].quantity = Number($event.target.value);
            localStorage.setItem("cart", JSON.stringify(array));
            window.location.reload();
        });
    });
}

//Calculate the total quantity:
const calctotalQuantity = () => {
    let total = 0;
    for (let i = 0; i < array.length; i++) {
        total += Number(array[i].quantity);
    }
    return totalQuantity.innerText = total;
}

//Calculate the total price:
const calcTotalPrice = async () => {
    let total = 0;
    let response = await apiCall();

    for (let i = 0; i < array.length; i++ ){
        let prod = response.find(elmt => elmt._id === array[i].id)
        total += prod.price * array[i].quantity;
    }
    return totalPrice.innerText = total;
}

const loadCartProducts = async () => {
    emptyCart();
    await createAndSetAttributesLoop(array)
    deleteItem();
    changeQuantity();
    calctotalQuantity();
    await calcTotalPrice();
}
loadCartProducts();

//***Sending order to the server***//

//get id's of the products:
const arrayIds = array.map((item) => {
    return item.id;
})

//API post endpoint:
const API_ENDPOINT_POST = 'http://localhost:3000/api/products/order';

//API post function
async function apiPost(options) {
    try {
        let response = await fetch(API_ENDPOINT_POST, options)
        let data = await response.json();
        window.location.href = `../html/confirmation.html?orderId=${data.orderId}`;
        window.localStorage.clear();
     } catch (error) {
        console.log(error)
        alert('an error occured')
    }
}

//Submit form and products:
const sendPost =  () => {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        try {
            let products=  arrayIds;    //array of product ids

            const contact = {           //contact object
                firstName: firstName.value,
                lastName: lastName.value,
                address: address.value,
                city: city.value,
                email: email.value,
            };
            
            const options = {           //create post object
                method: 'POST',
                headers: {
                "content-type": "application/json; charset=utf-8",
                },
                body: JSON.stringify({contact, products}),
                };
        
            await apiPost(options);

        } catch(error) {
            console.error('An error occurred while sending your order:', error);
        };
    });
}

sendPost();









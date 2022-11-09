//receive localStorage data:
const getCartProducts = () => { 
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

//return the data
const apiData = async () => {
    let data = await apiCall();
    return data;
}

//find the price of the product using the product id
const productPrice = async (id) => {
        await apiData()
        .then(data => {
            for (i = 0; i < array.length; i++) {
                let elmt = data.find((emt => emt._id == id));
                price= elmt.price;
                console.log("The price  is ", price);
                return price;
            }
        });
}

//Use the HTML template to add the product details
async function createAndSetAttributesLoop (products) {
    let response = await apiData();
    for (let product of  products) {
        let section = document.getElementById("cart__items")
        let template = document.getElementById('cart-template').content;
        let cartTemplate = document.importNode(template, true);
        let prod = response.find(elmt => elmt._id === product.id)
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
    let response = await apiData();

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
    calcTotalPrice();

}
loadCartProducts();


//***Form validation using RegEx:***//

//Form elements:
const form = document.querySelector('.cart__order__form');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const address = document.getElementById('address');
const city = document.getElementById('city');
const email = document.getElementById('email');
const submitBtn = document.getElementById('order');
const inputElementAll = document.querySelectorAll('input');

//Error messages paragraph:
const firstNameErrorMsg = document.getElementById('firstNameErrorMsg');
const lastNameErrorMsg = document.getElementById('lastNameErrorMsg');
const addressErrorMsg = document.getElementById('addressErrorMsg');
const cityErrorMsg = document.getElementById('cityErrorMsg');
const emailErrorMsg = document.getElementById('emailErrorMsg');

//regEx:
let regexName = /^[a-zA-Z]{3,}$/;
let regexAddress = /^([0-9]{1,4})([A-Za-z\.\-\s\,\']{6,})([A-Za-z\.\-\,\']{1,})$/;
let regexEmail = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;

//messages in case of invalid input field
let errorNameText = "This field has to contain only letters and at least 3 character long.";
let errorAddressText = "This field has to start with the house number following with the name of the street";
let errorEmailText = "It is not a valid email address";

//Set valid input style
const validInput = (valid,text) => {
    valid.style.border = "3px solid green";
    text.innerText = null;
    submitBtn.removeAttribute('disabled');
}

//Set invalid input style
const invalidInput = (invalid, text) => {
    invalid.style.border = "3px solid red";
    text.style.color = "red";
    submitBtn.setAttribute('disabled', 'true');
}

//Validate input field using regEx:
const validateInputField = (element, error, expression, message) => {
    element.addEventListener("input", ($event) => {
        let regex = expression;
        let result = regex.test($event.target.value);
        if (result) {
            validInput(element, error);
            return true;
        } else {
            invalidInput(element, error);
            error.innerText = message;
            return false;
        }
    })
}

//Call validate function
validateInputField(firstName,firstNameErrorMsg,regexName, errorNameText);
validateInputField(lastName,lastNameErrorMsg,regexName, errorNameText);
validateInputField(city,cityErrorMsg,regexName, errorNameText);
validateInputField(address,addressErrorMsg,regexAddress,errorAddressText);
validateInputField(email,emailErrorMsg,regexEmail,errorEmailText);

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
const sendPost = () => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
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
    
        apiPost(options);
    })
}

sendPost();









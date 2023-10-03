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
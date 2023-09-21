function getId() {
    let searchParams = new URLSearchParams(window.location.search);
    return searchParams.get('id');
}

function getQty() {
    return Number(document.getElementById('quantity').value)
}

function getColor () {
    return document.getElementById('colors').value;
}

//Create HTML elements
function createProductElements() {
    const itemImg = document.querySelector('.item__img');
    const itemPrice = document.getElementById('price');
    const itemName = document.getElementById('title');
    const itemDescription = document.getElementById('description');
    const itemSelect = document.getElementById('colors');
    const addingButton = document.getElementById('addToCart');
    const quantity = document.getElementById('quantity');
    let chosenProductImg = document.createElement('img');

    return {itemImg, itemPrice, itemName, itemDescription, itemSelect, addingButton, quantity, chosenProductImg}
}

//Assign the data values to the HTML elements
function getChosenProduct() {
    
    apiCall(API_ENDPOINT+getId())
    .then(function(data) {
        
        bindDataToElmts(data, createProductElements());

        document.getElementById('addToCart').addEventListener('click', ($event) => {
            $event.preventDefault();
            
            if(checkQuantity(getQty) && getColor()) {
                addProductsToArray(data);
                alert("Product has added to the cart!");
                window.location.href = 'http://127.0.0.1:5500/front/html/index.html';
            } else {
                //display error message
                alert("Choose a colour and quantity!");
            }
        });
    })
    .catch(error => { console.error(error)})
}


function bindDataToElmts(data, object) {
    const {itemImg, itemPrice, itemName, itemDescription, itemSelect, addingButton, quantity, chosenProductImg} = object;
    for ( let i = 0; i < data.colors.length; i++) {
        const colorOption = document.createElement('option');
        colorOption.setAttribute('value', data.colors[i]);
        colorOption.innerText = data.colors[i];
        itemSelect.appendChild(colorOption);
    }
    
    //Assigning data values to the element:
    chosenProductImg.setAttribute('src', data.imageUrl);
    chosenProductImg.setAttribute('alt', data.altTxt);
    itemName.innerText = data.name;
    itemPrice.innerText = data.price;
    itemDescription.innerText = data.description;

    //Adding children to the parent node:
    itemImg.appendChild(chosenProductImg);
}

function checkQuantity() {
    if(getQty() <= 0 || getQty() > 100) {
        return false;
    } else { return true}
 }

//add product to an array and save it into to localStorage
const addProductsToArray = (data) => {

    let cartProducts = JSON.parse(localStorage.getItem('cart'));

    let addedProduct = {
        id: data._id,
        color:  getColor(),
        quantity:  getQty(),
        imageUrl: data.imageUrl,
        name: data.name,
        imageAltTxt: data.altTxt,
    }

    console.log(cartProducts);
    console.log(addedProduct);
    
    
    if(cartProducts != null || cartProducts != undefined) {
        let res = cartProducts.find(elmt => elmt.id == addedProduct.id && elmt.color == addedProduct.color )
        if(res != undefined) {
            res.quantity = getQty()
            localStorage.setItem("cart", JSON.stringify(cartProducts))
        } else {
            cartProducts.push(addedProduct)
            localStorage.setItem("cart", JSON.stringify(cartProducts))
        }
       
    } else {
       let cartProducts = [];
       cartProducts.push(addedProduct)
       localStorage.setItem("cart",JSON.stringify(cartProducts))
    }
    //cartProducts.push(addedProduct);
    quantity.value = 0;
}


getChosenProduct();

















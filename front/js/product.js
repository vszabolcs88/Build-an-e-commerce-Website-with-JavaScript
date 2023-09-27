//Retrieve the value of id:
const getId = () => {
    let searchParams = new URLSearchParams(window.location.search);
    return searchParams.get('id');
}
//Retrieve quantity from input field:
const getQty = () => {
    return Number(document.getElementById('quantity').value)
}
//Retrieve colour from input field:
const getColor = () => {
    return document.getElementById('colors').value;
}

//Create HTML elements and return them as an object:
const createProductElements = () => {
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
const getChosenProduct = async () => {
    
    await apiCall(API_ENDPOINT+getId())
    .then(function(data) {
        
        bindDataToElmts(data, createProductElements());

        document.getElementById('addToCart').addEventListener('click', ($event) => {
            $event.preventDefault();
            
            if(checkQuantity(getQty) && getColor()) {
                addProductsToArray(data);
                alert("Product has added to the cart!");
                window.location.href = `../html/index.html`
            } else {
                //display error message
                alert("Choose a colour and quantity!");
            }
        });
    })
    .catch(error => { console.error(error)})
}


const bindDataToElmts = (data, object) => {
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

const checkQuantity = () => {
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

    if(cartProducts != null || cartProducts != undefined) {
        let res = cartProducts.find(elmt => elmt.id == addedProduct.id && elmt.color == addedProduct.color )
        if(res != undefined) {
            res.quantity += getQty()
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
    console.log(cartProducts);

    // if(cartProducts != null || cartProducts != undefined) {
    //     for (x in cartProducts) {
    //         if(cartProducts[x].id = addedProduct.id && cartProducts[x].color == addedProduct.color) {
    //             cartProducts[x].quantity += addedProduct.quantity;
    //             console.log(cartProducts);
    //         }
    //     } 
    //     localStorage.setItem("cart", JSON.stringify(cartProducts));
       
    // } else {
    //    let cartProducts = [];
    //    cartProducts.push(addedProduct);
    //    localStorage.setItem("cart",JSON.stringify(cartProducts));
    // }
    //cartProducts.push(addedProduct);
    quantity.value = 0;
}


getChosenProduct();

















const items = document.getElementById('items');

// Create HTML elements and return them as an object:
const createElements = () => {
        let linkToItem = document.createElement('a');
        let productArticle = document.createElement('article');
        let productImage = document.createElement('img');
        let productName = document.createElement('h3');
        let productDescrtiption = document.createElement('p');
        return {linkToItem, productArticle, productImage, productName, productDescrtiption}
}

//Retrieve data from the API and creates HTML elements for each product:
 const getAllProducts = async () => {
        try {
                let data = await apiCall();
                for (let i = 0; i < data.length; i++) {

                        const {linkToItem, productArticle, productImage, productName, productDescrtiption} = createElements();
                        let link = './product.html?id=' + data[i]._id;
                
                        //Assigning data values to the elements:
                        productName.textContent = data[i].name;
                        productDescrtiption.textContent = data[i].description;
                        productImage.setAttribute('src', data[i].imageUrl);
                        productImage.setAttribute('alt', data[i].altTxt);
                        linkToItem.setAttribute('href', link);

                        //Adding childeren to the parent node;
                        productArticle.appendChild(productImage);
                        productArticle.appendChild(productName);
                        productArticle.appendChild(productDescrtiption);
                        items.appendChild(linkToItem);
                        linkToItem.appendChild(productArticle);
                }
        } catch(error) {
                console.error("Something went wrong!", error);
        }
}
getAllProducts();






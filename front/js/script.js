const items = document.getElementById('items');

function createElements() {
        let linkToItem = document.createElement('a');
        let productArticle = document.createElement('article');
        let procuctImage = document.createElement('img');
        let productName = document.createElement('h3');
        let productDescrtiption = document.createElement('p');
        return {linkToItem, productArticle, procuctImage, productName, productDescrtiption}
}

async function getProducts() {

        let data = await apiCall();
        for (let i = 0; i < data.length; i++) {

                const {linkToItem, productArticle, procuctImage, productName, productDescrtiption} = createElements();
                let link = './product.html?id=' + data[i]._id;
                
                //Assigning data values to the elements:
                productName.textContent = data[i].name;
                productDescrtiption.textContent = data[i].description;
                procuctImage.setAttribute('src', data[i].imageUrl);
                procuctImage.setAttribute('alt', data[i].altTxt);
                linkToItem.setAttribute('href', link);

                //Adding childeren to the parent node;
                
                productArticle.appendChild(procuctImage);
                productArticle.appendChild(productName);
                productArticle.appendChild(productDescrtiption);
                items.appendChild(linkToItem);
                linkToItem.appendChild(productArticle);
       }
}



getProducts();

//URLSearchParams





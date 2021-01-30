
const basket = document.querySelector('.basket');
const basketDropdown = document.querySelector('.basket-dropdown');
const counter = document.querySelector('.counter');
const container = document.querySelector('.container');
const addToBasketBtn = document.querySelectorAll('.basket-button');
const list = document.getElementById('list');
const totalPrice = document.createElement('p');
let cart = [];


const products = [
    {
        id: 1,
        title: "Baconator",
        price: '14$',
        img: 'https://res.cloudinary.com/glovoapp/w_680,h_240,c_fit,f_auto,q_auto/Products/rcevvuiijfbaibsr1k6s',
        quantity: 1
    },


    {
        id: 2,
        title: "Junior Baconator",
        price: '10$',
        img: 'https://res.cloudinary.com/glovoapp/w_680,h_240,c_fit,f_auto,q_auto/Products/yk8carryr48pnkz83lrb',
        quantity: 1
    },


    {
        id: 3,
        title: "Portabella Melt",
        price: '11$',
        img: 'https://res.cloudinary.com/glovoapp/w_680,h_240,c_fit,f_auto,q_auto/Products/fzeepj0pky6ywxejtckd',
        quantity: 1
    },


    {
        id: 4,
        title: "Steak Burger",
        price: '9$',
        img: 'https://res.cloudinary.com/glovoapp/w_680,h_240,c_fit,f_auto,q_auto/Products/ntrwfjb1ikdvscoja8wh',
        quantity: 1
    }
]
 

const createElement = (type, children) => {
    const node = document.createElement(type);

    if (children){
        if (typeof children === 'string'){
            const text = document.createTextNode(children);
            node.appendChild(text);
        }
        else if (Array.isArray(children)){
            children.forEach(item => {
                node.appendChild(item)
            })
        }
        else if (typeof children === 'object'){
            node.appendChild(children)
        }
    
    }
    return node;
}

products.forEach(product => {
    const card = createElement('div');
    console.log(card)
    card.classList.add('card');

    const productImage = createElement('img');
    productImage.setAttribute('src', product.img);

    const productTitle = createElement('h2', product.title);
    productTitle.classList.add('product-name');

    const productPrice = createElement('p', `Price: ${product.price}`);
    productPrice.classList.add('product-price');

    

    const buttonImg = createElement('img');
    buttonImg.setAttribute('src', './img/add-item.png');
    const addToCartBtn = createElement('button', buttonImg);
    addToCartBtn.classList.add('basket-button');

    const block = createElement('div', [productPrice, addToCartBtn]);
    block.classList.add('block')

    container.appendChild(card);
    card.appendChild(productImage);
    card.appendChild(productTitle);
    card.appendChild(block);
 


    addToCartBtn.addEventListener('click', function(){
        const clickedProduct = cart.filter(item => (item.id == product.id));

        if (clickedProduct.length){
            cart.map((item) => {
                if (item.id === product.id) 
                item.quantity = item.quantity + 1
                
                return item;
            })
            renderCart();
        }
        else {

            cart.push(product);
            renderCart();

        }

        countTotalPrice();
        countTotalQuantity();
    })

})



const renderCart = () => {
    list.innerHTML = ''

    cart.forEach(item => {
        list.innerHTML += `<li>${item.title} ${item.price} (${item.quantity}x)
        <div class="delete-item" onclick="deleteItem('${item.id}')" ></div></li>`
    
    })  
}

const deleteItem = (item) => {
        cart = cart.filter(elem => (elem.id != item));


        countTotalPrice();
        countTotalQuantity();
        renderCart();
}

const countTotalQuantity = () => {
    const totalQuantity = cart.reduce((total, product) => total + product.quantity,0);
    counter.textContent = totalQuantity;
}

const countTotalPrice = () => {
    const priceOfOneItem = cart.map(item => item.quantity * parseInt(item.price))
    const priceOfAllItems = priceOfOneItem.reduce((total, price) => total + price,0)
    totalPrice.textContent = "Total Price: " + priceOfAllItems + '$'
    basketDropdown.appendChild(totalPrice)
    
}


basket.addEventListener('click', () => {
    if (basketDropdown.style.display == 'block'){
        basketDropdown.style.display = 'none'
    } else {
        basketDropdown.style.display = 'block';
    }
})

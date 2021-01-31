'use strict'
const basket = document.querySelector('.basket');
const basketDropdown = document.querySelector('.basket-dropdown');
const counter = document.querySelector('.counter');
const container = document.querySelector('.container');
const addToBasketBtn = document.querySelectorAll('.basket-button');
const list = document.getElementById('list');
const totalPrice = document.createElement('p');
let cart = [];
let products = [];
 

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

const createCard = ({
    title,
    id,
    img,
    price
  }) => {
  
    const card = createElement('div');
  
    card.classList.add('card');
  
    const productImage = createElement('img');
    productImage.setAttribute('src', img);
  
    const productTitle = createElement('h2', title);
    productTitle.classList.add('product-name');
  
    const productPrice = createElement('p', `Price: ${price}`);
    productPrice.classList.add('product-price');
  
  
    const buttonImg = createElement('img');
    buttonImg.setAttribute('src', './img/add-item.png');
    const addToCartBtn = createElement('button', buttonImg);
    addToCartBtn.classList.add('basket-button');
  
    const block = createElement('div', [productPrice, addToCartBtn]);
    block.classList.add('block')
  
    card.appendChild(productImage);
    card.appendChild(productTitle);
    card.appendChild(block);
  
    addToCartBtn.addEventListener('click', function() {
      const clickedProduct = cart.filter(item => (item.id == id));
  
      if (clickedProduct.length) {
        cart.map((item) => {
          if (item.id === id)
            item.quantity = item.quantity + 1
  
          return item;
        })
        renderCart();
      } else {
  
        cart.push(product);
        renderCart();
  
      }
  
      countTotalPrice();
      countTotalQuantity();
    })
  
    return card;
  }
  
  
  fetch('https://6015ccf455dfbd00174ca967.mockapi.io/products')
    .then((res) => res.json())
    .then((data) => {
  
      products = data
        .filter((_, index) => index <= 4)
        .map(item => {
          item.quantity = 1;
          return item
        })
        .forEach((product) => {
  
          const card = createCard(product);
  
          container.appendChild(card);
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
    totalPrice.textContent = `Total Price: ${priceOfAllItems}$`
    basketDropdown.appendChild(totalPrice)
    
}


basket.addEventListener('click', () => {
    if (basketDropdown.style.display == 'block'){
        basketDropdown.style.display = 'none'
    } else {
        basketDropdown.style.display = 'block';
    }
})


const basket = document.querySelector('.basket');
const basketDropdown = document.querySelector('.basket-dropdown');
const counter = document.querySelector('.counter');
const addToBasketBtn = document.querySelectorAll('.basket-button');
const list = document.getElementById('list');
const totalPrice = document.createElement('p');
let cart = [];
let cartItem;
let cartAfterDelete;



basket.addEventListener('click', () => {
    if (basketDropdown.style.display == 'block'){
        basketDropdown.style.display = 'none'
    } else {
        basketDropdown.style.display = 'block';
    }
})


addToBasketBtn.forEach(function(item){
    item.addEventListener('click', function() {

        const clickedProduct = cart.filter(product => (product.id == this.dataset.id));

        if (clickedProduct.length){
            cart.map((product) => {
                if (product.id === this.dataset.id) 
                product.quantity ++             
            })
            renderCart();
        }
        else {
            const product = {
                id: this.dataset.id,
                title: this.dataset.title,
                price: this.dataset.price,
                quantity: 1
            }

            cart.push(product);
            cartItem = document.createElement('li');

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
        cartAfterDelete = cart.filter(product => (product.id !== item))
        cart = cartAfterDelete;
        console.log(cart)


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
    totalPrice.textContent = "Total Price: $" + priceOfAllItems
    basketDropdown.appendChild(totalPrice)
    
}




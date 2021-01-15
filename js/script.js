
let basket = document.querySelector('.basket');
let basketDropdown = document.querySelector('.basket-dropdown');
let counter = document.querySelector('.counter');
let addToBasketBtn = document.querySelectorAll('.basket-button');
let list = document.getElementById('list');
let totalPrice = document.createElement('p');
let total = 0;
let num = 0;
let cart = [];


basket.addEventListener('click', function() {
    if (basketDropdown.style.display == 'block'){
        basketDropdown.style.display = 'none'
    } else {
        basketDropdown.style.display = 'block';
    }
})


for (let i = 0; i < addToBasketBtn.length; i++) {
    addToBasketBtn[i].addEventListener('click', function() {

        itemCounter();
        
        let product = {
            id: this.dataset.id,
            title: this.dataset.title,
            price: this.dataset.price,
            quantity: '',
        }


        cart.push(product)
        
        let item = document.createElement('li');
        let deleteItem = document.createElement('div');
        total += parseInt(product.price)


        
        item.textContent = product.title + " " + product.price;
        deleteItem.classList.add('delete-item')

        cart.forEach(function(){

            totalPrice.textContent = 'Total: ' + total + '$';

            list.appendChild(item)
            item.appendChild(deleteItem)
            basketDropdown.appendChild(totalPrice)

        })

        deleteItem.addEventListener('click', function(){
            total -= parseInt(product.price)
            totalPrice.textContent = 'Total: ' + total + '$';
            list.removeChild(item)

            num--;
            counter.textContent = num;

        })         
        
    })
}


    function itemCounter(){
        num++;
        counter.textContent = num;
    }


    
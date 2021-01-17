
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
        }


        cart.push(product)
        
        let item = document.createElement('li');
        item.textContent = product.title + " " + product.price;

        let deleteItem = document.createElement('div');
        deleteItem.classList.add('delete-item')

        price = parseInt(product.price)
        total += price;
        

        // product quantity number spinner

        let value = 1;
        let quantityRow = document.createElement('div');
        quantityRow.classList.add('quantity-row');
        let addQuantity = document.createElement('div');
        addQuantity.classList.add('add-quantity')
        let quantity = document.createElement('div');
        quantity.classList.add('quantity');
        let minusQuantity = document.createElement('div');
        minusQuantity.classList.add('minus-quantity');
        
        quantityRow.appendChild(minusQuantity);
        quantityRow.appendChild(quantity);
        quantityRow.appendChild(addQuantity);
        quantity.innerText = '1';


        addQuantity.addEventListener('click', function (){
            value++;
            quantity.innerText = value;

            total+=price;
            totalPrice.textContent = 'Total: ' + total   + '$';

            
        })

        minusQuantity.addEventListener('click', function(){
            if (value > 1){
                value--;
                quantity.innerText = value;
                total-=price;
                totalPrice.textContent = 'Total: ' + total   + '$';
            }
        })


        // adding products to html 

        cart.forEach(function(){

            totalPrice.textContent = 'Total: ' + total   + '$';

            list.appendChild(item)
            item.appendChild(quantityRow)
            item.appendChild(deleteItem)
            basketDropdown.appendChild(totalPrice)

        })



        deleteItem.addEventListener('click', function(){
            total -=  value * price
            totalPrice.textContent = 'Total: ' + total   + '$';

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


    
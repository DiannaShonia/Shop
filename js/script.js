/* მოკლედ. ეს დავალება მოდი იყოს ონლაინ მაღაზიის ერთერთი ფუნქციონალის აწყობა ჯავასკრიპტით კერძოდ:

1. პირველი ეტაპი იქნება რომ ძაან მარტივი მარქაფი ააწო სადაც იქნება პროდუქტების ლისტი სიტყვაზე 
4 ან 5 ცალი პროდუქტი მონახაზს დავლინკავ ქვემოთ. https://prnt.sc/wg42h0
* მოკლედ გაქ პროდუქტების სია. ქარდები რაც არი ქვემოთ 4 ცალი. თითო ქარდს აქვს ფოტო, სათაური, ფასი
 და ფასის გვერდით რომ კუბიკია ეგ არი ღილაკი რომელზე დაკლიკებითაც ეს პროდუქტი უნდა ჩავარდეს კალათაში. 
 კალათაში რომ ჩავარდება პროდუქტი ზემოთ რომ არი "კალათა" მაგის გვერდით რიცხვი უნდ აგაიზარდოს სიტყვაზე 
 2 პროდუქტი თუა კალათაში 2 იქნება მანდ. მაგ კალათაზე დაკლიკებით უნდა ჩამოიშალოდ ის ვარდისფერი თუ რაფერიცაა
  დროფდაუნი და მაგ დროფდაუნში უნდა იყოს კალათაში დამატებული პროდუქტების ჩამონათვალი თავისი რაოდენობით
   და ბოლოს ქვემოთ ჯამური ფასი ყველასი.
2. ახლა უშუალოდ ჯავასკრიპტის მხარეს რა გჭირდება
 * კალათაში დამატების ღილაკზე დაკლიკებაზე უნდა აიღო ამ პროდუქტის სახელი ფასი და აიდი ეგენი შეგიძლია 
 პირდაპირ მაგ კალათის თილაკს გაუწერო ჰარდკოდად
  <button data-id="1" data-title="სახელი" data-price="100">კალათაში დამატება</button>. 
  კლიკზე ივენთიდან დაითრევ რაზეც დააკლიკე იმ ბათონს და მაგ ბათონიდან ამოაძრობ ამ dataატრიბუტებს.
   ეგ როგორ ამოაძრო დაგუგლე javascript how to get data attribute from element
* ამ ატრიბუტებს რომ დაითრევ უნდა შექმნა ობიექტი {id:'', name:'',price:'' } და მიანიჭებ ამათ 
მაგ ამოძრობილ მონაცემებს. ამის მერე უნდა შექმნა გლობალური ცვლადი  cart რომელიც იქნება მასივი და 
იმ ზემოთ შექმნილ ობიექტს ყოველ დაკლიკვაზე  და-push-ავ ამ მასივში. შედეგად გექნება მასივი რომელშიც 
შენახული გექნება ყველა კალათასი დამატებული ტიპი. ამის მერე უკვე ეს მასივი უნდა გამოაცინო საიტზე. 
ანუ იმ ვარდისფერ ბოქსში სადაც ეგ ლისტი უნდა ჩანდეს. აქ დაგჭირდება რომ ეგ მასივი გაციკლო  foreach-ით და 
თითო იტერაციაზე უნდ აგამოიყენო "HTML DOM appendChild() Method" რომ დომში დაამატო ეგ ლისტები. მოდი ჯერ ეს 
იყოს და მერე რაღაცები მივამატოთ.  */



let basket = document.querySelector('.basket');
let basketDropdown = document.querySelector('.basket-dropdown');
let counter = document.querySelector('.counter');
let addToBasketBtn = document.querySelectorAll('.basket-button')
let num = 0;
let cart = [];
let list = document.getElementById('list');
let totalPrice = document.createElement('p');


basket.addEventListener('click', function() {
    if (basketDropdown.style.display == 'block'){
        basketDropdown.style.display = 'none'
    } else {
        basketDropdown.style.display = 'block';
    }
})



for (let i = 0; i < addToBasketBtn.length; i++) {
    addToBasketBtn[i].addEventListener('click', function() {
        num++;
        counter.textContent = num;

        
        
        let product = {
            id: this.dataset.id,
            title: this.dataset.title,
            price: this.dataset.price,
            quantty: " "
        }

        cart.push(product)
        console.log(cart)

        
        let item = document.createElement('li');
        let deleteItem = document.createElement('div');
        let total = 0;
        let quantity = '(1x)';



        deleteItem.addEventListener('click', function(){
            
            list.removeChild(item)
            
        })
        
        item.textContent = product.title + " " + product.price + ' ' + quantity;
        deleteItem.classList.add('delete-item')

        cart.forEach(function(){

            list.appendChild(item)
            total += parseInt(product.price)
            totalPrice.textContent = 'Total: ' + total + '$';
            basketDropdown.appendChild(totalPrice)
            item.appendChild(deleteItem)
        })

    })
    }
    


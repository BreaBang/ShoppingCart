let label = document.getElementById('label')
let shoppingCart = document.getElementById('shopping-cart')
let basket = JSON.parse(localStorage.getItem("cartData")) || [];

let calculation = () => {
    let cartIcon = document.getElementById("cartItemsAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y)=> x+y, 0);
    
};
calculation();

let generateCartItems = () => {
    if (basket.length !== 0){
        return (shoppingCart.innerHTML = basket
            .map((x) => {
                let { id, item } = x;
                let search = shopItemsData.find((y) => y.id === id) || [];
                return  `<div class="cart-item">
            <img width = "100" src=${search.img} alt="" />
            <div class="details">
            <div class="title-price-x">
                <h4 class="title-price">
                <p>${search.name}</p>
                <p class="cart-item-price">${search.price}</p>
                </h4>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16" onclick="removeItem(${id})">
<path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
</svg>
            </div>
            <div class="cart-buttons">
                <div class="buttons">
                    <!-- Minus -->
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-dash" viewBox="0 0 16 16" onclick="decrease(${id})" >
                        <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                      </svg>
                    <!-- Quantity -->
                    <div id= ${id} class="quantity">${item}</div>
                    <!-- Plus -->
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16" onclick="increase(${id})">
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                      </svg>
                </div>
            </div>
            <h3>$ ${item * search.price}</h3>
            </div>
            </div>`
           
        })
        .join(""));
    } else {
        shoppingCart.innerHTML=``
        label.innerHTML = `
        <h2>Cart is Empty</h2>
        <a href="index.html">
        <button class="HomeBTN">Back to Home</button>
        </a>
        `
    }
}

generateCartItems()

let increase = (id)=>{
    let selectedItem = id;
    let search = basket.find((x)=> x.id === selectedItem.id);

    if(search===undefined){
        basket.push({
            id: selectedItem.id,
            item: 1,
        })
    } else{
        search.item += 1;
    }
    generateCartItems();
    update(selectedItem.id)
     // Setting item in the local storage.
   localStorage.setItem("cartData", JSON.stringify(basket));
}
let decrease = (id)=>{
    let selectedItem = id;
    let search = basket.find((x)=> x.id === selectedItem.id);
    if(search === undefined) {return}
     else if(search.item === 0) {return}
     else{
        search.item -= 1;
    }
    update(selectedItem.id)
    basket = basket.filter((x)=>x.item !== 0 );
    generateCartItems();
    console.log(basket)
    localStorage.setItem("cartData", JSON.stringify(basket));
}
let update = (id) => {
    let search = basket.find((x) => x.id === id );
    document.getElementById(id).innerHTML = search.item
    calculation();
    totalAmount();
};
let removeItem = (id) => {
    let selectedItem = id
    basket = basket.filter((x) => x.id !== selectedItem.id);
    generateCartItems();
    totalAmount();
    calculation();
    localStorage.setItem("cartData", JSON.stringify(basket));
}
let clearCart = () => {
    basket = []
    generateCartItems();
    calculation();
    localStorage.setItem("cartData", JSON.stringify(basket));
}

let totalAmount = () => {
    if(basket.length !== 0){
        let amount = basket
        .map((x)=>{
            let {item, id} = x;
            let search = shopItemsData.find((y) => y.id === id) || [];
            return item * search.price;
        })
        .reduce((x,y) => x + y, 0);

        label.innerHTML = `
        <h2>Total: $ ${amount}</h2>
        <button class="checkout">Checkout</button>
        <button onclick="clearCart()" class="removeAll">Clear Cart</button>
        `;
        
    } else {
        return
    }
};
totalAmount();
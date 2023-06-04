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
                <h4 class="title">
                <p>${search.name}</p>
                <p>${search.price}</p>
                </h4>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
<path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
</svg>
            </div>
            <div class="cart-buttons"></div>
            <h3></h3>
            </div>
            </div>`;
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
let basket = JSON.parse(localStorage.getItem("cartData")) || [];

let calculation = () => {
    let cartIcon = document.getElementById("cartItemsAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y)=> x+y, 0);
    
};
calculation();
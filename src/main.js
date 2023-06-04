let shop = document.getElementById('shop');
console.log(shop)

let shopItemsData = [{
    id:"O1",
    name: "Sound Bath",
    price: "$15",
    desc: "Relax and recharge. Online group class. 45-minutes.",
    img: "/images/img.1.jpg"
}, 
{
    id:"O2",
    name: "Private Class",
    price: "$42",
    desc: "Online 45-minuges session tailored to your needs.",
    img: "/images/img.2.jpg"
}, 
{
    id:"O3",
    name: "Breath Workshop",
    price: "$20",
    desc: "Online group workshop covering breath work basics.",
    img: "/images/img.3.jpg"
}, 
{
    id:"O4",
    name: "Group Hatha Class",
    price: "$15",
    desc: "Find balance and restoration. Online group class. 45-minutes.",
    img: "/images/img.4.jpg"
}]

let basket = JSON.parse(localStorage.getItem("cartData")) || [];

let generateShop = () => {
    return (shop.innerHTML = shopItemsData
        .map((x)=>{
            let {id, name, price, desc, img} = x;
            let search = basket.find((x) => x.id === id) || [];
        return `
        <div class="item" id=product-id-${id}>
        <img src=${img} class="shop-image">
        <div class="details">
            <h3>${name}</h3>
            <p>${desc}</p>
            <div class="price-quantity">
                <h2>${price}</h2>
                <div class="buttons">
                    <!-- Minus -->
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-dash" viewBox="0 0 16 16" onclick="decrease(${id})" >
                        <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                      </svg>
                    <!-- Quantity -->
                    <div id= ${id} class="quantity">${search.item === undefined? 0 : search.item}</div>
                    <!-- Plus -->
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16" onclick="increase(${id})">
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                      </svg>
                </div>
            </div>
        </div>
    </div>
`
    }).join(""));
};

generateShop();

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
    console.log(basket)
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
    console.log(basket)
    localStorage.setItem("cartData", JSON.stringify(basket));
}
let update = (id) => {
    let search = basket.find((x) => x.id === id );
    document.getElementById(id).innerHTML = search.item
    calculation()
};

let calculation = () => {
    let cartIcon = document.getElementById("cartItemsAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y)=> x+y, 0);
    
};
calculation();
 let mainheader = document.querySelector(".mainheader")
let Menu = document.querySelector("#btn1")
let navbar  = document.querySelector(".navbar")

Menu.addEventListener("click",() =>{
    Menu.classList.toggle("fa-times");
    navbar.classList.toggle("active");

   
});
window.onscroll = () => {
    Menu.classList.remove("fa-times");
    navbar.classList.remove("active");

     if(window.scrollY > 150) {
        mainheader.classList.add("active");
    }
    else{
        mainheader.classList.remove("active")
    }
};
 /* sidebar section start  */



 const cartIcon = document.getElementById("cartIcon");
const cartSidebar = document.getElementById("cartSidebar");
const closeCart = document.getElementById("closeCart");
const cartItemsContainer = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

let cart = [];

// Event listeners
cartIcon.addEventListener("click", () => {
    cartSidebar.classList.add("open");
});

closeCart.addEventListener("click", () => {
    cartSidebar.classList.remove("open");
});

document.querySelectorAll(".btn5").forEach((btn, index) => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();

        const productBox = btn.closest(".box1");
        const imgSrc = productBox.querySelector("img").src;
        const title = productBox.querySelector("h3").innerText;
        const priceText = productBox.querySelector(".spn6").innerText.replace("$", "");
        const quantity = parseInt(productBox.querySelector("input").value);

        addToCart({ imgSrc, title, price: parseFloat(priceText), quantity });
    });
});

function addToCart(product) {
    const existing = cart.find(item => item.title === product.title);
    if (existing) {
        existing.quantity += product.quantity;
    } else {
        cart.push({ ...product });
    }
    updateCart();
}

function updateCart() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        const itemDiv = document.createElement("div");
        itemDiv.classList.add("cart-item");

        itemDiv.innerHTML = `
            <img src="${item.imgSrc}" alt="">
            <div class="cart-item-details">
                <p>${item.title}</p>
                <div class="qty-btns">
                    <button onclick="changeQty(${index}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="changeQty(${index}, 1)">+</button>
                </div>
            </div>
        `;

        cartItemsContainer.appendChild(itemDiv);
    });

    cartCount.innerText = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartTotal.innerText = `$${total.toFixed(2)}`;
}

function changeQty(index, delta) {
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    updateCart();
}


 

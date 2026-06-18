"use strict";
// In-memory cart state (not persisted until checkout)
let cart = [];
// DOM element references (cast to proper HTML types for TS type safety)
const productUsername = document.getElementById("Username");
const emailProduct = document.getElementById("Email");
const cartList = document.getElementById("cartList");
const cartTotal = document.getElementById("cartTotal");
const username1 = document.getElementById("name");
const email1 = document.getElementById("userEmail");
const age1 = document.getElementById("usrage");
const name1 = document.getElementById("name");
const email3 = document.getElementById("email");
const price2 = document.getElementById("price");
const username3 = document.getElementById("username1");
const ul = document.getElementById("productTable");
const allprod = document.getElementById("allprod");
const cheaperprod = document.getElementById("cheaperprod");
const expprod = document.getElementById("expprod");
// Registers a new user, then subscribes them to the newsletter
async function sendUsr(e) {
    e.preventDefault();
    const UserResponse = await fetch("http://localhost:8080/users/addUsers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username: username1.value,
            email: email1.value,
            age: Number(age1.value)
        })
    });
    const UserData = await UserResponse.json();
    const NewsletterResponse = await fetch("http://localhost:8080/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email1.value })
    });
    const NewsletterData = await NewsletterResponse.json();
}
// Creates a new product and appends it to the on-page product list
async function sendProduct(e) {
    e.preventDefault();
    const ProductResponse = await fetch("http://localhost:8080/addProducts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            emailUser: email3.value,
            productName: name1.value,
            price: parseFloat(price2.value),
            username: username3.value
        })
    });
    const ProductData = await ProductResponse.json();
    const li2 = document.createElement("li");
    li2.textContent = `${ProductData.productName}, price: ${ProductData.price}`;
    ul.appendChild(li2);
    if (!ProductResponse.ok) {
        console.log("error while sending product!");
    }
}
// Submits a shipping/billing address tied to a user
async function sendAddrss(e) {
    e.preventDefault();
    const name1 = document.getElementById("validationServer01");
    const email1 = document.getElementById("validationServerEmail");
    const country1 = document.getElementById("validationServer03");
    const street1 = document.getElementById("validationServer04");
    const username1 = document.getElementById("validationServer05");
    fetch("http://localhost:8080/address/addAddress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: name1.value,
            country: country1.value,
            street: street1.value,
            email: email1.value,
            username: username1.value
        })
    })
        .then(async (res) => {
        const text = await res.text();
        console.log("STATUS:", res.status);
        console.log("RESPONSE:", text);
        if (!res.ok)
            throw new Error(text);
        return text;
    })
        .then((data) => {
        console.log("User Saved:", data);
    })
        .catch((err) => console.error(err));
}
// Fetches and renders the list of expensive products
async function getExpensiveProd(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:8080/expensiveProducts");
    const data = await response.json();
    expprod.innerHTML = "";
    data.forEach((p) => {
        const li = document.createElement("li");
        li.textContent = `${p.productName} - ${p.price}`;
        expprod.appendChild(li);
    });
}
// Fetches and renders all products
async function getprod(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:8080/products");
    const data = await response.json();
    allprod.innerHTML = "";
    data.forEach((p) => {
        const li = document.createElement("li");
        li.textContent = `${p.productName} - ${p.price}`;
        allprod.appendChild(li);
    });
}
// Fetches and renders cheaper products
async function getCheaperProd(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:8080/cheapProducts");
    const data = await response.json();
    cheaperprod.innerHTML = "";
    data.forEach((p) => {
        const li = document.createElement("li");
        li.textContent = `${p.productName} - ${p.price}`;
        cheaperprod.appendChild(li);
    });
}
// Adds an item to the cart and refreshes the cart UI
function addToCart(orderName, priceAtPurchase, productId) {
    cart.push({ orderName, priceAtPurchase, productId });
    renderCart();
}
// Empties the cart
function clearCart() {
    cart = [];
    renderCart();
}
// Redraws the cart list and total based on current cart state
function renderCart() {
    cartList.innerHTML = "";
    if (cart.length === 0) {
        const li = document.createElement("li");
        li.textContent = "Cart is empty.";
        cartList.appendChild(li);
        cartTotal.textContent = "0$";
        return;
    }
    let total = 0;
    cart.forEach((item, index) => {
        total += item.priceAtPurchase;
        const li = document.createElement("li");
        li.textContent = `${item.orderName} - ${item.priceAtPurchase}$`;
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = " X";
        deleteBtn.className = "btn btn-danger btn-sm ms-2";
        deleteBtn.onclick = () => removeFromCart(index, item.productId);
        li.appendChild(deleteBtn);
        cartList.appendChild(li);
    });
    cartTotal.textContent = `${total}$`;
}
// Removes an item from the cart, deleting it server-side first if it has a productId
async function removeFromCart(index, productId) {
    if (productId) {
        const res = await fetch(`http://localhost:8080/deleteProduct/${productId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        });
        if (!res.ok) {
            console.log("Delete failed:", res.status);
            return;
        }
    }
    cart.splice(index, 1);
    renderCart();
}
// Quick-add handlers for predefined demo products
function addProductChair(e) {
    e.preventDefault();
    fetch("http://localhost:8080/addProducts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productName: "Wooden Chair", price: 100 })
    })
        .then((res) => res.json())
        .then((data) => addToCart("Wooden Chair", 100, data.id));
}
function addProductBed(e) {
    e.preventDefault();
    fetch("http://localhost:8080/addProducts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productName: "Metal Frame Bed", price: 500 })
    })
        .then((res) => res.json())
        .then((data) => addToCart("Metal Frame Bed", 500, data.id));
}
function addProductBookshelf(e) {
    e.preventDefault();
    fetch("http://localhost:8080/addProducts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productName: "Oak Bookshelf", price: 600 })
    })
        .then((res) => res.json())
        .then((data) => addToCart("Bookshelf", 600, data.id));
}
// Saves cart + user info to sessionStorage, then redirects to checkout page
async function goToCheckout(e) {
    e.preventDefault();
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    const usernameInput = document.getElementById("checkoutUsername");
    const emailInput = document.getElementById("checkoutEmail");
    sessionStorage.setItem("cart", JSON.stringify(cart));
    sessionStorage.setItem("username", usernameInput.value);
    sessionStorage.setItem("email", emailInput.value);
    const response = await fetch("http://localhost:8080/users/addUsers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username: usernameInput.value,
            email: emailInput.value
        })
    });
    window.location.href = "checkout.html";
}

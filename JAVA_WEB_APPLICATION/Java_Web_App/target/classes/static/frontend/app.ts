"use strict";

// Shape of an item stored in the shopping cart
interface CartItem {
    orderName: string;
    priceAtPurchase: number;
    productId?: number;
}

// Shape of a product returned from the backend
interface Product {
    id: number;
    emailUser: string;
    productName: string;
    price: number;
    username: string;
}

// In-memory cart state (not persisted until checkout)
let cart: CartItem[] = [];

// DOM element references (cast to proper HTML types for TS type safety)
const productUsername = document.getElementById("Username") as HTMLInputElement;
const emailProduct = document.getElementById("Email") as HTMLInputElement;
const cartList = document.getElementById("cartList") as HTMLUListElement;
const cartTotal = document.getElementById("cartTotal") as HTMLSpanElement;
const username1 = document.getElementById("name") as HTMLInputElement;
const email1 = document.getElementById("userEmail") as HTMLInputElement;
const age1 = document.getElementById("usrage") as HTMLInputElement;
const name1 = document.getElementById("name") as HTMLInputElement;
const email3 = document.getElementById("email") as HTMLInputElement;
const price2 = document.getElementById("price") as HTMLInputElement;
const username3 = document.getElementById("username1") as HTMLInputElement;
const ul = document.getElementById("productTable") as HTMLUListElement;
const allprod = document.getElementById("allprod") as HTMLUListElement;
const cheaperprod = document.getElementById("cheaperprod") as HTMLUListElement;
const expprod = document.getElementById("expprod") as HTMLUListElement;

// Registers a new user, then subscribes them to the newsletter
async function sendUsr(e: Event): Promise<void> {
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
async function sendProduct(e: Event): Promise<void> {
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
    const ProductData: Product = await ProductResponse.json();
    const li2 = document.createElement("li");
    li2.textContent = `${ProductData.productName}, price: ${ProductData.price}`;
    ul.appendChild(li2);
    if (!ProductResponse.ok) {
        console.log("error while sending product!");
    }
}

// Submits a shipping/billing address tied to a user
async function sendAddrss(e: Event): Promise<void> {
    e.preventDefault();
    const name1 = document.getElementById("validationServer01") as HTMLInputElement;
    const email1 = document.getElementById("validationServerEmail") as HTMLInputElement;
    const country1 = document.getElementById("validationServer03") as HTMLInputElement;
    const street1 = document.getElementById("validationServer04") as HTMLInputElement;
    const username1 = document.getElementById("validationServer05") as HTMLInputElement;
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
        .then(async (res: Response) => {
            const text = await res.text();
            console.log("STATUS:", res.status);
            console.log("RESPONSE:", text);
            if (!res.ok) throw new Error(text);
            return text;
        })
        .then((data: string) => {
            console.log("User Saved:", data);
        })
        .catch((err: Error) => console.error(err));
}

// Fetches and renders the list of expensive products
async function getExpensiveProd(e: Event): Promise<void> {
    e.preventDefault();
    const response = await fetch("http://localhost:8080/expensiveProducts");
    const data: Product[] = await response.json();
    expprod.innerHTML = "";
    data.forEach((p: Product) => {
        const li = document.createElement("li");
        li.textContent = `${p.productName} - ${p.price}`;
        expprod.appendChild(li);
    });
}

// Fetches and renders all products
async function getprod(e: Event): Promise<void> {
    e.preventDefault();
    const response = await fetch("http://localhost:8080/products");
    const data: Product[] = await response.json();
    allprod.innerHTML = "";
    data.forEach((p: Product) => {
        const li = document.createElement("li");
        li.textContent = `${p.productName} - ${p.price}`;
        allprod.appendChild(li);
    });
}

// Fetches and renders cheaper products
async function getCheaperProd(e: Event): Promise<void> {
    e.preventDefault();
    const response = await fetch("http://localhost:8080/cheapProducts");
    const data: Product[] = await response.json();
    cheaperprod.innerHTML = "";
    data.forEach((p: Product) => {
        const li = document.createElement("li");
        li.textContent = `${p.productName} - ${p.price}`;
        cheaperprod.appendChild(li);
    });
}

// Adds an item to the cart and refreshes the cart UI
function addToCart(orderName: string, priceAtPurchase: number, productId?: number): void {
    cart.push({ orderName, priceAtPurchase, productId });
    renderCart();
}

// Empties the cart
function clearCart(): void {
    cart = [];
    renderCart();
}

// Redraws the cart list and total based on current cart state
function renderCart(): void {
    cartList.innerHTML = "";
    if (cart.length === 0) {
        const li = document.createElement("li");
        li.textContent = "Cart is empty.";
        cartList.appendChild(li);
        cartTotal.textContent = "0$";
        return;
    }
    let total = 0;
    cart.forEach((item: CartItem, index: number) => {
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
async function removeFromCart(index: number, productId?: number): Promise<void> {
    if (productId) {
        const res: Response = await fetch(`http://localhost:8080/deleteProduct/${productId}`, {
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
function addProductChair(e: Event): void {
    e.preventDefault();
    fetch("http://localhost:8080/addProducts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productName: "Wooden Chair", price: 100 })
    })
        .then((res: Response) => res.json())
        .then((data: Product) => addToCart("Wooden Chair", 100, data.id));
}

function addProductBed(e: Event): void {
    e.preventDefault();
    fetch("http://localhost:8080/addProducts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productName: "Metal Frame Bed", price: 500 })
    })
        .then((res: Response) => res.json())
        .then((data: Product) => addToCart("Metal Frame Bed", 500, data.id));
}

function addProductBookshelf(e: Event): void {
    e.preventDefault();
    fetch("http://localhost:8080/addProducts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productName: "Oak Bookshelf", price: 600 })
    })
        .then((res: Response) => res.json())
        .then((data: Product) => addToCart("Bookshelf", 600, data.id));
}

// Saves cart + user info to sessionStorage, then redirects to checkout page
async function goToCheckout(e: Event): Promise<void> {
    e.preventDefault();

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const usernameInput = document.getElementById("checkoutUsername") as HTMLInputElement;
    const emailInput = document.getElementById("checkoutEmail") as HTMLInputElement;

    sessionStorage.setItem("cart", JSON.stringify(cart));
    sessionStorage.setItem("username", usernameInput.value);
    sessionStorage.setItem("email", emailInput.value);
    const response = await fetch("http://localhost:8080/addProducts", {
        method: "POST",
         headers: { "Content-Type": "application/json" },
       body: JSON.stringify({  
       username: usernameInput .value,
       emailUser: emailInput.value
    })
    })
    window.location.href = "checkout.html";
}
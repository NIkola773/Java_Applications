"use strict";
const username1 = document.getElementById("name");
const email1 = document.getElementById("userEmail");
const age1 = document.getElementById("usrage");
const name1 = document.getElementById('name');
const email3 = document.getElementById('email');
const price2 = document.getElementById('price');
const username3 = document.getElementById('username1');
const ul = document.getElementById('productTable');
const allprod = document.getElementById("allprod");
const cheaperprod = document.getElementById("cheaperprod");
const expprod = document.getElementById("expprod");
async function sendUsr(e) {
    e.preventDefault();
    const UserResponse = await fetch("http://localhost:8080/users/addUsers", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
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
    let li2 = document.createElement('li');
    li2.textContent = `${ProductData.productName}, price: ${ProductData.price}`;
    ul.appendChild(li2);
    if (!ProductResponse.ok) {
        console.log("error while sending product!");
    }
}
async function sendAddrss(e) {
    e.preventDefault();
    const name1 = document.getElementById('validationServer01');
    const email1 = document.getElementById('validationServerEmail');
    const country1 = document.getElementById('validationServer03');
    const street1 = document.getElementById('validationServer04');
    const username1 = document.getElementById('validationServer05');
    fetch("http://localhost:8080/address/addAddress", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
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
        if (!res.ok) {
            throw new Error(text);
        }
        return text;
    })
        .then(data => {
        console.log("User Saved:", data);
    })
        .catch(err => console.error(err));
}
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
;

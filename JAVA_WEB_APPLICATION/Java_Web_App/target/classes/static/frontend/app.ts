interface Products {
    emailUser: string;
    productName: string;
    price: number;
    username: string;
}

interface Users {
    username: string;
    email: string;
    age: number;
}

interface UserAddress {
 name: string;
country: string;
street: string;
email: string;
username: string;
}

interface OrderItems {
  orderName: string;
 
  priceAtPurchase: number;
}

let cart: OrderItems[] = [];

const cartList = document.getElementById("cartList") as HTMLUListElement;
const cartTotal = document.getElementById("cartTotal") as HTMLElement;
const username1 = document.getElementById("name") as HTMLInputElement;
const email1 = document.getElementById("userEmail") as HTMLInputElement;
const age1 = document.getElementById("usrage") as HTMLInputElement;
const name1 = document.getElementById('name') as HTMLInputElement ;
const email3 = document.getElementById('email') as HTMLInputElement;
const price2 = document.getElementById('price') as HTMLInputElement;
const username3 = document.getElementById('username1') as HTMLInputElement;
const ul = document.getElementById('productTable') as HTMLUListElement;
const allprod = document.getElementById("allprod") as HTMLUListElement;
const cheaperprod = document.getElementById("cheaperprod") as HTMLUListElement;
const expprod = document.getElementById("expprod") as HTMLUListElement;

async function sendUsr(e:SubmitEvent)  {
    e.preventDefault();
    const UserResponse = await fetch("http://localhost:8080/users/addUsers", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username1.value,
            email: email1.value,
            age:  Number(age1.value)

        })
    });

  
    const UserData: Users = await UserResponse.json();

   const NewsletterResponse = await fetch("http://localhost:8080/api/newsletter/subscribe", {
     method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email1.value })

   });
     const NewsletterData = await NewsletterResponse.json();
}

async function sendProduct(e:SubmitEvent) {
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

const ProductData: Products = await ProductResponse.json();
   
     let li2 = document.createElement('li');
    li2.textContent = `${ProductData.productName}, price: ${ProductData.price}`;
      ul.appendChild(li2);


if (!ProductResponse.ok) {
    console.log("error while sending product!")
}
}

async function sendAddrss(e:SubmitEvent) {
    e.preventDefault();
    const name1 = document.getElementById('validationServer01') as HTMLInputElement;
    const email1 = document.getElementById('validationServerEmail') as HTMLInputElement;
    const country1 = document.getElementById('validationServer03') as HTMLInputElement;
     const street1 = document.getElementById('validationServer04') as HTMLInputElement;
     const username1  = document.getElementById('validationServer05') as HTMLInputElement;
     fetch("http://localhost:8080/address/addAddress", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name1.value ,
        country: country1.value,
        street: street1.value,
        email: email1.value,
        username: username1.value
      })
     }) 
  .then(async res => {
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


async function getExpensiveProd(e: SubmitEvent) {

   e.preventDefault();

   const response = await fetch("http://localhost:8080/expensiveProducts");

   const data: Products[] = await response.json();

   expprod.innerHTML = "";

   data.forEach((p) => {

      const li = document.createElement("li");

      li.textContent = `${p.productName} - ${p.price}`;

      expprod.appendChild(li);
   });
}
async function getprod(e: SubmitEvent) {
  e.preventDefault();
 const response = await fetch("http://localhost:8080/products");
 const data: Products[] = await response.json();

  allprod.innerHTML = "";

   data.forEach((p) => {

      const li = document.createElement("li");

      li.textContent = `${p.productName} - ${p.price}`;

      allprod.appendChild(li);
    });
}
async function getCheaperProd(e: SubmitEvent) {
  e.preventDefault();
 const response = await fetch("http://localhost:8080/cheapProducts")
     const data: Products[] = await response.json();

   cheaperprod.innerHTML = "";

   data.forEach((p) => {

      const li = document.createElement("li");

      li.textContent = `${p.productName} - ${p.price}`;
        cheaperprod.appendChild(li);
      });
    };


function addToCart(orderName: string, priceAtPurchase: number): void {
    cart.push({ orderName, priceAtPurchase });
    renderCart();
}

function clearCart(): void {
    cart = [];
    renderCart();
}

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

    cart.forEach((item) => {
        total += item.priceAtPurchase;
        const li = document.createElement("li");
        li.textContent = `${item.orderName} - ${item.priceAtPurchase}$`;
        cartList.appendChild(li);
    });

    cartTotal.textContent = `${total}$`;
}

function addProductChair(e: MouseEvent): void {

    e.preventDefault();
    fetch("http://localhost:8080/addProducts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
            productName: "Wooden Chair",
            price: 100
      })
    })
    addToCart("Wooden Chair", 100);
}

function addProductBed(e: MouseEvent): void {
    e.preventDefault();
      fetch("http://localhost:8080/addProducts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
            productName: "Metal Frame Bed",
            price: 500
      })
    })
    addToCart("Metal Frame Bed", 500);
}

function addProductBookshelf(e: MouseEvent): void {
    e.preventDefault();
       fetch("http://localhost:8080/addProducts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
            productName: "Oak Bookshelf",
            price: 700
      })
    })
    addToCart("Bookshelf", 600);
}
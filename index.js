let body = document.querySelector('body');
let total = document.querySelector('.total');

let quantity = document.querySelector('.quantity');

let openShopping = document.querySelector('.shopping');
openShopping.addEventListener('click', () => {
  
    body.classList.add('active');
})

let closeShopping = document.querySelector('.closeShopping');
closeShopping.addEventListener('click', () => {
    body.classList.remove('active');
})


let products = [
    {
        "id": 1,
        "name": "Camera",
        "image": 'camera.avif',
        "price": 200
    },
    {
        "id": 2,
        "name": "Car",
        "image": "cartoy.avif",
        "price": 100
    },
    {
        "id": 3,
        "name": "Casual Shoe",
        "image": "casualshoe.avif",
        "price": 80
    },
    {
        "id": 4,
        "name": "Formal Shoe",
        "image": "formalshoe.avif",
        "price": 100
    },
    {
        "id": 5,
        "name": "Headphone",
        "image": "headphone.avif",
        "price": 250
    },
    {
        "id": 6,
        "name": "Smart watch",
        "image": "smartwatch.avif",
        "price": 120
    },
    {
        "id": 7,
        "name": "Sunglass",
        "image": "sunglass.avif",
        "price": 140
    },
    {
        "id": 8,
        "name": "Watch",
        "image": "watch.avif",
        "price": 125
    }
];

let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let listCards = [];
function initApp() {
    products.forEach((value, key) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="images/${value.image}">
            <h5 class="title py-2">${value.name}</h5>
            <div class="card-foot">
            <p class="price">$${value.price.toLocaleString()}</p>
            <a onclick="addToCard(${key})"><i class="bi bi-bag"></i></a>
            </div>`;
        list.appendChild(newDiv);
    })
}
initApp();
function addToCard(key) {


    if (listCards[key] == null) {
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
        reloadCard();
    }

    else {
        alert("Product is already added to the cart.");
    }
}
function reloadCard() {
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key) => {
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if (value != null) {
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
            
            <div><img class="cart-img" src="images/${value.image}" /></div>
            <div class='cart-product'>
                <div>${value.name}</div>
                <div  class='py-3'>$${value.price.toLocaleString()} </div>
                <div>
          
                <input type="number" class=" prod-increase " value="${value.quantity}" onchange="updateQuantity(${key}, this.value)">                  
                    
                </div>               
            </div>
            <a  onclick="removeFromCard(${key})" class="del-butn"><i class="bi bi-trash-fill"></i></a>
            `;

            listCard.appendChild(newDiv);
        }
    })
    total.innerText = '$' + totalPrice.toLocaleString();
    quantity.innerText = count;
}

function updateQuantity(key, newQuantity) {
    const parsedQuantity = parseInt(newQuantity);
  
    if (!isNaN(parsedQuantity) && parsedQuantity >= 0) {
      listCards[key].quantity = parsedQuantity;
      listCards[key].price = parsedQuantity * products[key].price;
  
      if (parsedQuantity === 0) {
        delete listCards[key];
      }
    } else {
      const inputElement = document.querySelector(`.cart-product[data-key="${key}"] input`);
      inputElement.value = listCards[key].quantity;
    }
  
    reloadCard();
  }

function removeFromCard(key) {
    if (listCards[key] != null) {
        delete listCards[key];
        reloadCard();
    }
}



function placeOrder() {
    alert("your order has been placed")
}


     
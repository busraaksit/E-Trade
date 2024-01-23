function secimiGoster() {
    // Find the selected option
    var secenekKutucugu = document.getElementById('secenekKutucugu');
    var secilenSecenek = secenekKutucugu.options[secenekKutucugu.selectedIndex].text;

    // Show option
    document.getElementById('secimSonuc').innerText = 'Seçiminiz: ' + secilenSecenek;
}
//Product Information and Cart Object Creation:

 let cart = document.querySelectorAll('.cart');
 let containerCart = document.getElementById("root");

 
 let products = [
  {
    name: 'Anime Desenli Kupa',
    tag: 'adk',
    price: 79.90,
    inCart:0
  },
  {
    name: 'Yılbaşı Temalı Kupa',
    tag: 'ytk',
    price: 79.90,
    inCart:0
  },
  {
    name: 'Yılbaşı Temalı Kupa',
    tag: 'ytk2',
    price: 79.90,
    inCart:0
  },
  {
    name: 'Çiçek Desenli Kupa',
    tag: 'cdk',
    price: 79.90,
    inCart:0
  },
  {
    name: 'Gym Temalı Kupa',
    tag: 'gtk',
    price: 79.90,
    inCart:0
  },
  {
    name: 'Aşk Temalı Kupa',
    tag: 'atk',
    price: 79.90,
    inCart:0
  },
  {
    name: 'Müzik Temalı Kupa',
    tag: 'mtk',
    price: 79.90,
    inCart:0
  },
  {
    name: 'Unicorn Desenli Kupa',
    tag: 'udk',
    price: 79.90,
    inCart:0
  },
  {
    name: 'Şık Yemek Tabağı',
    tag: 'syt1',
    price: 99.90,
    inCart:0
  },
  {
    name: 'Şık Yemek Tabağı',
    tag: 'syt2',
    price: 99.90,
    inCart:0
  },
  {
    name: 'Şık Yemek Tabağı',
    tag: 'syt3',
    price: 99.90,
    inCart:0
  },
  {
    name: 'Şık Yemek Tabağı',
    tag: 'syt4',
    price: 99.90,
    inCart:0
  },
  {
    name: 'Şık Yemek Tabağı',
    tag: 'syt5',
    price: 99.90,
    inCart:0
  },
  {
    name: 'Şık Yemek Tabağı',
    tag: 'syt6',
    price: 99.90,
    inCart:0
  },
  {
    name: 'Şık Yemek Tabağı',
    tag: 'syt7',
    price: 99.90,
    inCart:0 //Shows how many items are in the basket 
  },
  {
    name: 'Şık Yemek Tabağı',
    tag: 'syt8',
    price: 99.90,
    inCart:0 
  }
  ]
//Adding Event Listeners:

 for(let i=0; i< cart.length;  i++) {
  cart[i].addEventListener('click', () => {
    cartNumbers(products[i]);
    totalCost(products[i])
    console.log(products[i]);


  })
 }

//Function of Showing Cart Information When the Page is Loaded:

  function onloadCartNumbers(){   //This function is called when the page loads
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers) {
      document.querySelector('.position-relative span').textContent = productNumbers;
    }
  }
//Add Product to Cart Function:

 function cartNumbers(product){
  
  let productNumbers = localStorage.getItem('cartNumbers');  //This value represents the number of items in the user's cart.

  productNumbers = parseInt(productNumbers); //Converts string to number

  if (productNumbers) {
    localStorage.setItem('cartNumbers', productNumbers + 1);
    document.querySelector('.position-relative span').textContent = productNumbers + 1;
  } else {
    localStorage.setItem('cartNumbers', 1);
    document.querySelector('.position-relative span').textContent =1;
  }
  setItems(product)

 }



// The function is used to add products to the cart (uploads to localstorage - customer does not see it)
 function setItems(product) {
    
  // Get 'productsIncart' value from localStorage
let cartItems = localStorage.getItem('productsIncart');

  
    // Convert received value to JavaScript object (from JSON)
    cartItems = JSON.parse(cartItems); //Since this value is a string, it converts this string into a JavaScript object with JSON.parse. So cartItems is now a JavaScript object and you can perform object manipulations on it (for example, using the spread operator)
  
  // If there are products in the cart
    if(cartItems != null) {

          // If the added product has not been added before
    if(cartItems[product.tag] == undefined) {   //When accessing object properties in JavaScript, two different notations can generally be used: square brackets [] and dot .. The reason for using square brackets in the [product.tag] expression is to dynamically access a property called tag inside the product object. That is, we want to access a property whose value is tag as a property name inside the product object.
                
      // Update cart, adding new product
      cartItems = {
        ...cartItems, //...cartItems: This statement takes all the properties of the object named cartItems and creates a new object. That is, it copies existing cartItems.
        [product.tag]: product   // Add new product
      }
    }
    // Increase the 'incart' (number of times added to cart) of the specific product in the cart by one
    cartItems[product.tag].inCart += 1;
  }else {
    // If there is no product in the cart
    // Add new product to cart
    product.inCart =1;   // Feature indicating how many times the product is in the cart
    cartItems = {
      [product.tag]: product
    }
  }

  // Save the updated version of the cart back to localStorage
   localStorage.setItem("productsIncart", JSON.stringify(cartItems));
 }

 //This JavaScript function is used to calculate the total cost of a shopping cart.
  function totalCost(product){
     let cartCost = localStorage.getItem('totalCost');

     if(cartCost != null){
      cartCost = parseInt(cartCost);  
      localStorage.setItem("totalCost", cartCost + product.price);
     }else {
      localStorage.setItem("totalCost", product.price);
     }

  }
 

  //adds products to interface cart 

  function displayCart() {

    let cartItems = localStorage.getItem("productsIncart");
    cartItems = JSON.parse(cartItems);


    if( cartItems && containerCart) {
      containerCart.innerHTML = '';
      Object.values(cartItems).map( item => {
        containerCart.innerHTML += `
       
                <tr class="tr">
                    <th class="headimg"><img width="98" src="img/${item.tag}.png" alt=""></th>
                    <th width="213" class="title" >${item.name}</th>
                    <th width="180" class="incart" >
                       <i class="fa-solid fa-circle-left ion-icon1"></i>
                       ${item.inCart}
                       <i class="fa-solid fa-circle-right ion-icon1"></i>
                    </th>
                    <th width="80" class="price" >${item.price}₺</th>
                    <th width="85" class="total" >${item.inCart * item.price}₺</th>
                    <th class="ion-icon icondelete" width="55" ><i class="fa-solid fa-xmark close ion-icon1"></i></th>
                    
                </tr>
        
        `;
      })
     
    } 
  }

 

  function details() {
    let cartItems = localStorage.getItem("productsIncart");
    cartItems = JSON.parse(cartItems);
    let cartCost2 = localStorage.getItem('totalCost');
    let detail = document.querySelector(".detail");
    let cartNumbers = localStorage.getItem("cartNumbers");

    if( cartItems && detail) {
      detail.innerHTML = '';



detail.innerHTML += `
      <div class="details">
      <h2 id="itemB">${cartNumbers}  Ürün</h2>
      <h2 id="totalA">${cartCost2}₺</h2>
  </div>
      `;

    }


  }
  function totals() {
    let cartItems = localStorage.getItem("productsIncart");
    cartItems = JSON.parse(cartItems);
    let cartCost3 = localStorage.getItem('totalCost');
    let top = document.querySelector(".top2");

    if( cartItems && top) {
      top.innerHTML = '';

      top.innerHTML += `
      <div class="tops">
                <h2>Toplam</h2>
                <h2 id="totalB">${cartCost3}₺</h2>
            </div>
            `;

    }


  }
 //Calling the Function to Show Cart Information When the Page is Loaded:
 displayCart();
 details();
 totals()
 onloadCartNumbers()
 eventListeners()

 
 


 //Here we will delete the product from both the interface and local storage
function eventListeners(){
 containerCart.addEventListener("click" , deleteCart);
}

function deleteCart(e){
 
  if(e.target.className === "fa-solid fa-xmark close ion-icon1" ) {
    e.target.parentElement.parentElement.remove();
    deleteUrunFromStorage(e.target.parentElement.parentElement.textContent);

  }



}
function deleteUrunFromStorage(productName) {
  let cartItems = localStorage.getItem("productsIncart");
  cartItems = JSON.parse(cartItems);

  // Find the product in the cartItems by its name
  let productToDelete = Object.values(cartItems).find(
    (item) => item.name === productName
  );

  // Update the totalCost in local storage
  let cartCost = localStorage.getItem("totalCost");
  cartCost = parseInt(cartCost);
  localStorage.setItem("totalCost", cartCost - productToDelete.price * productToDelete.inCart);

  // Update the cartNumbers in local storage
  let productNumbers = localStorage.getItem("cartNumbers");
  productNumbers = parseInt(productNumbers);
  localStorage.setItem("cartNumbers", productNumbers - productToDelete.inCart);

  // Remove the product from cartItems
  delete cartItems[productToDelete.tag];

  // Update the productsIncart in local storage
  localStorage.setItem("productsIncart", JSON.stringify(cartItems));

  // Update the displayed cart
  displayCart();
  details();
  totals();
  onloadCartNumbers();
}

function eventListeners() {
  containerCart.addEventListener("click", deleteCart);
}

function deleteCart(e) {
  if (e.target.className === "fa-solid fa-xmark close ion-icon1") {
    e.target.parentElement.parentElement.remove();
    deleteUrunFromStorage(e.target.parentElement.parentElement.querySelector('.title').textContent);
  }
}

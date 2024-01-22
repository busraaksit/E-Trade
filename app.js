function secimiGoster() {
    // Seçilen seçeneği bul
    var secenekKutucugu = document.getElementById('secenekKutucugu');
    var secilenSecenek = secenekKutucugu.options[secenekKutucugu.selectedIndex].text;

    // Seçeneği göster
    document.getElementById('secimSonuc').innerText = 'Seçiminiz: ' + secilenSecenek;
}
//Ürün Bilgileri ve Sepet Nesnesi Oluşturma:

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
    inCart:0 //sepette kaç adet olduğunu gösterir 
  },
  {
    name: 'Şık Yemek Tabağı',
    tag: 'syt8',
    price: 99.90,
    inCart:0 //sepette kaç adet olduğunu gösterir 
  }
  ]
//Olay Dinleyicileri Eklenme:

 for(let i=0; i< cart.length;  i++) {
  cart[i].addEventListener('click', () => {
    cartNumbers(products[i]);
    totalCost(products[i])
    console.log(products[i]);


  })
 }
//Sayfa Yüklendiğinde Sepet Bilgilerini Gösterme Fonksiyonu:

  function onloadCartNumbers(){   //bu fonksiyon, sayfanın yüklendiğinde çağrılır.
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers) {
      document.querySelector('.position-relative span').textContent = productNumbers;
    }
  }
//Sepete Ürün Ekleme Fonksiyonu:

 function cartNumbers(product){
  
  let productNumbers = localStorage.getItem('cartNumbers');  //Bu değer, kullanıcının sepetteki ürün sayısını temsil eder.

  productNumbers = parseInt(productNumbers); //stringi numbera dönüştürür.

  if (productNumbers) {
    localStorage.setItem('cartNumbers', productNumbers + 1);
    document.querySelector('.position-relative span').textContent = productNumbers + 1;
  } else {
    localStorage.setItem('cartNumbers', 1);
    document.querySelector('.position-relative span').textContent =1;
  }
  setItems(product)

 }



// Fonksiyon, sepete ürün eklemek için kullanılır( localstorageye yükler-müşteri görmez)
 function setItems(product) {
    
  // localStorage'dan 'productsIncart' değerini al
let cartItems = localStorage.getItem('productsIncart');

  
    // Alınan değeri JavaScript nesnesine çevir (JSON'dan)
    cartItems = JSON.parse(cartItems); //bu değer bir string olduğu için, JSON.parse ile bu string'i JavaScript nesnesine dönüştürür. Böylece, cartItems artık bir JavaScript nesnesi olur ve üzerinde nesne manipülasyonları (örneğin, spread operatörü kullanma) yapabilirsiniz.
  
  // Eğer sepette ürünler varsa
    if(cartItems != null) {

          // Eğer eklenen ürün daha önce eklenmemişse
    if(cartItems[product.tag] == undefined) {   //JavaScript'te nesne özelliklerine erişim yaparken genellikle iki farklı notasyon kullanılabilir: köşeli parantez [] ve nokta .. ve [product.tag] ifadesinde köşeli parantez kullanılmasının sebebi, product nesnesinin içindeki tag isimli bir özelliğe dinamik bir şekilde erişmektir. Yani, product nesnesinin içinde bir özellik adı olarak değeri tag olan bir özelliğe ulaşmak istiyoruz.
                
      // Sepeti güncelle, yeni ürünü ekleyerek
      cartItems = {
        ...cartItems, //...cartItems: Bu ifade, cartItems adlı nesnenin tüm özelliklerini alır ve yeni bir nesne oluşturur. Yani, mevcut cartItems'ı kopyalar.
        [product.tag]: product   // Yeni ürünü ekle
      }
    }
    // Sepetteki belirli ürünün 'incart' (sepete eklenme sayısı) özelliğini bir artır
    cartItems[product.tag].inCart += 1;
  }else {
    // Eğer sepette hiç ürün yoksa
    // Yeni ürünü sepete ekle
    product.inCart =1;   // Ürünün sepette kaç kez olduğunu belirten özellik
    cartItems = {
      [product.tag]: product
    }
  }

  // Sepetin güncellenmiş halini tekrar localStorage'a kaydet
   localStorage.setItem("productsIncart", JSON.stringify(cartItems));
 }

 //Bu JavaScript fonksiyonu, bir alışveriş sepetinin toplam maliyetini hesaplamak için kullanılır.
  function totalCost(product){
     let cartCost = localStorage.getItem('totalCost');

     if(cartCost != null){
      cartCost = parseInt(cartCost);  
      localStorage.setItem("totalCost", cartCost + product.price);
     }else {
      localStorage.setItem("totalCost", product.price);
     }

  }
 

  //ürünleri arayüz sepetine ekler 

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
 //Sayfa Yüklendiğinde Sepet Bilgilerini Gösterme Fonksiyonunun Çağrılması:
 displayCart();
 details();
 totals()
 onloadCartNumbers()
 eventListeners()

 
 


 //burada hem arayüzden hemde local storageden ürün silme yapıcaz 
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





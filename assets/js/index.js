// CATEGORY VARIABLES
const regularButton = document.getElementById("regular")
const mediumButton  = document.getElementById("medium")
const largeButton   = document.getElementById("large")

const selectOriginal  = document.getElementById("original")
const selectCheese    = document.getElementById("cheese")
const selectBarbeque  = document.getElementById("barbeque")

const featuredImage = document.getElementById("featured").src
const realPrice     = document.getElementById("real-price").textContent
const productName   = document.getElementById("product-name").textContent

/// POPUP HEADER
const cartButton      = document.querySelector('.cart')
const popupCart       = document.querySelector('.popup-cart')
const wishlistButton  = document.querySelector('.wishlist')
const popupWishlist   = document.querySelector('.popup-wishlist')
const closeCart       = document.querySelector('.close-cart')
const closeWishlist   = document.querySelector('.close-wishlist')

const showCart     = document.querySelector('.show-cart') 
const showWishList = document.querySelector('.show-wishlist')

const wishNotif = document.querySelector('.wishlist-notif')
const cartNotif = document.querySelector('.cart-notif')

const toogleWS = document.getElementById('add-wishlist')
const viewCartButton = document.getElementById('view-cart')
const viewWishListButton = document.getElementById('view-wishlist')

/// ONLOAD
window.onload = function() {
  cartNotif.innerHTML = shoppingCart.totalCount()
  wishNotif.innerHTML = wishList.totalCount()

  if (wishList.checkItem(productName) == 1) {
    toogleWS.value = "ON";
    toogleWS.innerHTML = `<i class="fa-solid fa-heart"></i>On Wishlist`
    toogleWS.classList.add('active')
  } 

};

/// --- CART
function setAddCart() {
  var sizeValue;
  if (regularButton.checked == true) {
      sizeValue = regularButton.value
  } else if (mediumButton.checked == true) {
      sizeValue = mediumButton.value
  } else {
      sizeValue = largeButton.value
  }

  var selectFlavor;
  if (selectOriginal.selected == true) {
      selectFlavor = selectOriginal.value
  } else if (selectCheese.selected == true) {
      selectFlavor = selectCheese.value
  } else {
      selectFlavor = selectBarbeque.value
  }

  shoppingCart.addItemToCart(productName, selectFlavor, sizeValue, 1, realPrice, featuredImage)
  cartNotif.innerHTML = shoppingCart.totalCount()
}

cartButton.addEventListener('click', () => {
  popupCart.classList.toggle('show')
  var cartArray = shoppingCart.listCart()
  var output = "";
  
  for(var i in cartArray) {
    output += `<div class="cart">
    <div class="image">
        <img src=" ${cartArray[i].img}" alt="${cartArray[i].name}" height=110 width=110>
    </div>
    <div class="cart-details">
        <h4 class="product-name">
        ${cartArray[i].name}
        ${cartArray[i].count <= 1 ? " " : "x" + cartArray[i].count}
        </h4>
        <h4 class="price">₱${cartArray[i].price}</h4>
        <p> Size: <span class="size"> ${cartArray[i].size}</span></p>
        <p> Flavor: <span class="flavor">${cartArray[i].flavor}</span></p>
    </div>
  </div>`
  }
  
  if (shoppingCart.totalCount() != 0) {
    showCart.innerHTML = output
    viewCartButton.hidden = false
  } else {
    showCart.innerHTML = `<p>Your cart is empty.</p>`
    viewCartButton.hidden = true
  }

}); 

closeCart.addEventListener('click', () => {
  popupCart.classList.remove('show')
})

/// --- WISH LIST
function setWishlist() {
  if(toogleWS.value == "OFF"){
    toogleWS.value = "ON";
    toogleWS.innerHTML = `<i class="fa-solid fa-heart"></i>On Wishlist`
    toogleWS.classList.add('active')

    wishList.addItemToWishList(productName, realPrice, featuredImage)
    wishNotif.innerHTML = wishList.totalCount()
    
  } else if(toogleWS.value == "ON") {
    toogleWS.value = "OFF";
    toogleWS.innerHTML = `<i class="fa-solid fa-heart"></i>Add to Wishlist`
    toogleWS.classList.remove('active')

    wishList.removeItemWishList(productName)
    wishNotif.innerHTML = wishList.totalCount()
  }

}

wishlistButton.addEventListener('click', () => {
  popupWishlist.classList.toggle('show')
  var listArray = wishList.listWishList()
  var output = ""
  
  for(var i in listArray) {
    output += `<div class="wishDetail">
    <div class="image">
    <img src=" ${listArray[i].img}" alt="${listArray[i].name}" height=110 width=110>
    </div>
    <div class="wistlist-details">
        <h4 class="product-name">
        ${listArray[i].name}
        </h4>
        <h4 class="price">₱${listArray[i].price}</h4>
    </div>
  </div>`
  }

  if (wishList.totalCount() != 0) {
    showWishList.innerHTML = output
    viewWishListButton.hidden = false
  } else {
    showWishList.innerHTML = `<p>Your wishlist is empty.</p>`
    viewWishListButton.hidden = true
  }

}); 

closeWishlist.addEventListener('click', () => {
  popupWishlist.classList.remove('show')
})

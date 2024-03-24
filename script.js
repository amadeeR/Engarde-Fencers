const navbar=document.querySelector('.nav')
const togBtn = document.querySelector('.tog')
const togBtnIcon = document.querySelector('.tog i')
const dropDownMenu = document.querySelector('.dropDown')

window.addEventListener('scroll',()=>{
    if(this.scrollY>=100){
        navbar.classList.add('scrolled')
    }else{
        navbar.classList.remove('scrolled')
    }
})

togBtn.onclick=function(){
    dropDownMenu.classList.toggle('open')
    const isOpen=dropDownMenu.classList.contains('open')
    
    togBtnIcon.classList= isOpen
    ? 'fa-solid fa-xmark'
    :'fa-solid fa-bars'
}

let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};
function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}
 // When the user clicks on the button, scroll to the top of the document
 function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}



        
const shoesButton = document.getElementById("shoes");
const masksButton = document.getElementById("masks");
const weaponsButton = document.getElementById("weapons");
const costumesButton = document.getElementById("costumes");
const bagsButton = document.getElementById("bags");

const shoesCategory = document.getElementById("shoesCategory");
const masksCategory = document.getElementById("masksCategory");
const weaponsCategory = document.getElementById("weaponsCategory");
const costumesCategory = document.getElementById("costumesCategory");
const bagsCategory = document.getElementById("bagsCategory");

shoesButton.addEventListener('click', function() {
  showCategory(shoesCategory);
});

masksButton.addEventListener("click", function() {
  showCategory(masksCategory);
});

weaponsButton.addEventListener("click", function() {
  showCategory(weaponsCategory);
});

costumesButton.addEventListener("click", function() {
  showCategory(costumesCategory);
});

bagsButton.addEventListener("click", function() {
  showCategory(bagsCategory);
});

function showCategory(category) {
  // Hide all categories
  const categories = document.querySelectorAll(".category");
  categories.forEach(function(category) {
    category.classList.remove("active");
  });
  
  // Show the selected category
  category.classList.add("active");
  
  // Scroll to the selected category
  category.scrollIntoView({behavior: "smooth"});
}





//cart
// cart icon on navbar with product count
let cartIcon = document.querySelector('#cart-icon')
// cart window promp from left
let cart = document.querySelector('.cart')
// cross to close cart
let closeCart = document.querySelector('#close-cart')

//Open Cart
cartIcon.onclick = () => {
    cart.classList.add("active")
};
//Close Cart
closeCart.onclick = () => {
    cart.classList.remove("active")
}

//Cart Working JS
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

//Making Function
function ready() {
    let i;
    let button;
//Remove Items From Cart
    const removeCartButtons = document.getElementsByClassName('cart-remove');
    console.log(removeCartButtons)
    for (i = 0; i < removeCartButtons.length; i++) {
        button = removeCartButtons[i];
        button.addEventListener('click', removeCartItem);
    }
    //Quantity Changes
    const quantityInputs = document.getElementsByClassName('cart-quantity');
    for (i = 0; i < quantityInputs.length; i++) {
        const input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }
    //Add to Cart
    const addCart = document.getElementsByClassName('add-cart');
    for (i = 0; i < addCart.length; i++) {
        button = addCart[i];
        button.addEventListener('click', addCartClicked);
    }
    //Buy Button Work
    document.getElementsByClassName('btn-buy')[0].addEventListener('click', buyButtonClicked);
    //Clear Cart Button Work
    document.getElementsByClassName('btn-clear')[0].addEventListener('click', clearCartClicked);
}

// Buy Button
function buyButtonClicked() {
    const cartItems = document.getElementsByClassName('cart-content')[0];
    const cartItemsNames = cartItems.getElementsByClassName('cart-box');
    if (cartItemsNames.length === 0) {
        alert('Your cart is empty.');
        return;
    } else {
        // Store the cart items in the browser storage
        const cartItemsArray = [];
        let totalPrice = 0;
        for (let i = 0; i < cartItemsNames.length; i++) {
            const cartItem = {
                title: cartItemsNames[i].getElementsByClassName('cart-product-title')[0].innerText,
                price: cartItemsNames[i].getElementsByClassName('cart-price')[0].innerText,
                quantity:cartItemsNames[i].getElementsByClassName('cart-quantity')[0].value,
                image: cartItemsNames[i].getElementsByClassName('cart-img')[0].src,
            };
            const price=parseFloat(cartItem.price.replace("Rs",""));
            cartItemsArray.push(cartItem);
            totalPrice += price * cartItem.quantity;
        }
        localStorage.setItem('cartItems', JSON.stringify(cartItemsArray));
        localStorage.setItem('totalPrice', JSON.stringify(totalPrice));
        window.location.href = 'checkout.html';
    }
}




//Clear cart
function clearCartClicked() {
    // Select the cart container element
    const cartContainer = document.getElementsByClassName('cart-content')[0];

    // Remove all the child elements inside the cart container
    while (cartContainer.firstChild) {
        cartContainer.removeChild(cartContainer.firstChild);
    }
    updateTotal()
    updateCartIcon()
}


//Remove Items From Cart
function removeCartItem(event) {
    const buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal()
    updateCartIcon()
}

//Quantity Changes
function quantityChanged(event) {
    const input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal();
    updateCartIcon()
}

//Add To Cart
function addCartClicked(event) {
    const button = event.target;
    const shopProducts = button.parentElement;
    const title = shopProducts.getElementsByClassName('product-title')[0].innerText;
    const price = shopProducts.getElementsByClassName('price')[0].innerText;
    const productImg = shopProducts.getElementsByClassName('product-img')[0].src;


    const productQty = document.getElementById('cart-icon');
    productQty.innerText = '';
    addProductToCart(title, price, productImg);
    updateTotal();
    updateCartIcon()
}

function addProductToCart(title, price, productImg) {
    const cartShopBox = document.createElement("div");
    cartShopBox.classList.add('cart-box');
    const cartItems = document.getElementsByClassName('cart-content')[0];
    const cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
    for (let i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText == title) {
            alert("You have already added this item to cart");
            return;
        }
    }
    const cartBoxContent = `
                    <img src="${productImg}" alt="" class="cart-img">
                    <div class="detail-box">
                        <div class="cart-product-title">${title}</div>
                        <div class="cart-price">${price}</div>
                        <input type="number" value="1" class="cart-quantity">
                    </div>
                    <!--Remove Cart-->
                    <i class="bx bxs-trash-alt cart-remove"></i>`;
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox
        .getElementsByClassName('cart-remove')[0]
        .addEventListener('click', removeCartItem);
    cartShopBox
        .getElementsByClassName('cart-quantity')[0]
        .addEventListener('change', quantityChanged);
    updateCartIcon()
}

//Update Total
function updateTotal() {
    const cartContent = document.getElementsByClassName('cart-content')[0];
    const cartBoxes = cartContent.getElementsByClassName('cart-box');
    let total = 0;
    for (let i = 0; i < cartBoxes.length; i++) {
        const cartBox = cartBoxes[i];
        const priceElement = cartBox.getElementsByClassName('cart-price')[0];
        const quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        const price = parseFloat(priceElement.innerText.replace("Rs", ""));
        const quantity = quantityElement.value;
        total = total + price * quantity;
    }
    //If Price Contain Cents Value
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('total-price')[0].innerText = 'Rs' + total;

}


//=====================================================

function updateCartIcon() {
    const cartIcon = document.querySelector('#cart-icon');
    const cartItems = document.querySelectorAll('.cart-box').length;

    document.getElementById('cart-icon').innerHTML = ` ${cartItems} items`;

}

class Cart {

  cartItems; 

  constructor() {
    this.loadFromStorage();
  }

  loadFromStorage  () {
    this.cartItems = JSON.parse(localStorage.getItem('cartItems'));

  if(!this.cartItems) {
  this.cartItems = [{
    productId :  'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity : 1,
    deliveryOptionId : '1'
    }, 
    {
      productId : '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity : 1,
      deliveryOptionId : '2'
    }];
  };
  } 

  saveToStorage() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  } 



  removeFromCart(productId) {
    const newCart = [];
    this.cartItems.forEach(cartItem => {
      if (cartItem.productId != productId) {
        newCart.push(cartItem);
      }
    });
  
    this.cartItems = newCart;
    this.saveToStorage();
  }

  updateQuantity(productId, newQuantity) {
    this.cartItems.forEach( (cartItem) => {
      if (productId === cartItem.productId) {
        cartItem.quantity = newQuantity;
        this.saveToStorage();
      } 
    });
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;
  
      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });

      matchingItem.deliveryOptionId = deliveryOptionId;
      this.saveToStorage();
  }
};

export const cart = new Cart('cart-oop');

export function loadCart(fun) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load',() => {
    console.log(xhr.response);

    fun();
  });

  xhr.open('GET','https://supersimplebackend.dev/cart');
  xhr.send();
};
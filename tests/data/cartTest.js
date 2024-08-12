// import querySelectorAll from '../../scripts/amazon.js'
import {cart} from '../../data/cart-class.js'
// import {cart, loadFromStorage, saveToStorage} from '../../data/cart.js';

describe('test suite : addToCart', () => { 
  
  beforeEach(() => {
    spyOn(localStorage, 'setItem');
  });


  it('adds and existing product to the cart', () => {
    cart.loadFromStorage();
    
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([ {
        productId : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity : 1,
        deliveryOptionId: '1'
      }]);
      
    });
 
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    
    expect(cart.cartItems.length).toEqual(2);
    console.log(cart.cartItems);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItems[0].quantity).toEqual(2);

  }); 


  it('adds a new product to the cart', () => {

      spyOn(localStorage, 'getItem').and.callFake(() => {
        return JSON.stringify([]);
      });

      cart.loadFromStorage();

      addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
      expect(cart.cartItems.length).toEqual(1);
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
      expect(cart.cartItems[0].quantity).toEqual(1);
      expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', JSON.stringify([{
        productId : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity : 1,
        deliveryOptionId: '1'
      }]));

  }); 
});


 function addToCart(productId) { 

  let matchingItem;
  cart.cartItems.forEach( cartItem => {
  if (productId === cartItem.productId) {
    matchingItem = cartItem;
  };
});


  if (matchingItem) {
    matchingItem.quantity += matchingItem.quantity;
  } 
  else {
    cart.cartItems.push({
      productId ,
       quantity : 1,
      deliveryOptionId :'1'
    });
    };

  cart.saveToStorage();
};


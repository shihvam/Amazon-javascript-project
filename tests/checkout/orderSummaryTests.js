import { renderOrderSummary } from "../../scripts/checkout/order-summary.js";
// import {loadFromStorage, cart} from '../../data/cart.js';
import {cart} from '../../data/cart-class.js'
import { renderCheckoutHeader } from "../../scripts/checkoutHeader.js";
import { loadProducts , loadProductsFetch} from '../../data/products.js'


describe('test suite : renderOrderSummary', () => {

  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

  afterEach(() => {
    document.querySelector('.js-test-container').innerHTML = '';
  });

  beforeAll((done) => {
    loadProductsFetch().then(() => {
      done();
    });
  });

  beforeEach(() => {

    spyOn(localStorage, 'setItem')
    
    document.querySelector('.js-test-container').innerHTML = 
      `<div class="js-order-summary">  </div>
      <div class = "checkout-quantity"> </div>
       <div class="js-payment-summary">  </div> 
      `; 

       spyOn(localStorage, 'getItem').and.callFake(() => {
        return JSON.stringify([
         {
          productId :  productId1,
          quantity : 2,
          deliveryOptionId : '1'
          }, 
          {
            productId : productId2,
            quantity : 1,
            deliveryOptionId : '2'
          } ]); 
      });

      cart.loadFromStorage();

      renderOrderSummary();

      // document.querySelector('.js-test-container').innerHTML = '';

  });
  // console.log(document.querySelector('.js-payment-summary').innerHTML = 'hello');

  it ('displays the cart', () => {

    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(2);

    expect (
      document.querySelector(`.js-product-quantity-${productId1}`).innerText  
    ).toContain('Quantity: 2');

    expect (
      document.querySelector(`.js-product-quantity-${productId1}`).innerText  
    ).toContain('Quantity: 2'); 

});


it('removes a product', () => {

    document.querySelector(`.js-delete-link-${productId1}`).click();

    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(1);

    expect (
      document.querySelector(`.js-cart-item-container-${productId1}`)
    ).toEqual(null);

    expect (
      document.querySelector(`.js-cart-item-container-${productId2}`)
    ).not.toEqual(null);

    expect(cart.cartItems.length).toEqual(1);
    expect( cart.cartItems[0].productId).toEqual(productId2);

  });


   it('test: toHaveBeenCalledWith', () => {

    //  spyOn(localStorage,'setItem');
    localStorage.setItem('cartItems','[]');

    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems','[]');

  });

}); 
/*
describe(' test suite : product name', () => { 

  it( 'test : product name is displayed/ fetched', () => {
    const value =  document.querySelector('.js-product-name').value;
    console.log(value);
  });

})*/
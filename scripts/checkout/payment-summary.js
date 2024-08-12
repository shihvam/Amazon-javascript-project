// import { cart } from '../../data/cart.js'

import {cart} from '../../data/cart-class.js'

import { getProduct, products } from '../../data/products.js'

import { deliveryOptions, getDeliveryOption } from '../../data/deliveryOptions.js';

import { formatCurrency } from '../utils/money.js'

// import { addOrder } from '../../data/orders.js';


export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order) {
  orders.unshift(order);
  saveToStorage();
  console.log(localStorage.getItem('orders'));
}

function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
}



export function renderPaymentSummary() {

  let productPriceCents = 0;
  let shippingPriceCents = 0;

  cart.cartItems.forEach( cartItem => {

  const product =  getProduct(cartItem.productId);

  productPriceCents += product.priceCents * cartItem.quantity;

  const deliveryOption =  getDeliveryOption(cartItem.deliveryOptionId);
   
  shippingPriceCents += deliveryOption.priceCents;
   
} ) ;

  let cartQuantity=0;

  cart.cartItems.forEach( cartItem => { 
    cartQuantity += cartItem.quantity;
  });


  const totalBeforeTax = productPriceCents + shippingPriceCents;
  const taxCents = totalBeforeTax* 0.1;
   const totalCents = totalBeforeTax + taxCents;

  const paymentSummaryHTML = ` 
  
  <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div class = "items-quantity"> Items ${cartQuantity}
      </div>
      <div class="payment-summary-money">${formatCurrency(productPriceCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">${formatCurrency(shippingPriceCents)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">${formatCurrency(totalBeforeTax)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">${formatCurrency(taxCents)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">${formatCurrency(totalCents)}</div>
    </div>

    <button class="place-order-button button-primary 
    js-place-order">
      Place your order
    </button>
  `;

  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;

  document.querySelector('.js-place-order')
    .addEventListener('click', async () => {
      try{
        const response = await fetch('https://supersimplebackend.dev/orders', {
          method : 'POST', 
          headers: {
            'Content-Type' : 'application/json'
          },
          body : JSON.stringify({
            cart : cart.cartItems
          })
        });
        const order = await response.json();
        addOrder(order);
      } catch (error) {
        console.log('Unexpected error. Try again later.')
      } 

      window.location.href = 'orders.html'
    });
  
};




let productPriceCents = 0;
let shippingPriceCents = 0;

cart.cartItems.forEach( cartItem => {

// const product =  getProduct(cartItem.productId);
let matchingItem;

products.forEach(product => {
  if (product.id === cartItem.productId) {
   matchingItem = product;
  }


productPriceCents += Number(product.priceCents) * Number(cartItem.quantity);
})
const deliveryOption =  getDeliveryOption(cartItem.deliveryOptionId);
 
shippingPriceCents += deliveryOption.priceCents;
 
} ) ;

let cartQuantity=0;

cart.cartItems.forEach( cartItem => { 
  cartQuantity += cartItem.quantity;
});


 const totalBeforeTax = productPriceCents + shippingPriceCents;
const taxCents = totalBeforeTax * 0.1;
export const totalCents = formatCurrency(totalBeforeTax + taxCents);


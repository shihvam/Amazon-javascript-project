// import {cart, removeFromCart,  saveToStorage, updateDeliveryOption, updateQuantity} from '../../data/cart.js';
import {cart} from '../../data/cart-class.js'

import { products, getProduct, loadProducts} from './products.js';

import { formatCurrency } from '../scripts/utils/money.js';

import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

import {deliveryOptions, getDeliveryOption, calculateDeliveryDate} from '../../data/deliveryOptions.js';

import  { renderPaymentSummary, totalCents } from '../scripts/checkout/payment-summary.js' 

import { renderCheckoutHeader } from '../scripts/checkoutHeader.js';

export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order) {
  orders.unshift(order);
  saveToStorage();
  console.log(localStorage.getItem('orders'));
}

function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
}

function orderCartQuantity () {
let cartQuantity = 0;

cart.cartItems.forEach((cartItem) => {
  cartQuantity += Number(cartItem.quantity);
})

document.querySelector('.js-cart-quantity').innerHTML = `${cartQuantity}`
}

orderCartQuantity();

function orderHeadersGrid () {

   let orderHeadersHTML = `
         <div class ="js-order-header">
             <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>August 12</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div class="total-price" > </div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>27cba69d-4c3d-4098-b42d-ac7fa62b7664</div>
            </div>
          </div>
        </div> 
   `;

  document.querySelector('.order-header').innerHTML = `${orderHeadersHTML}`;
  document.querySelector('.total-price').innerHTML = `${totalCents}`

}

orderHeadersGrid();


function orderDetailsGrid () {

  let orderDetailsHTML = '';

  cart.cartItems.forEach( cartItem => {

  const productId = cartItem.productId;

  let matchingItem ;

  products.forEach(product => {
   if (product.id === productId) {
    matchingItem = product;
  
  



    orderDetailsHTML += 
    `
      <div class="product-image-container">
        <img src="${product.image}">
      </div>

      <div class="product-details">

        <div class="product-name">
          ${product.name}
        </div>

        <div class="product-delivery-date">
          Arriving on: ${(dayjs().add(2,'day')).format('dddd MMMM d')}
        </div>

        <div class="product-quantity">
          Quantity: ${cartItem.quantity}
        </div>

        <button class="buy-again-button button-primary">
          <img class="buy-again-icon" src="images/icons/buy-again.png">
          <span class="buy-again-message">Buy it again</span>
        </button>

      </div>

      <div class="product-actions">
        <a href="tracking.html?orderId=123&productId=456">
          <button class="track-package-button button-secondary">
            Track package
          </button>
        </a>
      </div> 
    ` } 
  })

  });
  

  document.querySelector('.order-details-grid').innerHTML = `${orderDetailsHTML}`;

};

orderDetailsGrid();


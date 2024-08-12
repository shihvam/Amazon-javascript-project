// import {cart, removeFromCart,  saveToStorage, updateDeliveryOption, updateQuantity} from '../../data/cart.js';
import {cart} from '../../data/cart-class.js'

import { products, getProduct } from '../../data/products.js';

import { formatCurrency } from '../utils/money.js';

import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

import {deliveryOptions, getDeliveryOption, calculateDeliveryDate} from '../../data/deliveryOptions.js';

import  { renderPaymentSummary } from './payment-summary.js' 


export function renderOrderSummary() {

  let cartSummaryHTML = '';

  cart.cartItems.forEach( cartItem => {

  const productId = cartItem.productId;

  const matchingProduct = getProduct(productId);

  let deliveryOptionId = cartItem.deliveryOptionId;

  const deliveryOption = getDeliveryOption(deliveryOptionId);

  const dateString = calculateDeliveryDate(deliveryOption);


    cartSummaryHTML += 

    `
    <div class="cart-item-container js-cart-item-container js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: ${dateString}
      </div>

    <div class="cart-item-details-grid">
      <img class="product-image"
        src="${matchingProduct.image}
        ">

      <div class="cart-item-details">
        <div class="product-name js-product-name">
          ${matchingProduct.name}
        </div>

        <div class="product-price">
          ${matchingProduct.getPrice()}
        </div>

        <div class="product-quantity js-product-quantity-${matchingProduct.id}">
          <span>
            Quantity: <span class="quantity-label quantity-label-${matchingProduct.id}"> ${cartItem.quantity}</span>
          </span>
          
          <span class="update-quantity-link link-primary update-link " 
          data-product-Id = "${matchingProduct.id}"
          > Update
          </span>

          <input class = 'quantity-input  quantity-input-${matchingProduct.id}' data-product-id = "${matchingProduct.id}" >

          <span class = "save-quantity-link link-primary" data-product-id = "${matchingProduct.id}">Save</span> 

          <span class="delete-quantity-link link-primary js-delete-link-${matchingProduct.id} js-delete-link "
          data-product-id = "${matchingProduct.id}" >
            Delete
          </span>
        </div>
    </div>

    <div class="delivery-options">
      <div class="delivery-options-title">
        Choose a delivery option:
      </div>
      ${deliveryOptionsHTML(matchingProduct, cartItem)}
    
      </div>
      </div>
    </div>
    `;

    document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;


function deliveryOptionsHTML (matchingProduct, cartItem) {

  let html = '';
  
  deliveryOptions.forEach(  deliveryOption  => {

    const dateString = calculateDeliveryDate(deliveryOption);

    const priceString = deliveryOption.priceCents === 0 ?  'FREE' : `${formatCurrency(deliveryOption.priceCents)} - `;

    const isChecked =  deliveryOption.id === Number(cartItem.deliveryOptionId);

    html +=

    `
      <div class="delivery-option js-delivery-option"
      data-product-id = "${matchingProduct.id}"
      data-delivery-option-id = "${deliveryOption.id}"
      >
        <input type="radio"
        ${isChecked ?  'checked'  : '' }
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString}  Shipping
          </div>
        </div>
      </div>
    `
  } ); 

    cart.saveToStorage();
   
    return html;
  };


  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
    const { productId } = link.dataset;
    cart.removeFromCart(productId);

    const container =  document.querySelector(`.js-cart-item-container-${productId}`);
    
    let cartQuantity = 0;
  
    cart.cartItems.forEach( cartItem => {
      cartQuantity += Number(cartItem.quantity);
      return cartQuantity
    });


    document.querySelector('.checkout-quantity').innerHTML = `${cartQuantity} items`;


    container.remove();
    renderPaymentSummary();
    });
});

  document.querySelectorAll('.update-link').forEach(
    (updateLink) => {
      updateLink.addEventListener('click', () => {
        const { productId } = updateLink.dataset;
        const container =  document.querySelector(`.js-cart-item-container-${productId}`);
        container.classList.add('is-editing-quantity');

        let cartQuantity = 0;
        cart.cartItems.forEach( cartItem => {
          cartQuantity += Number(cartItem.quantity);
          return cartQuantity
        });

        document.querySelector('.checkout-quantity').innerHTML = `${cartQuantity} items`;
      });
    }
  );

  eventListen();

function eventListen() {
  document.querySelectorAll('.save-quantity-link').forEach( (saveLink) => {
    saveLink.addEventListener('click', () => {
      
    const { productId } = saveLink.dataset;

    const inputValue = document.querySelector(`.quantity-input-${productId}`);
    const newQuantity = Number(inputValue.value);

    if ( (newQuantity > 0 ) && (newQuantity < 1000) ) {
      cart.updateQuantity(productId, newQuantity);
      document.querySelector(`.quantity-label-${productId}`).innerHTML = newQuantity;
    }

    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    container.classList.remove('is-editing-quantity');
 
    let cartQuantity = 0;
    cart.cartItems.forEach( cartItem => {
      cartQuantity += Number(cartItem.quantity);
      return cartQuantity
    });

    document.querySelector('.checkout-quantity').innerHTML = `${cartQuantity} items`;

    renderPaymentSummary();

  });
  
  });  
};


function autoRun () {

  document.querySelectorAll('.save-quantity-link').forEach( (saveLink) => { 

  const { productId } = saveLink.dataset;

  const inputValue = document.querySelector(`.quantity-input-${productId}`);
  const newQuantity = Number(inputValue.value);

  if ( (newQuantity > 0 ) && (newQuantity < 1000) ) {
    cart.updateQuantity(productId, newQuantity);
    // updateCartQuantity('js-checkout-cart-quantity');
    document.querySelector(`.quantity-label-${productId}`).innerHTML = newQuantity;
  }

  const container = document.querySelector(`.js-cart-item-container-${productId}`);
  container.classList.remove('is-editing-quantity');
  
  });

    let cartQuantity = 0;
    cart.cartItems.forEach( cartItem => {
    cartQuantity += Number(cartItem.quantity);
    return cartQuantity
    });

    document.querySelector('.checkout-quantity').innerHTML = `${cartQuantity} items`;
    renderPaymentSummary();
  };

  document.body.addEventListener( 'keydown' ,(event) => {

  if (event.key === 'Enter'){
  autoRun();
  };
  });

  document.querySelectorAll('.js-delivery-option').forEach((element) => {
  element.addEventListener('click',() => {
  const {productId, deliveryOptionId} = element.dataset;

  cart.updateDeliveryOption(productId, deliveryOptionId);
  renderOrderSummary();
  
  renderPaymentSummary();
  cart.saveToStorage();

   })
});

let cartQuantity = 0;
    cart.cartItems.forEach( cartItem => {
    cartQuantity += Number(cartItem.quantity);
    return cartQuantity;
    });
    document.querySelector('.checkout-quantity').innerHTML = `${cartQuantity} items`;
    renderPaymentSummary();
    
})};

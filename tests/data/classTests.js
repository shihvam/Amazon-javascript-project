import '../../data/products.js'
import { product1, tshirt, motor } from '../../data/products.js'

describe('tests suite : Product class', () => {

  it('Product class works', () => {

    expect(product1.id).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(product1.getStarsUrl()).toEqual(`../images/ratings/rating-45.png`);
    expect(product1.getPrice()).toEqual('$10.90');
    expect(product1.extraInfoHTML()).toEqual('');
});

  
  it('Clothing class works',() => {
    expect(tshirt.id).toEqual('83d4ca15-0f35-48f5-b7a3-1ea210004f2e');
    expect(tshirt.getStarsUrl()).toEqual(`../images/ratings/rating-45.png`);
    expect(tshirt.getPrice()).toEqual('$7.99');
    expect(tshirt.extraInfoHTML()).toEqual(`<a href = "${tshirt.sizeChartLink}" target ="_blank"> Size chart </a>`);
  });

  it('Appliance class works', () => {
    expect(motor.id).toEqual('54e0eccd-8f36-462b-b68a-8182611d9add');
    expect(motor.getStarsUrl()).toEqual(`../images/ratings/rating-50.png`);
    expect(motor.getPrice()).toEqual('$18.99');
    expect(motor.extraInfoHTML()).toEqual(`<a href = "${motor.instructionsLink}" target = "_blank" > Instructions </a>
    <a href = "${motor.warrantyLink}" target = "_blank"> Warranty </a>`);
  });
});


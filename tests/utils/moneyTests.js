import { formatCurrency } from '../../scripts/utils/money.js';

describe('test suite: formatCurrency',() => {
  it('converts Cents into Dollars', () => {
    expect(formatCurrency(2095) ).toEqual('$20.95');
  });

  it('works with 0', () => {
    expect(formatCurrency(0)).toEqual('$0.00');
  });

  it('rounds up to the nearest number', () => {
    expect(formatCurrency(2000.5)).toEqual('$20.01');
  });

  it('works with 2000.4', () => {
    expect(formatCurrency(2000.4)).toEqual('$20.00');
  });

  it('works with negative number', () => {
    expect(formatCurrency(-3000.7)).toEqual('$-30.01');
  });
});

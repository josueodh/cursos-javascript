import Dinero from "dinero.js";
import find from "lodash/find";
import remove from "lodash/remove";

const calculatePercentageDiscount = (amount, { condition, quantity }) => {
  if (condition?.percentage && quantity > condition.minimum) {
    return amount.percentage(condition.percentage);
  }

  return Money({ amount: 0 });
};

const calculateQuantityDiscount = (amount, { condition, quantity }) => {
  const isEven = quantity % 2 === 0;

  if (condition?.quantity && quantity > condition.quantity) {
    return amount.percentage(isEven ? 50 : 40);
  }
  return Money({ amount: 0 });
};

const calculateDiscount = (amount, quantity, condition) => {
  const list = Array.isArray(condition) ? condition : [condition];

  const [higherDiscount] = list
    .map(c => {
      if (c.percentage) {
        return calculatePercentageDiscount(amount, {
          condition: c,
          quantity,
        }).getAmount();
      } else if (c.quantity) {
        return calculateQuantityDiscount(amount, {
          condition: c,
          quantity,
        }).getAmount();
      }
    })
    .sort((a, b) => b - a);
  return Money({ amount: higherDiscount });
};
const Money = Dinero;

Money.defaultCurrency = "BRL";
Money.defaultPrecision = 2;
export default class Cart {
  items = [];

  add(item) {
    const itemToFind = { product: item.product };
    if (find(this.items, itemToFind)) {
      remove(this.items, itemToFind);
    }
    this.items.push(item);
  }

  remove(product) {
    remove(this.items, { product });
  }

  getTotal() {
    return this.items.reduce((acc, { quantity, product, condition }) => {
      const amount = Money({ amount: quantity * product.price });
      let discount = Money({ amount: 0 });
      if (condition) {
        discount = calculateDiscount(amount, quantity, condition);
      }

      return acc.add(amount).subtract(discount);
    }, Money({ amount: 0 }));
  }

  summary() {
    const total = this.getTotal();
    const formatted = total.toFormat("$0,0.00");
    const items = this.items;
    return {
      total: total.getAmount(),
      formatted,
      items,
    };
  }
  checkout() {
    const total = this.getTotal().getAmount();
    const items = this.items;
    this.items = [];
    return {
      total,
      items,
    };
  }
}

export function makeOnlyDiscountedProductsArray(originalArray) {
  return originalArray.filter((el) => {
    return el.discont_price !== null;
  });
}

export function filterProductsByFromvalToval(originalArray, fromVal, toVal) {
  return originalArray.filter((el) => {
    if (fromVal && toVal) {
      return el.price >= fromVal && el.price <= toVal;
    } else if (fromVal) {
      return el.price >= fromVal;
    } else if (toVal) {
      return el.price <= toVal;
    } else {
      return originalArray;
    }
  });
}

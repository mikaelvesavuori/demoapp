const STORAGE_KEY = "acmecorp_state";

/**
 * @description Load state from specified localStorage key.
 */
const loadState = () => {
  console.log('Loading state...');

  try {
    const state = JSON.parse(localStorage.getItem(STORAGE_KEY));
    console.log('State loaded!');
    if (state) return state;

    // Set default, fallback state
    if (!state) {
      return {
        itemsInCart: 0,
        products: {}
      };
    }
  } catch (error) {
    console.error(error);
  }
}

/**
 * @description Store state at specified localStorage key.
 */
const saveState = (currentState) => {
  console.log('Saving state...');

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(currentState));
    console.log('State saved!');
  } catch (error) {
    console.error(error);
  }
}

/**
* @description Create a list of updated products using existing products and the new (added/removed) product.
*/
const createListOfUpdatedProductsInCart = (products, newProduct, add) => {
  const { name, id, price } = newProduct;
  const currentProducts = products;
  const updatedCount = currentProducts[id] ? updateCount(currentProducts[id].count, add) : 1;

  return {
    ...currentProducts,
    [id]: {
      name,
      count: updatedCount,
      price
    }
  }
}

/**
* @description Update numeric count.
*/
const updateCount = (currentCount, add = true) => {
  // Handle this product not existing
  if (typeof currentCount !== "number") {
    if (add) return 1;
    return 0;
  }
  // Update existing count
  if (add) return currentCount + 1;
  if ((currentCount - 1) <= 0) return 0;
  return currentCount - 1;
};

module.exports = { loadState, saveState, createListOfUpdatedProductsInCart, updateCount };
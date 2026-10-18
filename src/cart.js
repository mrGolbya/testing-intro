function notImplemented() {
  throw new Error('Корзина ещё не реализована. Сначала прочитайте тесты.');
}

function addToCart(cart, product, quantity) {
  if (quantity <= 0) {
    throw new RangeError('Количество товара должно быть больше нуля');
  }

  const existingItem = cart.find(item => item.id === product.id);
  const currentQuantityInCart = existingItem ? existingItem.quantity : 0;
  const newQuantity = currentQuantityInCart + quantity;

  if (newQuantity > product.stock) {
    throw new RangeError('Недостаточно товара на складе');
  }

  if (existingItem) {
    return cart.map(item =>
      item.id === product.id ? { ...item, quantity: newQuantity } : item
    );
  }

  return [...cart, { ...product, quantity: quantity }];
}
function changeQuantity(cart, productId, newQuantity) {
  if (newQuantity <= 0) {
    throw new RangeError('Количество должно быть больше нуля');
  }

  const itemIndex = cart.findIndex((item) => item.id === productId);

  if (itemIndex === -1) {
    return [...cart]; 
  }

  const item = cart[itemIndex];

  if (item.stock !== undefined && newQuantity > item.stock) {
    throw new RangeError('Количество не может превышать остаток на складе');
  }

  const newCart = [...cart];
  newCart[itemIndex] = {
    ...item,
    quantity: newQuantity
  };

  return newCart;
}

function removeFromCart() { return notImplemented(); }
function calculateCartSubtotal() { return notImplemented(); }
function calculateOrderTotal() { return notImplemented(); }

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;

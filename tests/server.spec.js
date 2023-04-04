// Prueba unitaria para la función getProducts en ./controller/customers.js:
const { getProducts } = require('../controller/customers');

describe('getProducts', () => {
  it('should return an array of products', async () => {
    const result = await getProducts();
    expect(Array.isArray(result)).toBe(true);
  });
});


// Prueba unitaria para la función validateCredentials en ./controller/customers.js:
const { validateCredentials } = require('../controller/customers');

describe('validateCredentials', () => {
  it('should validate the email and password of a customer', async () => {
    const email = 'johndoe@example.com';
    const password = 'password';
    const result = await validateCredentials(email, password);
    expect(result).toBeUndefined();
  });
});

// Prueba unitaria para la función getCartProducts en ./controller/customers.js:
const { getCartProducts } = require('../controller/customers');

describe('getCartProducts', () => {
  it('should return an array of products in the cart of a customer', async () => {
    const customerId = '12345';
    const result = await getCartProducts(customerId);
    expect(Array.isArray(result)).toBe(true);
  });
});
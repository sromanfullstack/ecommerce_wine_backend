const bcrypt = require("bcryptjs/dist/bcrypt");

const pool = require("../config/pool");
const {
  encryptPassword,
  comparePassword,
} = require("../helpers/HelperCustomer");

const addUser = async ({ name, phone, email, password }) => {
  const encrypted = encryptPassword(password);

  const query = "INSERT INTO customers VALUES (DEFAULT, $1, $2, $3, $4)";

  const values = [name, phone, email, encrypted];

  const { rows: newUser } = await pool.query(query, values);

  return newUser;
};

const validateCredentials = async (email, password) => {
  const values = [email];
  const query = "SELECT * FROM customers WHERE email = $1";
  const {
    rows: [customer],
    rowCount,
  } = await pool.query(query, values);

  const { password: passwordEncriptada } = customer;
  const passwordEsCorrecta = comparePassword(password, passwordEncriptada);
 
  if (!passwordEsCorrecta)
    throw { code: 401, message: "Email o contraseña incorrecta" };
};


const getProducts = async () => {
 
  const query = "SELECT * FROM products order by id";
  const {rows: products} = await pool.query(query);
  
  return products;
};

const getTotCart = async (id) => {
  const values = [id]
  const query = `select sum((sp.amount*p.price)) as total
  from shopping_cart sp
  inner join products p on sp.id_product=p.id
  where sp.id_customer=$1`;
  const {rows: total} = await pool.query(query, values);
  return total;
};

const getCantCart = async (id) => {
  const values = [id]
  const query = `	select sum(amount) as cantidad FROM shopping_cart where id_customer=$1`;
  const {rows: cant} = await pool.query(query, values);
  return cant;
};

const getCartProducts = async (id) => {
const query = `
SELECT
  sc.amount as amount_cart
  , sc.id_product AS product_id
  , p.name AS product_name
  , p.price AS product_price
  , p.imageurl AS product_imageurl
  , p.description AS description
  , sc.id AS id_cart
FROM shopping_cart sc
INNER JOIN products p ON p.id = sc.id_product
INNER JOIN customers c ON c.id = sc.id_customer 
where id_customer = $1`;
  const values = [id]
  const {rows: cartProducts} = await pool.query(query, values);
  return cartProducts;
};
const getProduct = async (id) => {
  const query = `
  SELECT
    sc.amount as amount_cart
    , sc.id_product AS product_id
    , p.name AS product_name
    , p.price AS product_price
    , p.imageurl AS product_imageurl
    , p.description AS description
    , sc.id AS id_cart
  FROM shopping_cart sc
  INNER JOIN products p ON p.id = sc.id_product
  INNER JOIN customers c ON c.id = sc.id_customer 
  where id_product = $1`;
    const values = [id]
    const {rows: product} = await pool.query(query, values);
    return product;
  };

const increaseProductCart= async (id_product,id_customer) => {
const query1 =`SELECT id_product FROM shopping_cart WHERE id_customer = $2 AND id_product = $1`;
const values1 = [id_product, id_customer];
const {rows: exist} = await pool.query(query1, values1);  
if (exist.length>0) {
const query2 = `UPDATE shopping_cart SET amount = amount+1 WHERE id_product=$1 AND id_customer= $2`;
const values2 = [id_product, id_customer]
const {rows: cartProducts} = await pool.query(query2, values2);

  return cartProducts;

}else{
  const query2 = `
insert into shopping_cart (id_customer, id_product, amount) values ($2, $1, 1)`;

const values2 = [id_product, id_customer]
const {rows: cartProducts} = await pool.query(query2, values2);
  return cartProducts;

}

};
const decreaseProductCart= async (id_product,id_customer) => {
 
  const query2 = `
  update shopping_cart set amount = amount-1 where id_product=$1 and id_customer= $2`;
  const values2 = [id_product, id_customer]
  const {rows: cartProducts} = await pool.query(query2, values2);
  return cartProducts;
  
  };
  const removeProductCart= async (id_cart) => {
    const query2 = `
    delete from shopping_cart where id=$1;`
    const values2 = [id_cart]
    const {rows: cartProducts} = await pool.query(query2, values2);
    return cartProducts;
    };
const getUser = async (email) => {
  const values = [email];
  const query = "SELECT * FROM customers WHERE email = $1";
  const { rows: users } = await pool.query(query, values);
  console.log("usersmodel", users[0].id);
  const user = {
    id: users[0].id,
    email: users[0].email,
    name: users[0].name,
    phone: users[0].phone
  };

  return user;
};

module.exports = {
  addUser,
  getUser,
  validateCredentials,
  getProducts,
  getCartProducts,
  increaseProductCart,
  decreaseProductCart,
  removeProductCart,
  getProduct,
  getTotCart,
  getCantCart
};

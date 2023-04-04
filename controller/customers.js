const bcrypt = require("bcryptjs/dist/bcrypt");

const pool = require("../config/pool");

const {
  encryptPassword,
  comparePassword,
} = require("../helpers/HelperCustomer");

const addUser = async ({ name, phone, email, password }) => {
  try {
    const encrypted = encryptPassword(password);

    const query = "INSERT INTO customers VALUES (DEFAULT, $1, $2, $3, $4)";

    const values = [name, phone, email, encrypted];

    const { rows: newUser } = await pool.query(query, values);

    return newUser;
  } catch (error) {
    console.error(error);
    throw new Error("Unable to add users to database");
  }
};


const validateCredentials = async (email, password) => {
  try {
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
    
  } catch (error) {
    console.error(error);
    res.status(error.code).send({ message: error.message });
   }
};



const getProducts = async () => {
  try {
    const query = "SELECT * FROM products order by id";
    const {rows: products} = await pool.query(query);
    return products;
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    throw error;
  }
};


const getTotCart = async (id) => {
  try {
    const values = [id]
    const query = `select sum((sp.amount*p.price)) as total
    from shopping_cart sp
    inner join products p on sp.id_product=p.id
    where sp.id_customer=$1`;
    const {rows: total} = await pool.query(query, values);
    return total;
  } catch (error) {
    console.error(error);
    throw new Error('Hubo un error al tratar de obtener el total del carrito de compras');
  }
};


const getCantCart = async (id) => {
  try {
    const values = [id]
    const query = `select sum(amount) as cantidad FROM shopping_cart where id_customer=$1`;
    const {rows: cant} = await pool.query(query, values);
    return cant;
  } catch (error) {
    console.error(`Error en getCantCart: ${error.message}`);
    throw error;
  }
};


const getCartProducts = async (id) => {
  try {
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
  } catch (error) {
    console.error('Error occurred while fetching cart products: ', error);
    throw error;
  }
};



const getProduct = async (id) => {
  try {
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
    const values = [id];
    const {rows: product} = await pool.query(query, values);
    return product;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


const increaseProductCart = async (id_product, id_customer) => {
  try {
    const query1 = `SELECT id_product FROM shopping_cart WHERE id_customer = $2 AND id_product = $1`;
    const values1 = [id_product, id_customer];
    const { rows: exist } = await pool.query(query1, values1);
  
    if (exist.length > 0) {
      const query2 = `UPDATE shopping_cart SET amount = amount+1 WHERE id_product=$1 AND id_customer= $2`;
      const values2 = [id_product, id_customer]
      const { rows: cartProducts } = await pool.query(query2, values2);
      return cartProducts;
    } else {
      const query2 = `insert into shopping_cart (id_customer, id_product, amount) values ($2, $1, 1)`;
      const values2 = [id_product, id_customer]
      const { rows: cartProducts } = await pool.query(query2, values2);
      return cartProducts;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};




const decreaseProductCart = async (id_product, id_customer) => {
  try {
    const query2 = `
      update shopping_cart set amount = amount-1 where id_product=$1 and id_customer=$2
    `;
    const values2 = [id_product, id_customer];
    const { rows: cartProducts } = await pool.query(query2, values2);
    return cartProducts;
  } catch (error) {
    console.error("Error in decreaseProductCart:", error);
    throw error;
  }
};



const removeProductCart = async (id_cart) => {
  try {
    const query2 = `
      DELETE FROM shopping_cart WHERE id=$1;
    `;
    const values2 = [id_cart];
    const { rows: cartProducts } = await pool.query(query2, values2);
    return cartProducts;
  } catch (error) {
    console.error(`Error removing product from cart: ${error}`);
    throw error;
  }
};



const getUser = async (email) => {
  try {
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
  } catch (err) {
    console.error(err);
    throw err;

  }
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

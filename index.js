const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config({ path: "./.env" });
const {
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

} = require("./controller/customers");
const { getToken } = require("./helpers/HelperCustomer");

const isNotEmpty = require("./middleware/isNotEmpty");
const recorder = require("./middleware/recorder");
const verifyToken = require("./middleware/verifyToken");


app.use(cors());
app.options('*',cors());
app.use(express.json());

app.post("/customers", recorder, async (req, res) => {
  try {
    const user = req.body;
    await addUser(user);
    res.send({ message: "user created" });
  } catch (error) {
    res.status(500).json({ message: "no se puede crear el cliente" });
  }
});

app.post("/", recorder, isNotEmpty, async (req, res) => {
  try {
    const { email, password } = req.body;
    await validateCredentials(email, password);
    const token = jwt.sign({ email }, process.env.SECRET);
    res.send(token);
  } catch (error) {
    console.log(error);
    res.status(error.code || 500).send(error);
  }
});

app.get("/products",  async (req, res) => {
  try {
    const products = await getProducts();
    res.send(products);
  } catch (error) {
    console.log(error);
    res.status(error.code || 500).send(error);
  }
});

app.get("/cart/:id",  async (req, res) => {
  try {
    const {id} = req.params;
    //console.log(id);
    const cartProducts = await getCartProducts(id);
    res.send(cartProducts);
  } catch (error) {
    console.log(error);
    res.status(error.code || 500).send(error);
  }
});


app.get("/cart/product/:id",  async (req, res) => {
  try {
    const {id} = req.params;
    const cartProducts = await getProduct(id);
    res.send(cartProducts);
  } catch (error) {
    console.log(error);
    res.status(error.code || 500).send(error);
  }
});


app.get("/cart/quantity/:id",  async (req, res) => {
  try {
    const {id} = req.params;
    const cantProducts = await getCantCart(id);
    res.send(cantProducts);
  } catch (error) {
    console.log(error);
    res.status(error.code || 500).send(error);
  }
});


app.get("/cart/increase/:id/:user",  async (req, res) => {
  try {
    const {id,user} = req.params;
     const increaseProduct = await increaseProductCart(id,user);
    res.send(increaseProduct);
  } catch (error) {
    console.log(error);
    res.status(error.code || 500).send(error);
  }
});


app.get("/cart/reduce/:id/:user",  async (req, res) => {
  try {
    const {id,user} = req.params;
     const decreaseProduct = await decreaseProductCart(id,user);
    res.send(decreaseProduct);
  } catch (error) {
    console.log(error);
    res.status(error.code || 500).send(error);
  }
});

app.get("/cart/increaseCart/:id/:user",  async (req, res) => {
  try {
    const {id,user} = req.params;
     const increaseProduct = await increaseProductCart(id,user);
    res.send(increaseProduct);
  } catch (error) {
    console.log(error);
    res.status(error.code || 500).send(error);
  }
});

app.get("/cart/total/:id",  async (req, res) => {
  try {
    const {id} = req.params;
     const totCart = await getTotCart(id);
    res.send(totCart);
  } catch (error) {
    console.log(error);
    res.status(error.code || 500).send(error);
  }
});

app.delete("/cart/remove/:id",  async (req, res) => {
  try {
    const {id} = req.params;
     const removeProduct = await removeProductCart(id);
    res.send(removeProduct);
  } catch (error) {
    console.log(error);
    res.status(error.code || 500).send(error);
  }
});

app.get("/customers", recorder, verifyToken, async (req, res) => {
  const { email } = jwt.decode(getToken(req.header("Authorization")));
  try {
    console.log("email",email);
    const users = await getUser(email);
    res.send(users);
  } catch (error) {}
});


app.get("*", recorder, (req, res) => {
  res
    .status(404)
    .json({ message: "the path you are trying to access does not exist" });
});


app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});

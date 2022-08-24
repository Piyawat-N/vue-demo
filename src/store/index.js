import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    products: [],
    productForm: null,
  },
  getters: {
    getProducts: (state) => state.products,
  },
  mutations: {
    setProducts(state, data) {
      state.products = data;
    },
    setProductForm(state, data) {
      state.productForm = data;
    },
    addProduct(state, product) {
      state.products.push(product);
    },
  },
  actions: {
    setProducts(context, value) {
      context.commit("setProducts", value);
    },
    addProduct(context, value) {
      context.commit("addProduct", value);
    },
    async getDataFromAPI(context) {
      await axios.get("http://localhost:3000/products").then((res) => {
        context.commit("setProducts", res.data);
      });
    },
    async createProduct(context, newProduct) {
      await axios
        .post("http://localhost:3000/products/create", newProduct)
        .then((res) => {
          console.log(res.data);
        });
    },
    async updateProduct(context, newProduct) {
      await axios
        .put("http://localhost:3000/products/update", newProduct)
        .then((res) => {
          console.log(res.data);
        });
    },
    async deleteProduct(context, id) {
      await axios
        .delete("http://localhost:3000/products/delete", {
          data: { id: id },
        })
        .then((res) => {
          console.log(res.data);
        });
    },
  },
  modules: {},
});

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

  },
  modules: {},
});

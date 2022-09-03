import { createStore } from "vuex";

export default createStore({
  state: {
    products: [],
    // host:'http://localhost:3000',
    host:'https://node-demo-9.herokuapp.com'
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

  },
  modules: {},
});

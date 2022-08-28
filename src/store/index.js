import { createStore } from "vuex";

export default createStore({
  state: {
    products: [],
    host1:'http://localhost:3000',
    host2:'https://node-demo-9.herokuapp.com'
  },
  getters: {
    getProducts: (state) => state.products,
    getHost: (state) => state.host1,
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

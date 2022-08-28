<template>
  <div class="home">
    <h1>Home</h1>
    <div class="row row-cols-2 row-cols-md-3 row-cols-lg-5 row-cols-xl-5 g-3">
      <div class="col" v-for="(item, index) in this.products" :key="index">
        <div class="card h-100 text-dark bg-light">
          <img class="card-img-top" :src="item.image" />
          <div class="card-body">
            <!-- <div class="card-body" style="height: 7rem;"> -->
            <p class="card-text">{{ item.title }}</p>
          </div>
          <div class="card-footer">
            <h4 class="card-text">฿{{ item.price.toLocaleString() }}</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  created() {
    this.getProducts();
  },
  data() {
    return {
      products: null,
    };
  },
  methods: {
    async getProducts() {
      this.$isLoading(true);
      await axios.get(this.$store.state.host + "/products").then((res) => {
        this.products = res.data;
        this.$isLoading(false);
      });
    },
  },
};
</script>

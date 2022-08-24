<template>
  <div class="productList" >
    <h1>Product List</h1>
    <table class="table table-hover table-striped table-bordered align-middle" v-if="this.products">
      <thead>
        <tr>
          <th scope="col" class="text-center">#</th>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Image</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in this.products" :key="index">
          <th class="text-center" scope="row">{{ index + 1 }}</th>
          <td>{{ item.title }}</td>
          <td class="text-end">{{ item.price.toLocaleString() }}</td>
          <td class="text-center"><img class="h-20" :src="item.image" /></td>
          <td class="text-center">
            <span class="me-3" @click="editProduct(item)"
              ><font-awesome-icon icon="pen-to-square"
            /></span>
            <span @click="deleteProduct(item._id)"
              ><font-awesome-icon icon="trash"
            /></span>
          </td>
        </tr>
      </tbody>
    </table>
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
      await axios.get("http://localhost:3000/products").then((res) => {
        this.products = res.data;
        this.$isLoading(false);
      });
    },
    async deleteProduct(id) {
      this.$isLoading(true);
      await axios
        .delete("http://localhost:3000/products/delete", { data: { id: id } })
        .then((res) => {
          console.log(res.data);
          this.$isLoading(false);
          this.getProducts();
        });
    },
    editProduct(item) {
      console.log(item);

      this.$router.push({
        name: "formId",
        params: {
          id: item._id,
        },
      });
    },
  },
};
</script>
<style scoped>
img {
  height: 50px;
}
</style>

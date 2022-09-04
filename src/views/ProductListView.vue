<template>
  <div class="productList">
    <h1>Product List</h1>
    <table
      class="table table-hover table-striped table-bordered align-middle"
      v-if="this.products"
    >
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
          <td class="text-center">
            <img
              class="h-20"
              :src="item.imageUrl || 'No_image_available.png'" @error="$event.target.src='No_image_available.png'" 
            />
          </td>
          <td class="text-center">
            <div class="row">
              <div class="col p-1">
                <span class="h4" @click="editProduct(item)"
                  ><font-awesome-icon icon="pen-to-square"
                /></span>
              </div>
              <div class="col p-1">
                <span class="h4" @click="checkDelete(item._id)"
                  ><font-awesome-icon icon="trash"
                /></span>
              </div>
            </div>
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
    editProduct(item) {
      this.$router.push({
        name: "formId",
        params: {
          id: item._id,
        },
      });
    },
    checkDelete(id) {
      this.$swal
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.deleteProduct(id);
          }
        });
    },
    async getProducts() {
      this.$isLoading(true);
      await axios.get(this.$store.state.host + "/products").then((res) => {
        this.products = res.data;
        this.$isLoading(false);
      });
    },
    async deleteProduct(id) {
      this.$isLoading(true);
      await axios
        .delete(this.$store.state.host + "/products/delete", {
          data: { id: id },
        })
        .then(() => {
          // console.log(res.data);
          this.$isLoading(false);
          this.getProducts();
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

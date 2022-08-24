<template>
  <div class="form">
    <h1>Form</h1>
    <form @submit.prevent="addProduct">
      <div class="card text-dark bg-light">
        <div class="card-body">
          <div class="mb-3">
            <label for="title" class="form-label">Title</label>
            <input
              type="text"
              class="form-control"
              id="title"
              placeholder="Title"
              v-model.trim="product.title"
            />
          </div>
          <div class="mb-3">
            <label for="price" class="form-label">Price</label>
            <input
              type="number"
              class="form-control"
              id="price"
              placeholder="Price"
              v-model="product.price"
            />
          </div>
          <div class="mb-3">
            <label for="formFile" class="form-label">Image</label>
            <input class="form-control" type="file" id="formFile" />
          </div>

          <button type="submit" class="btn btn-primary me-3">Add</button>
          <button type="reset" class="btn btn-primary">Cancel</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "FormView",
  data() {
    return {
      product: {
        _id: null,
        title: "",
        price: null,
        image: "",
      },
    };
  },
  created() {
    if (this.$route.params.id) {
      this.getProductById(this.$route.params.id);
    }
  },
  methods: {
    addProduct() {
      if (!this.product.image) {
        this.product.image = "no-image.jpg";
      }
      if (!this.product.price) {
        this.product.price = 0;
      }

      let newProduct = {
        title: this.product.title,
        price: this.product.price,
        image: this.product.image,
      };
      console.log("newProduct:", newProduct);

      this.resetInput();
      this.createProduct(newProduct);
    },
    resetInput() {
      this.product.title = null;
      this.product.price = null;
      this.product.image = null;
    },
    async createProduct(newProduct) {
      await this.$store.dispatch("createProduct", newProduct);
      await this.$store.dispatch("getDataFromAPI");
      await this.$router.push({ path: "/productlist" });
    },
    async getProductById(id) {
      await axios.get("http://localhost:3000/products/" + id).then((res) => {
        this.product = res.data;
      });
    },

    // xxx
  },
};
</script>

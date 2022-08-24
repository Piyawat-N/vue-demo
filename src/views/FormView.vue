<template>
  <div class="form">
    <h1>Form</h1>
    <form @submit.prevent="saveProduct">
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

          <div v-if="this.product._id">
            <button type="submit" class="btn btn-primary me-3">Save</button>
          </div>
          <div v-else>
            <button type="submit" class="btn btn-primary me-3">Add</button>
            <button type="reset" class="btn btn-primary">Cancel</button>
          </div>
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
    saveProduct() {
      if (!this.product.image) {
        this.product.image = "no-image.jpg";
      }
      if (!this.product.price) {
        this.product.price = 0;
      }

      let newProduct = {
        _id: this.product._id,
        title: this.product.title,
        price: this.product.price,
        image: this.product.image,
      };

      if (this.product._id) {
        this.updateProduct(newProduct);
      } else {
        this.createProduct(newProduct);
        this.resetInput();
      }
    },
    resetInput() {
      this.product.title = null;
      this.product.price = null;
      this.product.image = null;
    },

    async createProduct(newProduct) {
      this.$isLoading(true);
      await axios
        .post("http://localhost:3000/products/create", newProduct)
        .then((res) => {
          console.log(res.data);
          this.$isLoading(false);
          this.$swal({
            icon: "success",
            title: "Created!",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    },
    async getProductById(id) {
      this.$isLoading(true);
      await axios.get("http://localhost:3000/products/" + id).then((res) => {
        this.product = res.data;
        this.$isLoading(false);
      });
    },
    async updateProduct(newProduct) {
      this.$isLoading(true);
      await axios
        .put("http://localhost:3000/products/update", newProduct)
        .then((res) => {
          console.log(res.data);
          this.$isLoading(false);
          this.$swal({
            icon: "success",
            title: "Updated!",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    },
  },
};
</script>

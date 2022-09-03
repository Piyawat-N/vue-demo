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
            <input
              class="form-control"
              type="file"
              id="formFile"
              @change="onFileSelected"
            />
          </div>
          <div class="mb-3">
            <img :src="product.imageUrl" v-if="product.imageUrl" />
          </div>

          <div v-if="this.product.id">
            <button type="submit" class="btn btn-primary me-3">Save</button>
          </div>
          <div v-else>
            <button type="submit" class="btn btn-primary me-3">Add</button>
            <button type="reset" class="btn btn-primary" @click="resetInput">
              Cancel
            </button>
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
        id: null,
        title: null,
        price: null,
        image: null,
        imageUrl: null,
      },
      selectedFile: null,
    };
  },
  created() {
    this.$watch(
      // ติดตามเวลา param เปลี่ยน
      () => this.$route.params,
      () => {
        // console.log("this.$route.params.id = ", this.$route.params.id);
        this.resetInput();
        if (this.$route.params.id) {
          this.getProductById(this.$route.params.id);
        }
      }
    );

    if (this.$route.params.id) {
      this.getProductById(this.$route.params.id);
    }
  },
  methods: {
    async saveProduct() {
      console.log(this.selectedFile);
      if (this.selectedFile) {
        await this.UploadImage();
      }

      let newProduct = this.setNewProduct();

      if (this.product._id) {
        this.updateProduct(newProduct);
      } else {
        await this.createProduct(newProduct);
        this.resetInput();
        // this.$router.push({
        //   name: "formId",
        //   params: {
        //     id: this.product.id,
        //   },
        // });
      }
    },
    setNewProduct() {
      let newProduct = {
        id: this.product.id,
        title: this.product.title || "",
        price: this.product.price || 0,
        image: this.product.image || "",
        imageUrl: this.product.imageUrl || "",
      };
      return newProduct;
    },
    resetInput() {
      this.product.id = null;
      this.product.title = null;
      this.product.price = null;
      this.product.image = null;
      this.product.imageUrl = null;
    },

    onFileSelected(event) {
      if (event.target.files[0]) {
        this.selectedFile = event.target.files[0];
        this.product.imageUrl = URL.createObjectURL(this.selectedFile); // preview image
      } else {
        this.product.imageUrl = null;
      }
    },

    async UploadImage() {
      const fd = new FormData();
      fd.append("imagez", this.selectedFile);

      this.$isLoading(true);
      await axios
        .post(this.$store.state.host + "/upload", fd, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          this.product.image = res.data.filename; //เก็บชื่อรูปที่มาจากหลังบ้าน
          this.product.imageUrl =
            this.$store.state.host + "/image/" + res.data.filename; // เก็บ url รูป
        });
    },

    async createProduct(newProduct) {
      this.$isLoading(true);
      await axios
        .post(this.$store.state.host + "/products/create", newProduct)
        .then((res) => {
          // console.log(res.data);
          this.product.id = res.data;
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
      await axios
        .get(this.$store.state.host + "/products/" + id)
        .then((res) => {
          this.product = res.data;
          this.product.id = res.data._id;
          this.$isLoading(false);
        });
    },
    async updateProduct(newProduct) {
      this.$isLoading(true);
      await axios
        .put(this.$store.state.host + "/products/update", newProduct)
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
<style scoped>
img {
  max-width: 100%;
  max-height: 200px;
}
</style>

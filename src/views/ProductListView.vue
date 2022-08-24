<template>
  <div class="productList">
    <h1>Product List</h1>
    <table class="table table-hover table-striped table-bordered align-middle">
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
        <tr v-for="(item, index) in this.$store.state.products" :key="index">
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
export default {
  created() {},
  methods: {
    async deleteProduct(id) {
      await this.$store.dispatch("deleteProduct", id);
      await this.$store.dispatch("getDataFromAPI");
    },
    editProduct(item) {
      console.log(item);

      this.$router.push({
        name: "formId",
        params: {
          id: item._id,
          // _id: item._id,
          // title: item.title,
          // price: item.price,
          // image: item.image,
        },
      });

      // this.$router.push({ name: 'formId', params: { id: item._id }})

    },
  },
};
</script>
<style scoped>
img {
  height: 50px;
}
</style>

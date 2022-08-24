<template>
  <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
    <div class="container-fluid">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link class="navbar-brand" to="/"
            ><img src="adidas-logo.png" style="width: 40px"
          /></router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/productlist"
            >Product List</router-link
          >
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/form">Form</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/contact">Contact</router-link>
        </li>
      </ul>
    </div>
  </nav>
  <div class="container fluid">
    <router-view />
  </div>
</template>
<script>
export default {
  created() {
    
  },
}
</script>

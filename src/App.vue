<template>
  <div class="vue-tempalte">
    <!-- Navigation -->
    <nav class="navbar shadow bg-white rounded justify-content-between flex-nowrap flex-row fixed-top" v-if="!isAuthenticated">
      <div class="container">
        <a class="navbar-brand float-left" target="_blank">
          MarketPlace
        </a>
        <ul class="nav navbar-nav flex-row float-right">
          <li class="nav-item">
            <router-link class="nav-link pr-3" to="/login">Ingresar</router-link>
          </li>
          <li class="nav-item space-button">
            <router-link class="btn btn-outline-primary" to="/">Registrarse</router-link>
          </li>
        </ul>
      </div>
    </nav>
    <nav class="navbar shadow bg-white rounded navbar-light bg-light flex-row fixed-top" v-if="isAuthenticated">
      <div class="container">
      <a class="navbar-brand" href="#">MarketPlace</a>
      <div id="navbarNav">
        <ul class="nav navbar-nav flex-row float-right">
          <li class="nav-item margin-right">
            <router-link class="nav-link" to="/orders">Pedidos</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/articulos">Artículos</router-link>
          </li>
          <li class="nav-item space-button">
            <router-link class="nav-link" to="/perfil">Perfil de Usuario</router-link>
          </li>
        </ul>
      </div>
    </div>
    </nav>
    <!-- Main -->
    <div class="App">
      <div class="vertical-center">
    <br>
    <br>
    <br>
        <router-view />
      </div>
    </div>
  </div>
  <vue3-confirm-dialog></vue3-confirm-dialog>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
    isAuthenticated: false,
  };
  },
  async mounted() {
  const token = localStorage.getItem('access_token');
  if (token) {
    try{
       await axios.post('http://34.121.66.23:4000/auth/validate', {
        token,
      });
      this.isAuthenticated = true;
    }catch(error){
      this.isAuthenticated = false;
      localStorage.removeItem('access_token')
      this.$router.push({ path: '/login' }).then(() => { this.$router.go() })
    }
    
  }
},
}

</script>